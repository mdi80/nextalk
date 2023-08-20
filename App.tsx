import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  View,
  useColorScheme,
} from 'react-native';
import { MainStackNavigator } from './app/navigator/stackNavigations';
import { Provider } from 'react-redux';
import { store } from './app/store';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    flex: 1,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
