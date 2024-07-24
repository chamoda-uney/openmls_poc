import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator, Appbar, TextInput} from 'react-native-paper';
import {User} from '../../sdk/storage-service/schema';
import PublicUserListItem from '../../components/PublicUserListItem';
import {useNavigation} from '@react-navigation/native';
import useCreateGroup from '../../hooks/useCreateGroup';

const CreateGroupScreen = () => {
  const {
    publicUserDirectory,
    loadPublicGroups,
    isLoadingPublicDirectory,
    setNewGroupName,
    newGroupName,
    setNewGroupOpponentUsername,
  } = useCreateGroup();

  useEffect(() => {
    loadPublicGroups();
    return () => {
      setNewGroupName('');
      setNewGroupOpponentUsername(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingPublicDirectory) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, gap: 16}}>
      <TextInput
        onChange={e => setNewGroupName(e.nativeEvent.text)}
        mode="flat"
        label="Group name"
        placeholder="Type group name"
        value={newGroupName}
      />

      <FlatList
        style={{
          margin: 4,
        }}
        data={publicUserDirectory}
        keyExtractor={item => item.username!.toString()}
        renderItem={({item}) => <PublicUserListItem user={item as User} />}
      />
    </View>
  );
};

export default CreateGroupScreen;

const CreateGroupScreenAppBar = () => {
  const navigation = useNavigation();

  const {
    isLoadingPublicDirectory,
    newGroupName,
    newGroupOpponentUsername,
    createNewGroup,
  } = useCreateGroup();

  const handleOnPress = () => {
    createNewGroup();
    navigation.goBack();
  };

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Create Group" />
      {isLoadingPublicDirectory === false &&
        newGroupOpponentUsername &&
        newGroupName && <Appbar.Action icon="check" onPress={handleOnPress} />}
    </Appbar.Header>
  );
};

export {CreateGroupScreenAppBar};
