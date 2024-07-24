import {hookstate, useHookstate} from '@hookstate/core';

interface ChatListState {
  selectedGroupId?: string;
}

const defaultChatListState: ChatListState = {};

const chatList = hookstate<ChatListState>(defaultChatListState);

const useChatList = () => {
  const chatListState = useHookstate(chatList);

  const {selectedGroupId} = chatListState.get();

  const setSelectedGroupId = (value: string | undefined) => {
    chatListState.merge({selectedGroupId: value});
  };

  return {
    selectedGroupId,
    setSelectedGroupId,
  };
};

export default useChatList;
