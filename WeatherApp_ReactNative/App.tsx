import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import InputCountry from './screens/InputCountry'
import CountryDetails from './screens/CountryDetails';
import CapitalDetails from './screens/CapitalDetails';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={InputCountry} />
        <Stack.Screen name="Country Details" component={CountryDetails} />
        <Stack.Screen name="Capital Details" component={CapitalDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({

});

export default App;
