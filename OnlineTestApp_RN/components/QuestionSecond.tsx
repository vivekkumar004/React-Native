import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'
import QuestionButtons from './QuestionButtons'
import { RadioButton } from 'react-native-paper';

const QuestionSecond = ({ navigation }: any) => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType

    const handleRadioValue = (value: string) => {
        setAppData((prev: any) => {
            const { answers } = prev
            const updatedAnswerData = { ...answers, q2: value }
            return { ...prev, answers: updatedAnswerData }
        })
    }

    return (
        <View>
            <QuestionButtons navigation={navigation} />
            <Text style={[styles.text, styles.questionText]}>Moon is Earth's natural satellite?</Text>

            <RadioButton.Group onValueChange={handleRadioValue} value={appData ? `${appData?.answers?.q2}` : ""}>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="True" value="true" />
                </View>
                <View style={styles.radioContainer}>
                    <RadioButton.Item label="False" value="false" />
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

export default QuestionSecond