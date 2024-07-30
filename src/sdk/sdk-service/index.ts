import {
  DeliveryService,
  OpenMLSInterface,
  StorageService,
  SyncService,
} from '..';
import {
  Group,
  Message,
  RegisteredUserProfile,
  User,
} from '../storage-service/schema';
import {KeyPackage, RegisteredUserData} from '../openmls-interface/types';
import {getRegisteredUser} from './helper';
import uuid from 'react-native-uuid';
import {Results} from 'realm';

export default class SdkService {
  /**
   * Initializes the SDK service by initializing OpenMLS and StorageService.
   *
   * @return {Promise<void>} A promise that resolves when both OpenMLS and StorageService have been initialized.
   */
  static async init(): Promise<void> {
    await OpenMLSInterface.default.initMls();
    await StorageService.default.initStorageService();
    SyncService.default.connect();
  }

  private static getSavedGroup(groupId: string) {
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

    console.log(openMLSResult);

    const deliveryServiceResult = await DeliveryService.default.createUser({
      username: username,
      keyPackage: openMLSResult.key_package,
      name: name,
    });

    console.log(deliveryServiceResult);

    if (!deliveryServiceResult.id) {
      throw new Error(
        'Failed to create user in delivery service. May be username is taken already.',
      );
    }

    //save the user in storage
    return StorageService.default.saveRegisteredUser({
      name: name,
      username: username,
      registeredUserData: openMLSResult,
    });
  }

  /**
   * Checks if the user is registered by retrieving the registered user profile from storage.
   *
   * @return {boolean} Returns true if the user is registered, false otherwise.
   */
  static isUserRegistered(): boolean {
    return !!StorageService.default.getRegisteredUserProfile();
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

    const group_id = uuid.v4().toString();

    await OpenMLSInterface.default.createGroup({
      group_id: group_id.toString(),
      registered_user_data: JSON.parse(
        registeredUser.registeredUserData,
      ) as RegisteredUserData,
    });

    //save the group in storage
    StorageService.default.saveGroup({
      groupId: group_id,
      name: groupName,
    });

    //invite the opponent user
    const invitedMemberData = await OpenMLSInterface.default.inviteMember({
      group_id: group_id,
      registered_user_data: JSON.parse(
        registeredUser.registeredUserData,
      ) as RegisteredUserData,
      member_key_package: JSON.parse(opponent.keyPackage) as KeyPackage,
    });

    //save the group in storage (after adding the member)
    const group = StorageService.default.saveGroup({
      groupId: group_id,
      name: groupName,
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
    groupId: string,
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
        group_id: group.groupId,
        message: message,
      });

    //send the encrypted message to delivery service
    await DeliveryService.default.createMessage({
      username: registeredUser.username,
      messageType: 'ApplicationMessage',
      groupId: groupId,
      payload: encryptedMessage,
    });

    return applicationMessage;
  }

  /**
   * Asynchronously updates the public user directory by fetching the user directory from the delivery service
   * and upserting each user into the storage service, except for the currently registered user.
   *
   * @return {Promise<Results<User>>} A promise that resolves when the public user directory has been updated.
   */
  static async updatePublicUserDirectory(): Promise<Results<User>> {
    const registeredUser = getRegisteredUser();

    const userDirectory = await DeliveryService.default.getUsers();

    for (const user of userDirectory) {
      if (user.username !== registeredUser.username) {
        StorageService.default.upsertPublicUser({
          name: user.name,
          username: user.username,
          keyPackage: JSON.stringify(user.keyPackage),
        });
      }
    }

    return StorageService.default.getPublicUserDirectory();
  }

  /**
   * Retrieves the usernames of all members in a group.
   *
   * @param {string} groupId - The ID of the group.
   * @return {Promise<string[]>} A promise that resolves to an array of usernames.
   */
  static async getGroupMemberUsernames(groupId: string): Promise<string[]> {
    const group = this.getSavedGroup(groupId);
    const memberUsernames = await OpenMLSInterface.default.getGroupMembers(
      group.groupId,
    );
    return memberUsernames;
  }

  /**
   * Invites a member to a group.
   *
   * @param {string} groupId - The ID of the group.
   * @param {string} opponentUsername - The username of the opponent.
   * @return {Promise<Group>} A promise that resolves the group when the member is invited.
   */
  static async inviteMemberToGroup(
    groupId: string,
    opponentUsername: string,
  ): Promise<Group> {
    let group = this.getSavedGroup(groupId);
    const registeredUser = getRegisteredUser();
    const opponent = StorageService.default.getPublicUser(opponentUsername);

    const invitedMemberData = await OpenMLSInterface.default.inviteMember({
      group_id: group.groupId,
      registered_user_data: JSON.parse(
        registeredUser.registeredUserData,
      ) as RegisteredUserData,
      member_key_package: JSON.parse(opponent.keyPackage) as KeyPackage,
    });

    const {serialized_mls_message_out, serialized_welcome_out} =
      invitedMemberData;

    //save the group in storage (after adding the member)
    group = StorageService.default.saveGroup({
      groupId: groupId,
      name: group.name,
    });

    // send the group invite message
    await DeliveryService.default.createMessage({
      username: registeredUser.username.toString(),
      messageType: 'WelcomeMessage',
      destinationUsername: opponentUsername,
      groupId: group.groupId,
      payload: {
        serialized_welcome: serialized_welcome_out,
        group_name: group.name,
      },
    });

    // send the commit message
    await DeliveryService.default.createMessage({
      username: registeredUser.username.toString(),
      messageType: 'CommitMessage',
      groupId: group.groupId,
      payload: {
        serialized_commit: serialized_mls_message_out,
        ignore_for_users: [opponentUsername],
      },
    });

    return group;
  }
}
