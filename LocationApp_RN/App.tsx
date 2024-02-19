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
import Provider from './components/Provider';


const App = () => {

  return (
    <SafeAreaView>
      <Provider />
    </SafeAreaView>
  );
};

export default App;
