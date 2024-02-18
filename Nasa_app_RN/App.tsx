import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Input_Page from './Sccreens/Input_Page';
import Asteroid_details from './Sccreens/Asteroid_details';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Page" component={Input_Page} />
        <Stack.Screen name="Asteroid Details" component={Asteroid_details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
