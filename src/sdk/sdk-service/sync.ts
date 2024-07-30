import {io} from 'socket.io-client';
import {DeliveryService, OpenMLSInterface, StorageService} from '..';
import {MessageEntity} from '../delivery-service/types';
import {KeyPackage, SerializedMessage} from '../openmls-interface/types';
import {getRegisteredUser} from './helper';
import {DELIVERY_SERVICE_BASE_URL} from '../delivery-service';
import {BroadCastedMessage} from './types';

export default class SyncService {
  static isSyncing = false;

  static async sync() {
    if (StorageService.default.getRegisteredUserProfile() === undefined) {
      return;
    }

    if (SyncService.isSyncing) {
      return;
    }

    this.isSyncing = true;
    const registeredUser = getRegisteredUser();

    const messages = await DeliveryService.default.getMessages(
      registeredUser.username.toString(),
    );

    for (const message of messages) {
      this.processMessage(message);
    }

    this.isSyncing = false;
  }

  static async processMessage(message: MessageEntity) {
    const registeredUser = getRegisteredUser();
    if (message.createdUser.username === registeredUser.username) {
      return;
    }

    switch (message.messageType) {
      case 'WelcomeMessage':
        await this.processWelcomeMessage(message);
        break;

      case 'ApplicationMessage':
        await this.processApplicationMessage(message);
        break;

      case 'CommitMessage':
        await this.processCommitMessage(message);
        break;

      default:
        break;
    }
  }

  static async connect() {
    const socket = io(`${DELIVERY_SERVICE_BASE_URL}/socket`);

    socket.connect();

    socket.on('connect', () => {
      this.sync();
    });

    socket.on('message', (message: BroadCastedMessage) => {
      if (message.createdUsername !== getRegisteredUser().username) {
        this.sync();
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }

  private static async processApplicationMessage(message: MessageEntity) {
    const groupId = message.groupId;

    //check if application message belongs to any of the joined groups
    if (!this.checkIfMessageBelongsToAnyOfJoinedGroups(message)) {
      return;
    }

    //check if application message is older than welcome message
    if (this.checkIfMessageIsOlderThanWelcomeMessage(message, groupId)) {
      return;
    }

    //get the group from realm
    const group = StorageService.default.getGroup(groupId);

    //send the serialized message to MLS interface and get decrypted message
    const decrypted = await OpenMLSInterface.default.processApplicationMessage({
      group_id: group.groupId,
      serialized_application_message: JSON.stringify(message.payload),
    });

    //upsert the public user
    const createdUser = StorageService.default.upsertPublicUser({
      name: message.createdUser.name,
      username: message.createdUser.username,
      keyPackage: message.createdUser.keyPackage as KeyPackage,
    });

    //save the decrypted message to storage
    StorageService.default.saveApplicationMessage({
      createdUsername: message.createdUser.username,
      messageType: 'ApplicationMessage',
      groupId: groupId,
      payload: decrypted,
      createdUser: createdUser,
    });
  }

  private static async processWelcomeMessage(message: MessageEntity) {
    const groupId = message.groupId;

    //check if welcome message destination user is the same as registered user
    if (message.destinationUser.username !== getRegisteredUser().username) {
      return;
    }

    //send welcome message contents to MLS interface

    const {serialized_welcome, group_name} = message.payload as unknown as {
      serialized_welcome: SerializedMessage;
      group_name: string;
    };

    if (!serialized_welcome) {
      throw new Error('serialized_welcome is required');
    }
    if (!group_name) {
      throw new Error('group_name is required');
    }

    await OpenMLSInterface.default.createGroupFromWelcome({
      serialized_welcome_message: serialized_welcome,
    });

    //save the group in storage
    const group = StorageService.default.saveGroup({
      groupId: groupId,
      name: group_name,
      welcomeMessageId: message.id,
    });

    return group;
  }

  private static async processCommitMessage(message: MessageEntity) {
    const groupId = message.groupId;

    const {serialized_commit, ignore_for_users} =
      message.payload as unknown as {
        serialized_commit: SerializedMessage;
        ignore_for_users: string[];
      };

    //ignore if registered username is in ignore_for_users
    if (ignore_for_users.includes(getRegisteredUser().username)) {
      return;
    }

    //check if commit message belongs to any of the joined groups
    if (!this.checkIfMessageBelongsToAnyOfJoinedGroups(message)) {
      return;
    }

    //check if commit message is older than welcome message
    if (this.checkIfMessageIsOlderThanWelcomeMessage(message, groupId)) {
      return;
    }

    //get the group from realm
    const group = StorageService.default.getGroup(groupId);

    await OpenMLSInterface.default.processCommitMessage({
      group_id: group.groupId,
      serialized_commit_message: serialized_commit,
    });

    //save the group in storage
    const updatedGroup = StorageService.default.saveGroup({
      groupId: groupId,
      name: group.name,
    });

    return updatedGroup;
  }

  private static checkIfMessageBelongsToAnyOfJoinedGroups(
    message: MessageEntity,
  ) {
    const joinedGroups = StorageService.default.getGroups();
    if (!joinedGroups.find(group => group.groupId === message.groupId)) {
      return false;
    }
    return true;
  }

  private static checkIfMessageIsOlderThanWelcomeMessage(
    message: MessageEntity,
    groupId: string,
  ) {
    const group = StorageService.default.getGroup(groupId);
    const welcomeMessageId = group.welcomeMessageId;
    if (welcomeMessageId && message.id < welcomeMessageId) {
      return true;
    }
    return false;
  }
}
