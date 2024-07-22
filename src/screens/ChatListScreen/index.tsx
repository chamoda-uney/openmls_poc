import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Group} from '../../sdk/storage-service/schema';
import GroupListItem from '../../components/GroupListItem';

const groups: Partial<Group>[] = [
  {
    groupId: 'g_0001',
    name: 'Uney Chat',
  },
  {
    groupId: 'g_0002',
    name: 'HR Internal',
  },
];

const ChatListScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        style={{
          margin: 4,
        }}
        renderItem={({item}) => <GroupListItem group={item as Group} />}
        keyExtractor={item => item.groupId!.toString()}
        data={groups}
      />
    </View>
  );
};

export default ChatListScreen;

const ChatListScreenAppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="MLS Chats" />
    </Appbar.Header>
  );
};

export {ChatListScreenAppBar};
