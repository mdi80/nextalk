import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RootStackNavigator } from './app/navigator/stackNavigations';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Container from './app/components/screenContainer';
import WebSocketContextContainer from './app/webSocketContextContainer';


function App(): JSX.Element {

  

  return (
    <Container>
      <Provider store={store}>
        <WebSocketContextContainer>

          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </WebSocketContextContainer>

      </Provider>
    </Container>
  );
}

export default App;
