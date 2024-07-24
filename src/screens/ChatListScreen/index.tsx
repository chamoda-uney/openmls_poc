import React, {useEffect} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {Group} from '../../sdk/storage-service/schema';
import GroupListItem from '../../components/GroupListItem';
import useRegistration from '../../hooks/useRegistration';
import {useNavigation} from '@react-navigation/native';
import screens from '../navigations';
import useCreateGroup from '../../hooks/useCreateGroup';

const groups: Partial<Group>[] = [
  {
    groupId: 'g_0001',
    name: 'Uney Chat',
  },
  {
    groupId: 'g_0002',
    name: 'HR Internal',
  },
];

const ChatListScreen = () => {
  const {isUserRegistered} = useRegistration();

  const {loadPublicGroups} = useCreateGroup();

  useEffect(() => {
    if (isUserRegistered) {
      loadPublicGroups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserRegistered]);

  if (isUserRegistered) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          style={{
            margin: 4,
          }}
          renderItem={({item}) => <GroupListItem group={item as Group} />}
          keyExtractor={item => item.groupId!.toString()}
          data={groups}
        />
      </View>
    );
  }

  return <RegisteredUserProfile />;
};

export default ChatListScreen;

const RegisteredUserProfile = () => {
  const {registerUser, isRegistering} = useRegistration();

  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');

  const handleRegister = () => {
    registerUser(username, name);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        mode="outlined"
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={{
          margin: 8,
        }}
      />
      <TextInput
        mode="outlined"
        label="Display name"
        placeholder="Display name"
        value={name}
        onChangeText={text => setName(text)}
        style={{
          margin: 8,
        }}
      />
      <Button
        style={{
          margin: 8,
        }}
        onPress={handleRegister}
        loading={isRegistering}
        mode="contained">
        Register
      </Button>
    </KeyboardAvoidingView>
  );
};
const ChatListScreenAppBar = () => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate(screens.CreateGroupScreen as never);
  };

  return (
    <Appbar.Header>
      <Appbar.Content title="MLS Chats" />
      <Appbar.Action onPress={handleOnPress} icon="plus" />
    </Appbar.Header>
  );
};

export {ChatListScreenAppBar};
