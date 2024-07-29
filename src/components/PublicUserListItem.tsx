import React from 'react';
import {TouchableOpacity} from 'react-native';
import {User} from '../sdk/storage-service/schema';
import {ActivityIndicator, Avatar, Text, useTheme} from 'react-native-paper';
import useCreateGroup from '../hooks/useCreateGroup';
import SdkService from '../sdk';
import useChatList from '../hooks/useChatList';
import {useNavigation} from '@react-navigation/native';

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

const PublicUserListItemForAddingToNewGroup: React.FC<
  PublicUserListItemProps
> = ({user}) => {
  const {selectedGroupId} = useChatList();

  const [adding, setAdding] = React.useState(false);

  const navigation = useNavigation();

  const handleOnPress = async () => {
    setAdding(true);
    await SdkService.default.inviteMemberToGroup(
      selectedGroupId!,
      user.username,
    );
    setAdding(false);
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
        padding: 8,
        borderRadius: 8,
      }}
      onPress={handleOnPress}>
      {adding ? (
        <ActivityIndicator />
      ) : (
        <Avatar.Text size={48} label={`${user.name[0].toUpperCase()}`} />
      )}

      <Text variant="bodyLarge">{user.name}</Text>
    </TouchableOpacity>
  );
};

export {PublicUserListItemForAddingToNewGroup};

export default PublicUserListItem;
