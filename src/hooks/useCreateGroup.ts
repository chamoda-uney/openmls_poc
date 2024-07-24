import {hookstate, useHookstate} from '@hookstate/core';
import {User} from '../sdk/storage-service/schema';
import SdkService from '../sdk';

export interface CreateGroupState {
  isLoadingPublicDirectory: boolean;
  publicUserDirectory: User[];
  newGroupName: string;
  newGroupOpponentUsername?: string;
}

const defaultCreateGroupState: CreateGroupState = {
  isLoadingPublicDirectory: false,
  publicUserDirectory: [],
  newGroupName: '',
  newGroupOpponentUsername: undefined,
};

const createGroup = hookstate<CreateGroupState>(defaultCreateGroupState);

const useCreateGroup = () => {
  const createGroupState = useHookstate(createGroup);

  const {
    isLoadingPublicDirectory,
    publicUserDirectory,
    newGroupName,
    newGroupOpponentUsername,
  } = createGroupState.get();

  const setNewGroupName = (value: string) => {
    createGroupState.merge({newGroupName: value});
  };

  const setNewGroupOpponentUsername = (value: string | undefined) => {
    createGroupState.merge({newGroupOpponentUsername: value});
  };

  const loadPublicGroups = async () => {
    createGroupState.isLoadingPublicDirectory.set(true);
    const result = await SdkService.default.updatePublicUserDirectory();
    createGroupState.merge({publicUserDirectory: result});
    createGroupState.isLoadingPublicDirectory.set(false);
  };

  const createNewGroup = async () => {
    if (!newGroupName || !newGroupOpponentUsername) {
      return;
    }
    await SdkService.default.createGroup(
      newGroupName,
      newGroupOpponentUsername,
    );
  };

  return {
    isLoadingPublicDirectory,
    publicUserDirectory,
    loadPublicGroups,
    newGroupName,
    createNewGroup,
    newGroupOpponentUsername,
    setNewGroupName,
    setNewGroupOpponentUsername,
  };
};

export default useCreateGroup;
