import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import GroupListItem from '../../components/GroupListItem';
import {StorageService} from '../../sdk';
import {Group} from '../../sdk/storage-service/schema';

const ChatList = () => {
  const groupsRealm = StorageService.default
    .getGroups()
    .sorted('_lastMessage._id', false);

  const loadGroups = () => {
    const _groups: Group[] = [];

    for (const group of groupsRealm) {
      _groups.push(group);
    }

    return _groups.reverse();
  };

  const [groups, setGroups] = React.useState<Group[]>([]);

  useEffect(() => {
    setGroups(loadGroups());
    groupsRealm.addListener((_groups, changes) => {
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
