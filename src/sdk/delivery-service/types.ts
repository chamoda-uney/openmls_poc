interface CreateUserDTO {
  username: string;
  name: string;
  keyPackage: object;
}

type MessageType = 'ApplicationMessage' | 'WelcomeMessage';

interface CreateMessageDTO {
  username: string;
  messageType: MessageType;
  groupId: string;
  payload: object;
  destinationUsername?: string;
}

interface PatchUserDTO {
  keyPackage: object;
}

interface UserEntity {
  id: number;
  createdAt: string;
  username: string;
  name: string;
  keyPackage: object;
}

interface MessageEntity {
  id: number;
  createdAt: string;
  userId: number;
  messageType: MessageType;
  payload: object;
  groupId: string;
  destinationUserId: number;
  createdUser: UserEntity;
  destinationUser: UserEntity;
}

export type {
  CreateUserDTO,
  CreateMessageDTO,
  PatchUserDTO,
  UserEntity,
  MessageEntity,
  MessageType,
};
