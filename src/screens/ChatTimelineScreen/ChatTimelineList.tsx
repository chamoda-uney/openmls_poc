import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import MessageListItem from '../../components/MessageListItem';
import {getRegisteredUser} from '../../sdk/sdk-service/helper';
import useChatList from '../../hooks/useChatList';
import {StorageService} from '../../sdk';
import {Message} from '../../sdk/storage-service/schema';

const ChatTimelineList = () => {
  const registeredUser = getRegisteredUser();

  const {selectedGroupId} = useChatList();

  const messagesRealm = StorageService.default.getApplicationMessages(
    selectedGroupId!,
  );

  const loadMessages = () => {
    const _messages: Message[] = [];
    messagesRealm;
    for (const msg of messagesRealm) {
      _messages.push(msg);
    }

    return _messages.reverse();
  };

  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    setMessages(loadMessages());
    messagesRealm.addListener((_messages, changes) => {
      changes.insertions.forEach(() => {
        setMessages(loadMessages());
      });
    });

    return () => {
      messagesRealm.removeAllListeners();
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
