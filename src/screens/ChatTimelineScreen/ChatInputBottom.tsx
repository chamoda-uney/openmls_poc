import React from 'react';
import {View} from 'react-native';
import {IconButton, TextInput, useTheme} from 'react-native-paper';
import SdkService from '../../sdk';
import useChatList from '../../hooks/useChatList';

const ChatInputBottom = () => {
  const theme = useTheme();

  const [message, setMessage] = React.useState('');

  const {selectedGroupId} = useChatList();

  const handleSend = () => {
    if (message.length === 0 || selectedGroupId === undefined) {
      return;
    }
    SdkService.default.sendApplicationMessage(selectedGroupId, message);
  };

  return (
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
        <TextInput
          value={message}
          onChange={e => setMessage(e.nativeEvent.text)}
          mode="outlined"
          placeholder="Type a message"
        />
      </View>
      <IconButton
        iconColor={theme.colors.primary}
        icon="send"
        style={{}}
        onPress={handleSend}
      />
    </View>
  );
};

export default ChatInputBottom;
