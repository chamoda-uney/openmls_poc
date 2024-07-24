import React from 'react';
import {TouchableOpacity} from 'react-native';
import {User} from '../sdk/storage-service/schema';
import {Avatar, Text, useTheme} from 'react-native-paper';
import useCreateGroup from '../hooks/useCreateGroup';

export type PublicUserListItemProps = {user: User};

const PublicUserListItem: React.FC<PublicUserListItemProps> = ({user}) => {
  const {newGroupOpponentUsername, setNewGroupOpponentUsername} =
    useCreateGroup();

  const handleOnPress = () => {
    setNewGroupOpponentUsername(user.username);
  };

  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
        padding: 8,
        borderRadius: 8,
        backgroundColor:
          newGroupOpponentUsername === user.username
            ? theme.colors.primaryContainer
            : 'transparent',
      }}
      onPress={handleOnPress}>
      <Avatar.Text size={48} label={`${user.name[0].toUpperCase()}`} />
      <Text variant="bodyLarge">{user.name}</Text>
    </TouchableOpacity>
  );
};

export default PublicUserListItem;
