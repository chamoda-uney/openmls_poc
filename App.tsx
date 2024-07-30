/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import SdkService from './src/sdk';
import AddNewMemberScreen, {
  AddNewMemberScreenAppBar,
} from './src/screens/AddNewMemberScreen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme as unknown as NavigationTheme,
});

function App(): React.JSX.Element {
  const init = async () => {
    await SdkService.default.init();
    setInitializing(false);
  };

  const [initializing, setInitializing] = React.useState(true);

  useEffect(() => {
    init();
  }, []);
  return (
    <PaperProvider theme={MD3LightTheme}>
      {initializing ? (
        <></>
      ) : (
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
            <Stack.Screen
              name={screens.AddNewMemberScreen}
              options={{
                header: () => <AddNewMemberScreenAppBar />,
              }}
              component={AddNewMemberScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}

export default App;
