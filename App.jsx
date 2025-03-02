import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import SongList from './src/components/pages/SongList';
import Player from './src/components/pages/Player';
import PermissionWrapper from './src/components/ReusableComponents/PermissionWrapper';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PermissionWrapper>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SongList" component={SongList} />
            <Stack.Screen
              name="Player"
              component={Player}
              sharedElements={route => {
                const {index} = route.params;
                return [
                  {
                    id: `song-${index}`,
                    animation: 'move',
                    resize: 'auto',
                    align: 'center-top',
                  },
                ];
              }}
            />
          </Stack.Navigator>
        </PermissionWrapper>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
