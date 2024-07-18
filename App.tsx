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

  const handleOnPress = () => {
    const nativeF = NativeModules.OpenMLS.hello;
    nativeF();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button title="Run OpenMLS" onPress={handleOnPress} />
    </SafeAreaView>
  );
}

export default App;
