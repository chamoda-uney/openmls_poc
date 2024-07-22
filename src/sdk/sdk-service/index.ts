import {DeliveryService, OpenMLSInterface, StorageService} from '..';
import Realm from 'realm';
import {Group, Message, RegisteredUserProfile} from '../storage-service/schema';
import {
  KeyPackage,
  MLSGroup,
  RegisteredUserData,
} from '../openmls-interface/types';
import {getRegisteredUser} from './helper';

export default class SdkService {
  /**
   * Initializes the SDK service by initializing OpenMLS and StorageService.
   *
   * @return {Promise<void>} A promise that resolves when both OpenMLS and StorageService have been initialized.
   */
  static async init(): Promise<void> {
    await OpenMLSInterface.default.initMls();
    await StorageService.default.initStorageService();
  }

  private static getSavedGroup(groupId: Realm.BSON.ObjectId) {
    const group = StorageService.default.getGroup(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
    return group;
  }

  /**
   * Registers a user by calling the OpenMLSInterface to register the user and then creating the user in the DeliveryService.
   *
   * @param {string} username - The username of the user to be registered.
   * @param {string} name - The name of the user to be registered.
   * @return {Promise<RegisteredUserProfile>} A promise that resolves once the user is successfully registered in both OpenMLS and DeliveryService.
   */
  static async register(
    username: string,
    name: string,
  ): Promise<RegisteredUserProfile> {
    /**
     * 1. First register the user in openMLS and generate the key packages
     * 2. Register the user in delivery service directory
     * 3. If, success in 1, 2  - save the user in storage
     */

    const openMLSResult = await OpenMLSInterface.default.registerUser({
      user_id: username,
    });

    const deliveryServiceResult = await DeliveryService.default.createUser({
      username: username,
      keyPackage: openMLSResult.key_package,
      name: name,
    });

    if (!deliveryServiceResult.id) {
      throw new Error(
        'Failed to create user in delivery service. May be username is taken already.',
      );
    }

    //save the user in storage
    return StorageService.default.saveRegisteredUser({
      name: name,
      username: new Realm.BSON.ObjectId(username),
      registeredUserData: openMLSResult,
    });
  }

  /**
   * Creates a group with the specified name and invites an opponent user.
   *
   * @param {string} groupName - The name of the group to be created.
   * @param {string} opponentUsername - The username of the opponent user to be invited.
   * @return {Promise<Group>} A promise that resolves to the created group.
   * @throws {Error} If the opponent user is not found.
   */
  static async createGroup(
    groupName: string,
    opponentUsername: string,
  ): Promise<Group> {
    //get the registered user
    const registeredUser = getRegisteredUser();

    //get the opponent key package
    const opponent = StorageService.default.getPublicUser(opponentUsername);

    if (!opponent) {
      throw new Error('Opponent is not found');
    }

    const group_id = new Realm.BSON.ObjectId();

    const mlsGroup = await OpenMLSInterface.default.createGroup({
      group_id: group_id.toString(),
      registered_user_data: JSON.parse(
        registeredUser.registeredUserData,
      ) as RegisteredUserData,
    });

    //save the group in storage
    StorageService.default.saveGroup({
      groupId: group_id,
      name: groupName,
      mlsGroup: JSON.stringify(mlsGroup),
    });

    //invite the opponent user
    const invitedMemberData = await OpenMLSInterface.default.inviteMember({
      mls_group: mlsGroup,
      registered_user_data: JSON.parse(
        registeredUser.registeredUserData,
      ) as RegisteredUserData,
      member_key_package: JSON.parse(opponent.keyPackage) as KeyPackage,
    });

    //save the group in storage (after adding the member)
    const group = StorageService.default.saveGroup({
      groupId: group_id,
      name: groupName,
      mlsGroup: JSON.stringify(invitedMemberData.mls_group),
    });

    // send the group invite message
    await DeliveryService.default.createMessage({
      username: registeredUser.username.toString(),
      messageType: 'WelcomeMessage',
      destinationUsername: opponentUsername,
      groupId: group_id.toString(),
      payload: {
        serialized_welcome: invitedMemberData.serialized_welcome_out,
        group_name: groupName,
      },
    });

    return group;
  }

  /**
   * Sends an application message to a group.
   *
   * @param {Realm.BSON.ObjectId} groupId - The ID of the group.
   * @param {string} message - The message to be sent.
   * @return {Promise<Message>} The application message that was sent.
   */
  static async sendApplicationMessage(
    groupId: Realm.BSON.ObjectId,
    message: string,
  ): Promise<Message> {
    //get the registered user
    const registeredUser = getRegisteredUser();

    //get the group
    const group = this.getSavedGroup(groupId);

    //create the message in the storage
    const applicationMessage = StorageService.default.saveApplicationMessage({
      createdUsername: registeredUser.username.toString(),
      messageType: 'ApplicationMessage',
      groupId: groupId,
      payload: message,
    });

    //create the encrypted message for delivery service
    const encryptedMessage =
      await OpenMLSInterface.default.createApplicationMessage({
        registered_user_data: JSON.parse(
          registeredUser.registeredUserData,
        ) as RegisteredUserData,
        mls_group: JSON.parse(group.mlsGroup) as MLSGroup,
        message: message,
      });

    //send the encrypted message to delivery service
    await DeliveryService.default.createMessage({
      username: registeredUser.username.toString(),
      messageType: 'ApplicationMessage',
      groupId: groupId.toString(),
      payload: encryptedMessage,
    });

    return applicationMessage;
  }
}
