import Realm, {ObjectSchema} from 'realm';
import {MessageType} from '../delivery-service/types';

class User extends Realm.Object<User> {
  username!: string;
  name!: string;
  keyPackage!: string;

  static schema: ObjectSchema = {
    primaryKey: 'username',
    name: 'User',
    properties: {
      name: 'string',
      username: 'string',
      keyPackage: 'string',
    },
  };
}

class Group extends Realm.Object<Group> {
  groupId!: string;
  name!: string;
  welcomeMessageId?: number;

  static schema: ObjectSchema = {
    primaryKey: 'groupId',
    name: 'Group',
    properties: {
      groupId: 'string',
      name: 'string',
      welcomeMessageId: 'int?',
    },
  };
}

class Message extends Realm.Object<Message> {
  _id!: Realm.BSON.ObjectId;
  createdUsername!: string;
  messageType!: MessageType;
  payload!: string;

  //relationships
  _groupId!: string;
  _createdUser?: User;

  static schema: ObjectSchema = {
    primaryKey: '_id',
    name: 'Message',
    properties: {
      _id: 'objectId',
      createdUsername: 'string',
      messageType: 'string',
      payload: 'string',
      _groupId: 'string',
      _createdUser: 'User?',
    },
  };
}

class RegisteredUserProfile extends Realm.Object<RegisteredUserProfile> {
  username!: string;
  name!: string;
  registeredUserData!: string;

  static schema: ObjectSchema = {
    primaryKey: 'username',
    name: 'RegisteredUserProfile',
    properties: {
      name: 'string',
      username: 'string',
      registeredUserData: 'string',
    },
  };
}

export {User, Group, Message, RegisteredUserProfile};
