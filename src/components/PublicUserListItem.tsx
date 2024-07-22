import React from 'react';
import {TouchableOpacity} from 'react-native';
import {User} from '../sdk/storage-service/schema';
import {Avatar, Text} from 'react-native-paper';

export type PublicUserListItemProps = {user: User};

const PublicUserListItem: React.FC<PublicUserListItemProps> = ({user}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
      }}>
      <Avatar.Text size={48} label={`${user.name[0].toUpperCase()}`} />
      <Text variant="bodyLarge">{user.name}</Text>
    </TouchableOpacity>
  );
};

export default PublicUserListItem;
