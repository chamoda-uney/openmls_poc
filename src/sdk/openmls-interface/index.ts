import {NativeModules} from 'react-native';
import {
  CreateGroupInput,
  RegisterUserInput,
  InviteMemberInput,
  CreateGroupFromWelcomeInput,
  CreateApplicationMessageInput,
  ProcessApplicationMessageInput,
  RegisteredUserData,
  MLSGroup,
  InvitedMemberData,
  SerializedMessage,
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

  static async createGroup(createGroupInput: CreateGroupInput) {
    const nativeF = NativeModules.OpenMLS.createGroup;

    return new Promise<MLSGroup>((resolve, reject) => {
      nativeF(
        {
          group_id: createGroupInput.group_id,
          registered_user_data: JSON.stringify(
            createGroupInput.registered_user_data,
          ),
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject('createGroup failed. check FFI logs for more details');
          }
        },
      );
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
          mls_group: JSON.stringify(inviteMemberInput.mls_group),
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

    return new Promise<MLSGroup>((resolve, reject) => {
      nativeF(createGroupFromWelcomeInput, (res: string) => {
        if (res) {
          resolve(JSON.parse(res));
        } else {
          reject(
            'createGroupFromWelcome failed. check FFI logs for more details',
          );
        }
      });
    });
  }

  static async createApplicationMessage(
    createApplicationMessageInput: CreateApplicationMessageInput,
  ) {
    const nativeF = NativeModules.OpenMLS.createApplicationMessage;

    return new Promise<SerializedMessage>((resolve, reject) => {
      nativeF(createApplicationMessageInput, (res: string) => {
        if (res) {
          resolve(JSON.parse(res));
        } else {
          reject(
            'createApplicationMessage failed. check FFI logs for more details',
          );
        }
      });
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
}
