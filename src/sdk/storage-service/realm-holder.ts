import Realm from 'realm';
import {Group, Message, RegisteredUserProfile, User} from './schema';

export default class RealmHolder {
  static realm: Realm | null = null;

  static async init() {
    return new Promise((resolve, reject) => {
      if (RealmHolder.realm) {
        console.log('A Realm instance is already open');
        resolve(RealmHolder.realm);
        return;
      }
      Realm.open({
        schema: [User, Group, Message, RegisteredUserProfile],
      })
        .then(r => {
          RealmHolder.realm = r;
          console.log('A Realm instance has been opened');
          resolve(r);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static get() {
    if (!RealmHolder.realm) {
      throw new Error(
        'Realm has not been initialized yet. Call RealmHolder.init() first.',
      );
    } else {
      return RealmHolder.realm;
    }
  }
}
