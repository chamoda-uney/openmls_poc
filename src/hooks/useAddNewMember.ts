import {hookstate, useHookstate} from '@hookstate/core';
import {User} from '../sdk/storage-service/schema';
import {useEffect} from 'react';
import SdkService, {StorageService} from '../sdk';
import useChatList from './useChatList';

interface UseAddNewMemberState {
  filteredUsers: User[];
}

const defaultUseAddNewMemberStateState: UseAddNewMemberState = {
  filteredUsers: [],
};

const useAddNewMemberStateData = hookstate<UseAddNewMemberState>(
  defaultUseAddNewMemberStateState,
);

const useAddNewMember = () => {
  const useAddNewMemberState = useHookstate(useAddNewMemberStateData);
  const {selectedGroupId} = useChatList();

  const {filteredUsers} = useAddNewMemberState.get();

  const handlefilteredUserData = async () => {
    const existingUsers = await SdkService.default.getGroupMemberUsernames(
      selectedGroupId!,
    );
    const filteredUserData =
      StorageService.default.getPublicUserDirectoryExcept(existingUsers);
    useAddNewMemberState.merge({filteredUsers: filteredUserData});
  };

  useEffect(() => {
    handlefilteredUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filteredUsers,
  };
};

export default useAddNewMember;
