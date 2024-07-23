import {io} from 'socket.io-client';
import {DeliveryService, OpenMLSInterface, StorageService} from '..';
import {MessageEntity} from '../delivery-service/types';
import {
  KeyPackage,
  MLSGroup,
  SerializedMessage,
} from '../openmls-interface/types';
import {getRegisteredUser} from './helper';
import {DELIVERY_SERVICE_BASE_URL} from '../delivery-service';
import {BroadCastedMessage} from './types';

export default class SyncService {
  static isSyncing = false;

  static async sync() {
    if (SyncService.isSyncing) {
      return;
    }

    this.isSyncing = true;
    const registeredUser = getRegisteredUser();

    const messages = await DeliveryService.default.getMessages(
      registeredUser.username.toString(),
    );

    for (const message of messages) {
      switch (message.messageType) {
        case 'WelcomeMessage':
          await this.processWelcomeMessage(message);
          break;

        case 'ApplicationMessage':
          await this.processApplicationMessage(message);
          break;

        default:
          break;
      }
    }

    this.isSyncing = false;
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
    const joinedGroups = StorageService.default.getGroups();
    if (!joinedGroups.find(group => group.groupId === groupId)) {
      return;
    }

    //get the group from realm
    const group = StorageService.default.getGroup(groupId);

    //send the serialized message to MLS interface and get decrypted message
    const decrypted = await OpenMLSInterface.default.processApplicationMessage({
      mls_group: JSON.parse(group.mlsGroup) as MLSGroup,
      serialized_application_message: message.payload,
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

    const mlsGroup = await OpenMLSInterface.default.createGroupFromWelcome({
      serialized_welcome_message: serialized_welcome,
    });

    //save the group in storage
    const group = StorageService.default.saveGroup({
      groupId: groupId,
      name: group_name,
      mlsGroup: JSON.stringify(mlsGroup),
    });

    return group;
  }
}
