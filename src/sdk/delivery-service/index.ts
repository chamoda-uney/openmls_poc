import axios from 'axios';
import {
  CreateMessageDTO,
  CreateUserDTO,
  MessageEntity,
  PatchUserDTO,
  UserEntity,
} from './types';

export const DELIVERY_SERVICE_BASE_URL = 'http://10.0.0.43:3000';

export default class DeliveryService {
  static axiosInstance = axios.create({
    baseURL: `${DELIVERY_SERVICE_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
    },
  });

  static async createMessage(createMessageDTO: CreateMessageDTO) {
    const response = await this.axiosInstance.post<MessageEntity>(
      '/message',
      createMessageDTO,
    );
    return response.data;
  }

  static async createUser(createUserDTO: CreateUserDTO) {
    const response = await this.axiosInstance.post<UserEntity>(
      '/user',
      createUserDTO,
    );

    return response.data;
  }

  static async patchUser(username: string, patchUserDTO: PatchUserDTO) {
    const response = await this.axiosInstance.patch<UserEntity>(
      `/user/${username}`,
      patchUserDTO,
    );
    return response.data;
  }

  static async getUser(username: string) {
    const response = await this.axiosInstance.get<UserEntity>(
      `/user/${username}`,
    );
    return response.data;
  }

  static async getUsers() {
    const response = await this.axiosInstance.get<UserEntity[]>('/user');
    return response.data;
  }

  static async getMessages(username: string) {
    const response = await this.axiosInstance.get<MessageEntity[]>(
      `/message/${username}`,
    );
    return response.data;
  }
}
