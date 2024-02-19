import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'
import QuestionButtons from './QuestionButtons'
import { RadioButton } from 'react-native-paper';

const QuestionFirst = ({ navigation }: any) => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType

    const handleRadioValue = (value: string) => {
        setAppData((prev: any) => {
            const { answers } = prev
            const updatedAnswerData = { ...answers, q1: value }
            return { ...prev, answers: updatedAnswerData }
        })
    }

    return (
        <View>
            <QuestionButtons navigation={navigation} />
            <Text style={[styles.text, styles.questionText]}>Which organ does the work of Pumping Blood to our body?</Text>

            <RadioButton.Group onValueChange={handleRadioValue} value={appData ? `${appData?.answers?.q1}` : ""}>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Brain" value="brain" />
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Heart" value="heart" />
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Lungs" value="lungs" />
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="Kidney" value="kidney" />
                </View>
            </RadioButton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        marginTop: 7
    },
    radioContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginLeft: 25
    },
    questionText: {
        fontWeight: 'bold',
        margin: 15
    }
})

export default QuestionFirst