import React from 'react';
import {FlatList, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
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

const RegisteredUserProfile = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        mode="outlined"
        label="Username"
        placeholder="Username"
        style={{
          margin: 8,
        }}
      />
      <TextInput
        mode="outlined"
        label="Display name"
        placeholder="Display name"
        style={{
          margin: 8,
        }}
      />
      <Button
        style={{
          margin: 8,
        }}
        mode="contained">
        Register
      </Button>
    </KeyboardAvoidingView>
  );
};
const ChatListScreenAppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="MLS Chats" />
    </Appbar.Header>
  );
};

export {ChatListScreenAppBar};
