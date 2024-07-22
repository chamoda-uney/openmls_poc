const screens = {
  ChatListScreen: 'Chats',
  CreateGroupScreen: 'Create Group',
  ChatTimelineScreen: 'Chat Timeline',
};

export default screens;

export type Screens = keyof typeof screens;
