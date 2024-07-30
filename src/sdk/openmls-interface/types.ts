//result data types from OpenMLS FFI
interface KeyPackage {}
interface Signer {}
interface CredentialWithKey {}
interface SerializedMessage {}

interface RegisteredUserData {
  key_package: KeyPackage;
  signer: Signer;
  credential_with_key: CredentialWithKey;
}

interface InvitedMemberData {
  serialized_welcome_out: SerializedMessage;
  serialized_mls_message_out: SerializedMessage;
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
  group_id: string;
  member_key_package: KeyPackage;
  registered_user_data: RegisteredUserData;
}

interface CreateGroupFromWelcomeInput {
  serialized_welcome_message: SerializedMessage;
}

interface CreateApplicationMessageInput {
  group_id: string;
  registered_user_data: RegisteredUserData;
  message: string;
}

interface ProcessApplicationMessageInput {
  group_id: string;
  serialized_application_message: SerializedMessage;
}

interface ProcessCommitMessageInput {
  group_id: string;
  serialized_commit_message: SerializedMessage;
}

export type {
  KeyPackage,
  Signer,
  CredentialWithKey,
  SerializedMessage,
  RegisterUserInput,
  CreateGroupInput,
  InviteMemberInput,
  RegisteredUserData,
  InvitedMemberData,
  CreateGroupFromWelcomeInput,
  CreateApplicationMessageInput,
  ProcessApplicationMessageInput,
  ProcessCommitMessageInput,
};
