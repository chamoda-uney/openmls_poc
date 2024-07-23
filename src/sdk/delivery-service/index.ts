import {
  CreateMessageDTO,
  CreateUserDTO,
  MessageEntity,
  PatchUserDTO,
  UserEntity,
} from './types';

export const DELIVERY_SERVICE_BASE_URL = 'http://localhost:3000';

export default class DeliveryService {
  static async createMessage(
    createMessageDTO: CreateMessageDTO,
  ): Promise<MessageEntity> {
    const response = await fetch(`${DELIVERY_SERVICE_BASE_URL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createMessageDTO),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const response = await fetch(`${DELIVERY_SERVICE_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createUserDTO),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async patchUser(
    username: string,
    patchUserDTO: PatchUserDTO,
  ): Promise<UserEntity> {
    const response = await fetch(
      `${DELIVERY_SERVICE_BASE_URL}/user/${username}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchUserDTO),
      },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async getUser(username: string): Promise<UserEntity> {
    const response = await fetch(
      `${DELIVERY_SERVICE_BASE_URL}/user/${username}`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async getUsers(): Promise<UserEntity[]> {
    const response = await fetch(`${DELIVERY_SERVICE_BASE_URL}/user`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  static async getMessages(username: string): Promise<MessageEntity[]> {
    const response = await fetch(
      `${DELIVERY_SERVICE_BASE_URL}/message/${username}`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}
