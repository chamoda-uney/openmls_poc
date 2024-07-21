import {MessageType} from '../delivery-service/types';
import {
  RegisteredUserData,
  KeyPackage,
  MLSGroup,
} from '../openmls-interface/types';
import {User} from './schema';
import Realm from 'realm';

//input DTO types for swift NativeModule
interface SaveRegisteredUserInput {
  name: string;
  username: Realm.BSON.ObjectId;
  registeredUserData: RegisteredUserData;
}

interface SavePublicUserInput {
  name: string;
  username: Realm.BSON.ObjectId;
  keyPackage: KeyPackage;
}

interface SaveGroupInput {
  groupId: Realm.BSON.ObjectId;
  name: string;
  mlsGroup: MLSGroup;
}

interface SaveApplicationMessageInput {
  createdUsername: string;
  messageType: MessageType;
  payload: string;
  groupId: Realm.BSON.ObjectId;
  createdUser?: User;
}

export type {
  SaveRegisteredUserInput,
  SavePublicUserInput,
  SaveGroupInput,
  SaveApplicationMessageInput,
};
