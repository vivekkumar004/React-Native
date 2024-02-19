import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import InputPage from './screens/InputPage';
import ParkingManagement from './screens/ParkingManagement';
import Payment from './screens/Payment';

export type totalSpacesDataType = {
  id: number | null;
  free: boolean | null;
  time: Date | null;
  registrationNo: string | null;
};

export type ParkingDataContextType = {
  totalSpacesData: totalSpacesDataType[];
  setTotalSpacesData: (item: any) => void;
};

export const ParkingDataContext =
  React.createContext<ParkingDataContextType | null>(null);

const App = () => {
  const Stack = createStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
      text: 'black',
    },
  };

  const [totalSpacesData, setTotalSpacesData] = React.useState<
    Array<totalSpacesDataType>
  >([]);

  return (
    <ParkingDataContext.Provider value={{totalSpacesData, setTotalSpacesData}}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="InputPage" component={InputPage} />
          <Stack.Screen
            name="ParkingManagement"
            component={ParkingManagement}
          />
          <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
      </NavigationContainer>
    </ParkingDataContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
