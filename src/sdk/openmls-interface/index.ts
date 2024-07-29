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
  ProcessCommitMessageInput,
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
      nativeF(
        {
          serialized_welcome_message: JSON.stringify(
            createGroupFromWelcomeInput.serialized_welcome_message,
          ),
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject(
              'createGroupFromWelcome failed. check FFI logs for more details',
            );
          }
        },
      );
    });
  }

  static async createApplicationMessage(
    createApplicationMessageInput: CreateApplicationMessageInput,
  ) {
    const nativeF = NativeModules.OpenMLS.createApplicationMessage;

    return new Promise<SerializedMessage>((resolve, reject) => {
      nativeF(
        {
          mls_group: createApplicationMessageInput.mls_group,
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

    return new Promise<MLSGroup>((resolve, reject) => {
      nativeF(
        {
          serialized_commit_message: JSON.stringify(
            processCommitMessageInput.serialized_commit_message,
          ),
          mls_group: processCommitMessageInput.mls_group,
        },
        (res: string) => {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            reject(
              'processCommitMessage failed. check FFI logs for more details',
            );
          }
        },
      );
    });
  }

  static async getGroupMembers(mlsGroup: MLSGroup) {
    const nativeF = NativeModules.OpenMLS.getGroupMembers;
    return new Promise<string[]>((resolve, reject) => {
      nativeF(
        {
          mls_group: mlsGroup,
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
