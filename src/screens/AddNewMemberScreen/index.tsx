import React from 'react';
import {FlatList, View} from 'react-native';
import {PublicUserListItemForAddingToNewGroup} from '../../components/PublicUserListItem';
import useAddNewMember from '../../hooks/useAddNewMember';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AddNewMemberScreen = () => {
  const {filteredUsers} = useAddNewMember();

  return (
    <View style={{flex: 1, gap: 16}}>
      <FlatList
        style={{
          margin: 4,
        }}
        data={filteredUsers}
        keyExtractor={item => item.username!.toString()}
        renderItem={({item}) => (
          <PublicUserListItemForAddingToNewGroup user={item} />
        )}
      />
    </View>
  );
};

export default AddNewMemberScreen;

const AddNewMemberScreenAppBar = () => {
  const navigation = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Add New Member" />
    </Appbar.Header>
  );
};

export {AddNewMemberScreenAppBar};
