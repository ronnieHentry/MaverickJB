import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import SongList from './src/components/pages/SongList';
import Player from './src/components/pages/Player';
import PermissionWrapper from './src/components/ReusableComponents/PermissionWrapper'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PermissionWrapper>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SongList" component={SongList} />
            <Stack.Screen name="Player" component={Player} />
          </Stack.Navigator>
        </PermissionWrapper>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
