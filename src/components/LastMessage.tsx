import React, {useMemo} from 'react';
import {Group} from '../sdk/storage-service/schema';
import {Text, useTheme} from 'react-native-paper';
import {StorageService} from '../sdk';
import {getRegisteredUser} from '../sdk/sdk-service/helper';
import {View} from 'react-native';

export type LastMessageProps = {group: Group};

const LastMessage: React.FC<LastMessageProps> = ({group}) => {
  const lastMessage = StorageService.default.getLastMessageOfGroup(
    group.groupId,
  );

  if (!lastMessage) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const registeredUser = useMemo(() => {
    return getRegisteredUser();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '85%',
      }}>
      <Text
        variant="bodySmall"
        style={{fontWeight: 'bold', color: theme.colors.primary, fontSize: 11}}
        numberOfLines={1}>
        {lastMessage.createdUsername === registeredUser.username
          ? 'You: '
          : `${lastMessage._createdUser?.name}: `}
      </Text>
      <Text variant="bodySmall" numberOfLines={1} style={{fontSize: 11}}>
        {lastMessage.createdUsername === registeredUser.username
          ? `${lastMessage.payload}`
          : `${lastMessage.payload}`}
      </Text>
    </View>
  );
};

export default LastMessage;
