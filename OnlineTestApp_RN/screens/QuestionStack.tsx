import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionFifth from '../components/QuestionFifth';
import QuestionFirst from '../components/QuestionFirst';
import QuestionFourth from '../components/QuestionFourth';
import QuestionThird from '../components/QuestionThird';
import QuestionSecond from '../components/QuestionSecond';

const QuestionStack = ({ navigation }: any) => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>

            <Stack.Screen name="QuestionFirst" component={QuestionFirst} />
            <Stack.Screen name="QuestionSecond" component={QuestionSecond} />
            <Stack.Screen name="QuestionThird" component={QuestionThird} />
            <Stack.Screen name="QuestionFourth" component={QuestionFourth} />
            <Stack.Screen name="QuestionFifth" component={QuestionFifth} />

        </Stack.Navigator>
    )
}

export default QuestionStack