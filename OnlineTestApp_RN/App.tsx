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
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionStack from './screens/QuestionStack';
import InputPage from './screens/InputPage';
import ResultsPage from './screens/ResultsPage';


type checkBoxType = {
  id: number,
  title: string,
  status: string,
}

export type AppStateType = {
  userData: {
    name: string | null,
    number: number | null,
    email: string | null,
    preferredLanguage: string | null
  },
  answers: {
    q1: string | null,
    q2: string | null,
    q3: string | null,
    q4: string[],
    q5: checkBoxType[],
  }
}

export type AppContextType = [
  appData: AppStateType,
  setAppData: (item: any) => void
]

export const AppDataContext = React.createContext<AppContextType | null>(null)

const App = () => {

  const initialValue = {
    userData: {
      name: null,
      number: null,
      email: null,
      preferredLanguage: null
    },
    answers: {
      q1: null,
      q2: null,
      q3: null,
      q4: ["cpu", "thermometer", "stumps"],
      q5: [{
        id: 0,
        title: 'engine',
        status: 'unchecked',
      }, {
        id: 1,
        title: 'propellers',
        status: 'unchecked',
      },
      {
        id: 2,
        title: 'gearbox',
        status: 'unchecked',
      }
      ]
    }
  }

  const Stack = createStackNavigator();
  const [appData, setAppData] = React.useState<AppStateType>(initialValue);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
      text: 'black'
    },
  }

  return (
    <AppDataContext.Provider value={[appData, setAppData]}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>

          <Stack.Screen name="InputPage" component={InputPage} />
          <Stack.Screen name="QuestionPage" component={QuestionStack} />
          <Stack.Screen name="ResultPage" component={ResultsPage} />

        </Stack.Navigator>

      </NavigationContainer>
    </AppDataContext.Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
