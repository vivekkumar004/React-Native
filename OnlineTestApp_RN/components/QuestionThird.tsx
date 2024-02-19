import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'
import QuestionButtons from './QuestionButtons'

const QuestionThird = ({ navigation }: any) => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType

    const handleInputValue = (value: string) => {
        setAppData((prev: any) => {
            const { answers } = prev
            const updatedAnswerData = { ...answers, q3: value }
            return { ...prev, answers: updatedAnswerData }
        })
    }

    return (
        <View>
            <QuestionButtons navigation={navigation} />
            <View style={styles.questionContainer}>
                <TextInput
                    placeholderTextColor="grey"
                    placeholder='type here'
                    style={styles.input}
                    onChangeText={handleInputValue}
                    value={appData?.answers.q3 ? `${appData?.answers?.q3}` : ""}
                />
                <Text style={styles.text}>
                    is the Nation Animal of India.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        color: 'black',
        width: '25%',
        height: 40,
        marginRight: 10,
        marginBottom: 7
    },
    questionContainer: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 40,
        marginLeft: '10%'
    },
    text: {
        color: 'black'
    }
})

export default QuestionThird