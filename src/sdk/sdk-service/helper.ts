import {StorageService} from '..';
import {RegisteredUserProfile} from '../storage-service/schema';

const getRegisteredUser = (): RegisteredUserProfile => {
  const registeredUser = StorageService.default.getRegisteredUserProfile();
  if (!registeredUser) {
    throw new Error('User not found');
  }
  return registeredUser;
};

export {getRegisteredUser};
