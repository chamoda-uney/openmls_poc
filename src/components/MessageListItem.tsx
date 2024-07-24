import React from 'react';
import {View} from 'react-native';
import {Message} from '../sdk/storage-service/schema';
import {Avatar, Text, useTheme} from 'react-native-paper';

export type MessageListItemProps = {
  message: Message;
  registeredUsername: string;
};

const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  registeredUsername,
}) => {
  if (message.createdUsername === registeredUsername) {
    return <SentMessage message={message} />;
  }
  return <ReceiveMessage message={message} />;
};

const SentMessage: React.FC<Pick<MessageListItemProps, 'message'>> = ({
  message,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          padding: 16,
          margin: 6,
          borderRadius: 10,
          backgroundColor: theme.colors.inversePrimary,
          maxWidth: '80%',
        }}>
        <Text>{message.payload}</Text>
      </View>
    </View>
  );
};

const ReceiveMessage: React.FC<Pick<MessageListItemProps, 'message'>> = ({
  message,
}) => {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginLeft: 6,
        }}>
        <Avatar.Text
          size={28}
          label={
            message._createdUser
              ? message._createdUser.name[0]
              : message.createdUsername[0]
          }
          style={{
            backgroundColor: theme.colors.inverseSurface,
          }}
        />
        <View
          style={{
            marginTop: 6,
            marginLeft: 2,
            borderRadius: 10,
            backgroundColor: theme.colors.tertiary,
            maxWidth: '80%',
            paddingLeft: 4,
            paddingRight: 6,
          }}>
          <View
            style={{
              paddingTop: 4,
              paddingLeft: 4,
            }}>
            <Text
              variant="labelSmall"
              style={{
                color: theme.colors.inversePrimary,
              }}>
              {message._createdUser
                ? message._createdUser.name
                : message.createdUsername}
            </Text>
            <View
              style={{
                paddingRight: 16,
                paddingBottom: 8,
                paddingTop: 0,
              }}>
              <Text style={{color: theme.colors.onTertiary}}>
                {message.payload}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageListItem;
