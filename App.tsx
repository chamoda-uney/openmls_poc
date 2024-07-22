/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  adaptNavigationTheme,
  DefaultTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {NavigationTheme} from 'react-native-paper/lib/typescript/types';
import CreateGroupScreen, {
  CreateGroupScreenAppBar,
} from './src/screens/CreateGroupScreen';
import ChatListScreen, {
  ChatListScreenAppBar,
} from './src/screens/ChatListScreen';
import ChatTimelineScreen, {
  ChatTimelineScreenAppBar,
} from './src/screens/ChatTimelineScreen';
import screens from './src/screens/navigations';

const Stack = createNativeStackNavigator();

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme as unknown as NavigationTheme,
});

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={LightTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name={screens.ChatListScreen}
            component={ChatListScreen}
            options={{
              header: () => <ChatListScreenAppBar />,
            }}
          />
          <Stack.Screen
            options={{
              header: () => <CreateGroupScreenAppBar />,
            }}
            name={screens.CreateGroupScreen}
            component={CreateGroupScreen}
          />
          <Stack.Screen
            options={{
              header: () => <ChatTimelineScreenAppBar />,
            }}
            name={screens.ChatTimelineScreen}
            component={ChatTimelineScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
