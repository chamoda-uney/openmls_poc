import {MessageType} from '../delivery-service/types';
import {RegisteredUserData, KeyPackage} from '../openmls-interface/types';
import {User} from './schema';

//input DTO types for swift NativeModule
interface SaveRegisteredUserInput {
  name: string;
  username: string;
  registeredUserData: RegisteredUserData;
}

interface SavePublicUserInput {
  name: string;
  username: string;
  keyPackage: KeyPackage;
}

interface SaveGroupInput {
  groupId: string;
  name: string;
  welcomeMessageId?: number;
}

interface SaveApplicationMessageInput {
  createdUsername: string;
  messageType: MessageType;
  payload: string;
  groupId: string;
  createdUser?: User;
}

export type {
  SaveRegisteredUserInput,
  SavePublicUserInput,
  SaveGroupInput,
  SaveApplicationMessageInput,
};
