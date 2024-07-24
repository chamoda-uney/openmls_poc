import {hookstate, useHookstate} from '@hookstate/core';

interface ChatListState {
  selectedGroupId?: string;
}

const defaultChatListState: ChatListState = {};

const chatList = hookstate<ChatListState>(defaultChatListState);

const useChatList = () => {
  const chatListState = useHookstate(chatList);

  const {selectedGroupId} = chatListState.get();

  return {
    selectedGroupId,
  };
};

export default useChatList;
