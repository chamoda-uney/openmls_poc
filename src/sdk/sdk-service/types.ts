import {MessageType} from '../delivery-service/types';

export interface BroadCastedMessage {
  createdUsername: string;
  destinationUsername?: string;
  messageType: MessageType;
  groupId: string;
}
