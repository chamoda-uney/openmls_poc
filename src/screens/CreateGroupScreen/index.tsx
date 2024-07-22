import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {User} from '../../sdk/storage-service/schema';
import Realm from 'realm';
import PublicUserListItem from '../../components/PublicUserListItem';
import {useNavigation} from '@react-navigation/native';

const CreateGroupScreen = () => {
  const [groupNameText, setGroupNameText] = React.useState('');

  const publicMembers: Partial<User>[] = [
    {
      username: new Realm.BSON.ObjectID(1),
      name: 'Chamoda',
      keyPackage: 'test',
    },
    {
      username: new Realm.BSON.ObjectID(2),
      name: 'Ranasinghe',
      keyPackage: 'test2',
    },
  ];

  return (
    <View style={{flex: 1, gap: 16}}>
      <TextInput
        onChange={e => setGroupNameText(e.nativeEvent.text)}
        mode="flat"
        label="Group name"
        placeholder="Type group name"
      />

      <FlatList
        style={{
          margin: 4,
        }}
        data={publicMembers}
        keyExtractor={item => item.username!.toString()}
        renderItem={({item}) => <PublicUserListItem user={item as User} />}
      />
    </View>
  );
};

export default CreateGroupScreen;

const CreateGroupScreenAppBar = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Create Group" />
      <Appbar.Action icon="camera" />
    </Appbar.Header>
  );
};

export {CreateGroupScreenAppBar};
