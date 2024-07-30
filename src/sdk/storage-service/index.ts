import RealmHolder from './realm-holder';
import {Group, Message, RegisteredUserProfile, User} from './schema';
import {
  SaveGroupInput,
  SaveRegisteredUserInput,
  SaveApplicationMessageInput,
  SavePublicUserInput,
} from './types';
import Realm, {UpdateMode} from 'realm';

export default class StorageService {
  static async initStorageService() {
    await RealmHolder.init();
  }

  //writes
  static saveRegisteredUser(saveRegisteredUserInput: SaveRegisteredUserInput) {
    const realm = RealmHolder.get();
    return realm.write(() => {
      return realm.create(
        RegisteredUserProfile,
        {
          username: saveRegisteredUserInput.username,
          name: saveRegisteredUserInput.name,
          registeredUserData: JSON.stringify(
            saveRegisteredUserInput.registeredUserData,
          ),
        },
        UpdateMode.Modified,
      );
    });
  }

  static saveGroup(saveGroupInput: SaveGroupInput) {
    const realm = RealmHolder.get();
    return realm.write(() => {
      return realm.create(
        Group,
        {
          groupId: saveGroupInput.groupId,
          name: saveGroupInput.name,
          welcomeMessageId: saveGroupInput.welcomeMessageId,
        },
        UpdateMode.Modified,
      );
    });
  }

  static saveApplicationMessage(
    saveApplicationMessageInput: SaveApplicationMessageInput,
  ) {
    if (saveApplicationMessageInput.payload === '') {
      return;
    }
    const realm = RealmHolder.get();
    return realm.write(() => {
      return realm.create(Message, {
        _id: new Realm.BSON.ObjectId(),
        createdUsername: saveApplicationMessageInput.createdUsername,
        messageType: saveApplicationMessageInput.messageType,
        payload: saveApplicationMessageInput.payload,
        _groupId: saveApplicationMessageInput.groupId,
        _createdUser: saveApplicationMessageInput.createdUser
          ? saveApplicationMessageInput.createdUser
          : undefined,
      });
    });
  }

  static upsertPublicUsers(savePublicUserInput: SavePublicUserInput[]) {
    const realm = RealmHolder.get();
    return realm.write(() => {
      savePublicUserInput.forEach(user => {
        return realm.create(
          User,
          {
            username: user.username,
            name: user.name,
            keyPackage: JSON.stringify(user.keyPackage),
          },
          UpdateMode.Modified,
        );
      });
    });
  }

  static upsertPublicUser(savePublicUserInput: SavePublicUserInput) {
    const realm = RealmHolder.get();
    return realm.write(() => {
      return realm.create(
        User,
        {
          username: savePublicUserInput.username,
          name: savePublicUserInput.name,
          keyPackage: JSON.stringify(savePublicUserInput.keyPackage),
        },
        UpdateMode.Modified,
      );
    });
  }

  //reads
  static getPublicUserDirectory() {
    const realm = RealmHolder.get();
    return realm.objects(User);
  }

  static getPublicUserDirectoryExcept(usernames: string[]) {
    const realm = RealmHolder.get();
    return realm.objects(User).filtered('NOT username IN $0', usernames);
  }

  static getPublicUser(username: string) {
    const realm = RealmHolder.get();
    return realm.objects(User).filtered('username = $0', username)[0];
  }

  static getRegisteredUserProfile() {
    const realm = RealmHolder.get();
    return realm.objects(RegisteredUserProfile)[0]; //always return the first value
  }

  static getGroups() {
    const realm = RealmHolder.get();
    return realm.objects(Group);
  }

  static getGroup(groupId: string) {
    const realm = RealmHolder.get();
    return realm.objects(Group).filtered('groupId = $0', groupId)[0];
  }

  static getApplicationMessages(groupId: string) {
    const realm = RealmHolder.get();
    return realm.objects(Message).filtered('_groupId = $0', groupId);
  }
}
