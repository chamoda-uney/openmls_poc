import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

const ChatListScreen = () => {
  return <View></View>;
};

export default ChatListScreen;

const ChatListScreenAppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Chats" />
    </Appbar.Header>
  );
};

export {ChatListScreenAppBar};
