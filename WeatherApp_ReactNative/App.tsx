import React, { type PropsWithChildren } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InputCountry from './screens/InputCountry'
import CountryDetails from './screens/CountryDetails';
import CapitalDetails from './screens/CapitalDetails';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: 'black',
        headerStyle: { backgroundColor: '#FFF7F1' },
      }}
      initialRouteName='Home'>
        <Stack.Screen name="Country Detail Screen" component={InputCountry} />
        <Stack.Screen name="Country Details" component={CountryDetails} />
        <Stack.Screen name="Capital Details" component={CapitalDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
