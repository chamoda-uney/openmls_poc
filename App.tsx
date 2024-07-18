/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NativeModules} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [registeredUserData, setRegisteredUserData] = React.useState();

  const handleRegisterUser = () => {
    const nativeF = NativeModules.OpenMLS.registerUser;
    nativeF(
      {
        user_id: 'chamoda_abc',
      },
      (res: any) => {
        setRegisteredUserData(res);
      },
    );
  };

  const handleInitMls = () => {
    const nativeF = NativeModules.OpenMLS.initMls;
    nativeF();
  };

  const handleCreateGroup = () => {
    const nativeF = NativeModules.OpenMLS.createGroup;
    nativeF(
      {
        group_id: 'group_abc',
        registered_user_data: registeredUserData,
      },
      (res: any) => {
        console.log(res);
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button title="0 - Init MLS" onPress={handleInitMls} />

      <Button title="1 - Register User" onPress={handleRegisterUser} />

      <Button title="2 - Create Group" onPress={handleCreateGroup} />
    </SafeAreaView>
  );
}

export default App;
