import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'
import QuestionButtons from './QuestionButtons'
import { Button, Checkbox } from 'react-native-paper'

export default function QuestionFifth({ navigation }: any) {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType

    const handleInputValue = (id: number) => {
        setAppData((prev: any) => {
            const { answers } = prev
            const q5 = answers.q5
            const currentCheckBox = q5[id]
            const updatedcurrentCheckBox = { ...currentCheckBox, status: currentCheckBox.status === 'checked' ? 'unchecked' : 'checked' }
            q5[id] = updatedcurrentCheckBox
            const updatedAnswerData = { ...answers, q5: q5 }
            return { ...prev, answers: updatedAnswerData }
        })
    }

    return (
        <View>
            <QuestionButtons navigation={navigation} />
            <Text style={styles.text}>Select the parts which belongs to the Bike.</Text>
            <View style={styles.CheckboxContainer}>
                {appData?.answers.q5.map((item) => (
                    <Checkbox.Item
                        label={item.title}
                        key={item.id}
                        status={item.status === 'checked' ? 'checked' : 'unchecked'}
                        onPress={() => handleInputValue(item.id)} />))}
            </View>
            <View style={styles.button}>
                <Button mode="contained" uppercase={false} color='green' onPress={() => navigation.navigate('ResultPage')}>
                    Submit
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        margin: 10
    },
    CheckboxContainer: {
        width: '40%',
        marginLeft: 20
    },
    button: {
        width: '40%',
        margin: '30%',
    }
})