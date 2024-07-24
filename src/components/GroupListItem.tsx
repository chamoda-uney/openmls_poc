import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Group} from '../sdk/storage-service/schema';
import {Avatar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import screens from '../screens/navigations';
import useChatList from '../hooks/useChatList';

export type GroupListItemProps = {group: Group};

const GroupListItem: React.FC<GroupListItemProps> = ({group}) => {
  const navigation = useNavigation();

  const {setSelectedGroupId} = useChatList();

  const handleTouch = () => {
    navigation.navigate(screens.ChatTimelineScreen as never);
    setSelectedGroupId(group.groupId);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
      }}
      onPress={handleTouch}>
      <Avatar.Text size={48} label={`${group.name[0].toUpperCase()}`} />
      <Text variant="bodyLarge">{group.name}</Text>
    </TouchableOpacity>
  );
};

export default GroupListItem;
