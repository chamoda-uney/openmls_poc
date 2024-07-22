import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Group} from '../sdk/storage-service/schema';
import {Avatar, Text} from 'react-native-paper';

export type GroupListItemProps = {group: Group};

const GroupListItem: React.FC<GroupListItemProps> = ({group}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
      }}>
      <Avatar.Text size={48} label={`${group.name[0].toUpperCase()}`} />
      <Text variant="bodyLarge">{group.name}</Text>
    </TouchableOpacity>
  );
};

export default GroupListItem;
