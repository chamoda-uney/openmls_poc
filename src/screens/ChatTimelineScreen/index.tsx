import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {Appbar, IconButton, TextInput, useTheme} from 'react-native-paper';
import {Message, User} from '../../sdk/storage-service/schema';
import MessageListItem from '../../components/MessageListItem';

const demoMessages: Partial<Message>[] = [
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0001',
    messageType: 'ApplicationMessage',
    payload: 'Hello, how are you?',
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0001',
    messageType: 'ApplicationMessage',
    payload: 'I am fine. How about you?',
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0001',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0004',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0004',
      name: 'Uney',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0001',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0004',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0004',
      name: 'Uney',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0002',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0002',
      name: 'Faysz',
    } as User,
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0001',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
  },
  {
    _groupId: 'g_0001',
    createdUsername: 'u_0004',
    messageType: 'ApplicationMessage',
    payload: 'I am good. What about you?',
    _createdUser: {
      username: 'u_0004',
      name: 'Uney',
    } as User,
  },
];

const ChatTimelineScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={130}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          inverted
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          data={demoMessages}
          renderItem={({item}) => (
            <MessageListItem
              message={item as Message}
              registeredUsername="u_0001"
            />
          )}
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <TextInput mode="outlined" placeholder="Type a message" />
          </View>
          <IconButton
            iconColor={theme.colors.primary}
            icon="send"
            style={{}}
            onPress={() => {}}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatTimelineScreen;

const ChatTimelineScreenAppBar = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Chat" />
    </Appbar.Header>
  );
};

export {ChatTimelineScreenAppBar};
