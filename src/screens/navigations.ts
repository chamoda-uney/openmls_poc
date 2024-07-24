const screens = {
  ChatListScreen: 'Chats',
  CreateGroupScreen: 'Create Group',
  ChatTimelineScreen: 'Chat Timeline',
  AddNewMemberScreen: 'Add New Member',
};

export default screens;

export type Screens = keyof typeof screens;
