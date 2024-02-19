import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'

const QuestionButtons = ({ navigation }: any) => {

  const [appData] = React.useContext(AppDataContext) as AppContextType

  const handlePress = (qno: string) => {
    navigation.navigate(qno)
  }

  const answers = appData?.answers

  return (
    <View style={styles.container}>
      <Button color={answers?.q1 ? "red" : "gray"} title="1" onPress={() => handlePress("QuestionFirst")} />
      <Button color={answers?.q2 ? "red" : "gray"} title="2" onPress={() => handlePress("QuestionSecond")} />
      <Button color={answers?.q3 ? "red" : "gray"} title="3" onPress={() => handlePress("QuestionThird")} />
      <Button color={answers?.q4 ? "red" : "gray"} title="4" onPress={() => handlePress("QuestionFourth")} />
      <Button color={answers?.q5[0].status === 'checked' || answers?.q5[1].status === 'checked' || answers?.q5[2].status === 'checked' ? "red" : "gray"} title="5" onPress={() => handlePress("QuestionFifth")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '70%',
    margin: '15%',
    borderWidth: 1,
    padding: 5,
    borderColor: 'lightgrey',
    borderRadius: 15
  },
  button: {

  }
})

export default QuestionButtons