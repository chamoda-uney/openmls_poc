import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Group} from '../sdk/storage-service/schema';
import {Avatar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import screens from '../screens/navigations';
import useChatList from '../hooks/useChatList';
import LastMessage from './LastMessage';

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
      <View>
        <Text style={{fontWeight: 'bold'}} variant="bodyLarge">
          {group.name}
        </Text>
        <LastMessage group={group} />
      </View>
    </TouchableOpacity>
  );
};

export default GroupListItem;
