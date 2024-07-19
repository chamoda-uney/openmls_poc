//result data types from OpenMLS FFI
interface KeyPackage {}
interface Signer {}
interface CredentialWithKey {}
interface MLSGroup {}
interface SerializedMessage {}

interface RegisteredUserData {
  key_package: KeyPackage;
  signer: Signer;
  credential_with_key: CredentialWithKey;
}

interface InvitedMemberData {
  serialized_welcome_out: SerializedMessage;
  serialized_mls_message_out: SerializedMessage;
  mls_group: MLSGroup;
}

//input data types for swift NativeModule
interface RegisterUserInput {
  user_id: string; // a unique identifier for user
}

interface CreateGroupInput {
  group_id: string;
  registered_user_data: RegisteredUserData;
}

interface InviteMemberInput {
  member_key_package: KeyPackage;
  registered_user_data: RegisteredUserData;
  mls_group: MLSGroup;
}

interface CreateGroupFromWelcomeInput {
  serialized_welcome_message: SerializedMessage;
}

interface CreateApplicationMessageInput {
  mls_group: MLSGroup;
  registered_user_data: RegisteredUserData;
  message: string;
}

interface ProcessApplicationMessageInput {
  mls_group: MLSGroup;
  serialized_application_message: SerializedMessage;
}

export type {
  KeyPackage,
  Signer,
  CredentialWithKey,
  MLSGroup,
  SerializedMessage,
  RegisterUserInput,
  CreateGroupInput,
  InviteMemberInput,
  RegisteredUserData,
  InvitedMemberData,
  CreateGroupFromWelcomeInput,
  CreateApplicationMessageInput,
  ProcessApplicationMessageInput,
};
