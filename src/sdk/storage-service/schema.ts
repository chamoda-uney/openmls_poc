import Realm, {ObjectSchema} from 'realm';
import {MessageType} from '../delivery-service/types';

class User extends Realm.Object<User> {
  username!: Realm.BSON.ObjectId;
  name!: string;
  keyPackage!: string;

  static schema: ObjectSchema = {
    primaryKey: 'username',
    name: 'User',
    properties: {
      name: 'string',
      username: 'objectId',
      keyPackage: 'string',
    },
  };
}

class Group extends Realm.Object<Group> {
  groupId!: Realm.BSON.ObjectId;
  name!: string;
  mlsGroup!: string;

  static schema: ObjectSchema = {
    primaryKey: 'groupId',
    name: 'Group',
    properties: {
      groupId: 'objectId',
      name: 'string',
      mlsGroup: 'string',
    },
  };
}

class Message extends Realm.Object<Message> {
  _id!: Realm.BSON.ObjectId;
  createdUsername!: string;
  messageType!: MessageType;
  payload!: string;

  //relationships
  _groupId!: Realm.BSON.ObjectId;
  _createdUser?: User;

  static schema: ObjectSchema = {
    primaryKey: '_id',
    name: 'Message',
    properties: {
      _id: 'objectId',
      createdUsername: 'string',
      messageType: 'string',
      payload: 'string',
      _groupId: 'objectId',
      _createdUser: 'User?',
    },
  };
}

class RegisteredUserProfile extends Realm.Object<RegisteredUserProfile> {
  username!: Realm.BSON.ObjectId;
  name!: string;
  registeredUserData!: string;

  static schema: ObjectSchema = {
    primaryKey: 'username',
    name: 'RegisteredUserProfile',
    properties: {
      name: 'string',
      username: 'objectId',
      registeredUserData: 'string',
    },
  };
}

export {User, Group, Message, RegisteredUserProfile};
