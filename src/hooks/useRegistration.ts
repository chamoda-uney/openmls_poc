import {hookstate, useHookstate} from '@hookstate/core';
import SdkService from '../sdk';

export interface RegistrationState {
  isUserRegistered: boolean;
  isRegistering: boolean;
}

export const defaultRegistrationState: RegistrationState = {
  isUserRegistered: false,
  isRegistering: false,
};

const registration = hookstate<RegistrationState>(defaultRegistrationState);

const useRegistration = () => {
  const registrationState = useHookstate(registration);

  const {isUserRegistered, isRegistering} = registrationState.get();

  registrationState.isUserRegistered.set(SdkService.default.isUserRegistered());

  const registerUser = async (username: string, name: string) => {
    username = username.replaceAll(' ', '').toLocaleLowerCase();
    registrationState.isRegistering.set(true);
    await SdkService.default.register(username, name);
    registrationState.isRegistering.set(false);
    registrationState.isUserRegistered.set(
      SdkService.default.isUserRegistered(),
    );
  };

  return {
    registerUser,
    isUserRegistered,
    isRegistering,
  };
};

export default useRegistration;
