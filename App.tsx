import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootStackNavigator } from './app/navigator/stackNavigations';
import { Provider } from 'react-redux';
import { store } from './app/store';


function App(): JSX.Element {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
