import {NativeModules} from 'react-native';
import {
  CreateGroupInput,
  RegisterUserInput,
  InviteMemberInput,
  CreateGroupFromWelcomeInput,
  CreateApplicationMessageInput,
  ProcessApplicationMessageInput,
  RegisteredUserData,
  InvitedMemberData,
  SerializedMessage,
  ProcessCommitMessageInput,
  KeyPackage,
  CreateKeyPackageInput,
} from './types';

export default class OpenMLSInterface {
  static async initMls() {
    const nativeF = NativeModules.OpenMLS.initMls;
    await nativeF();
  }

  static async registerUser(registerUserInput: RegisterUserInput) {
    const nativeF = NativeModules.OpenMLS.registerUser;

    return new Promise<RegisteredUserData>((resolve, reject) => {
      nativeF(registerUserInput, (res: string) => {
        if (res) {
          resolve(JSON.parse(res));
        } else {
          reject('registerUser failed. check FFI logs for more details');
        }
      });
    });
  }

  static async createKeyPackage(createKeyPackageInput: CreateKeyPackageInput) {
    const nativeF = NativeModules.OpenMLS.createKeyPackage;

    return new Promise<KeyPackage>((resolve, reject) => {
      nativeF(createKeyPackageInput, (res: string) => {
        if (res) {
          resolve(JSON.parse(res));
        } else {
          reject('registerUser failed. check FFI logs for more details');
        }
      });
    });
  }

  static async createGroup(createGroupInput: CreateGroupInput) {
    const nativeF = NativeModules.OpenMLS.createGroup;

    return new Promise<void>((resolve, _) => {
      nativeF({
        group_id: createGroupInput.group_id,
        registered_user_data: JSON.stringify(
          createGroupInput.registered_user_data,
        ),
      });
      resolve();
    });
  }

  static async inviteMember(inviteMemberInput: InviteMemberInput) {
    const nativeF = NativeModules.OpenMLS.inviteMember;

    return new Promise<InvitedMemberData>((resolve, reject) => {
      nativeF(
        {
          member_key_package: inviteMemberInput.member_key_package,
          registered_user_data: JSON.stringify(
            inviteMemberInput.registered_user_data,
          ),
          group_id: inviteMemberInput.group_id,
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject('inviteMember failed. check FFI logs for more details');
          }
        },
      );
    });
  }

  static async createGroupFromWelcome(
    createGroupFromWelcomeInput: CreateGroupFromWelcomeInput,
  ) {
    const nativeF = NativeModules.OpenMLS.createGroupFromWelcome;

    return new Promise<void>((resolve, _) => {
      nativeF({
        serialized_welcome_message: JSON.stringify(
          createGroupFromWelcomeInput.serialized_welcome_message,
        ),
      });
      resolve();
    });
  }

  static async createApplicationMessage(
    createApplicationMessageInput: CreateApplicationMessageInput,
  ) {
    const nativeF = NativeModules.OpenMLS.createApplicationMessage;

    return new Promise<SerializedMessage>((resolve, reject) => {
      nativeF(
        {
          group_id: createApplicationMessageInput.group_id,
          registered_user_data: JSON.stringify(
            createApplicationMessageInput.registered_user_data,
          ),
          message: createApplicationMessageInput.message,
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject(
              'createApplicationMessage failed. check FFI logs for more details',
            );
          }
        },
      );
    });
  }

  static async processApplicationMessage(
    processApplicationMessageInput: ProcessApplicationMessageInput,
  ) {
    const nativeF = NativeModules.OpenMLS.processApplicationMessage;

    return new Promise<string>((resolve, reject) => {
      nativeF(processApplicationMessageInput, (res: string) => {
        if (res) {
          resolve(res);
        } else {
          reject(
            'processApplicationMessage failed. check FFI logs for more details',
          );
        }
      });
    });
  }

  static async processCommitMessage(
    processCommitMessageInput: ProcessCommitMessageInput,
  ) {
    const nativeF = NativeModules.OpenMLS.processCommitMessage;

    return new Promise<void>((resolve, _) => {
      nativeF({
        serialized_commit_message: JSON.stringify(
          processCommitMessageInput.serialized_commit_message,
        ),
        group_id: processCommitMessageInput.group_id,
      });
      resolve();
    });
  }

  static async getGroupMembers(group_id: string) {
    const nativeF = NativeModules.OpenMLS.getGroupMembers;
    return new Promise<string[]>((resolve, reject) => {
      nativeF(
        {
          group_id: group_id,
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject('getGroupMembers failed. check FFI logs for more details');
          }
        },
      );
    });
  }
}
