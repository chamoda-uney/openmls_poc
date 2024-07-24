import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import MessageListItem from '../../components/MessageListItem';
import {getRegisteredUser} from '../../sdk/sdk-service/helper';
import useChatList from '../../hooks/useChatList';
import {StorageService} from '../../sdk';

const ChatTimelineList = () => {
  const registeredUser = getRegisteredUser();

  const {selectedGroupId} = useChatList();

  const loadMessages = () => {
    return StorageService.default.getApplicationMessages(selectedGroupId!);
  };

  const [messages, setMessages] = React.useState(loadMessages());

  useEffect(() => {
    messages.addListener((_messages, changes) => {
      changes.insertions.forEach(() => {
        setMessages(loadMessages());
      });
    });

    return () => {
      messages.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      inverted
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      data={messages}
      renderItem={({item}) => (
        <MessageListItem
          message={item}
          registeredUsername={registeredUser.username}
        />
      )}
    />
  );
};

export default ChatTimelineList;
