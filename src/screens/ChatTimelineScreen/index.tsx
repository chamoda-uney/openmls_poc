import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';
import useChatList from '../../hooks/useChatList';
import {StorageService} from '../../sdk';
import ChatInputBottom from './ChatInputBottom';
import ChatTimelineList from './ChatTimelineList';

const ChatTimelineScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={130}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ChatTimelineList />
        <ChatInputBottom />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatTimelineScreen;

const ChatTimelineScreenAppBar = () => {
  const navigation = useNavigation();
  const {selectedGroupId} = useChatList();

  const group = StorageService.default.getGroup(selectedGroupId!);

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={group.name} />
      <Appbar.Action onPress={() => {}} icon="plus" />
    </Appbar.Header>
  );
};

export {ChatTimelineScreenAppBar};
