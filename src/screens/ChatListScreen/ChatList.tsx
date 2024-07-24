import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import GroupListItem from '../../components/GroupListItem';
import {StorageService} from '../../sdk';

const ChatList = () => {
  const loadGroups = () => {
    const groups = StorageService.default.getGroups();
    return groups;
  };

  const [groups, setGroups] = React.useState(loadGroups());

  useEffect(() => {
    groups.addListener((_groups, changes) => {
      changes.insertions.forEach(() => {
        setGroups(loadGroups());
      });
      changes.newModifications.forEach(() => {
        setGroups(loadGroups());
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      style={{
        margin: 4,
      }}
      renderItem={({item}) => <GroupListItem group={item} />}
      keyExtractor={item => item.groupId!.toString()}
      data={groups}
    />
  );
};

export default ChatList;
