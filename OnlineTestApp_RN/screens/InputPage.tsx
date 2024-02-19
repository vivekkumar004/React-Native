import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'

const InputPage = ({ navigation }: any) => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true)

    const handlePress = () => {
        navigation.navigate("QuestionPage");
    };

    const handleChange = (text: string, field: string) => {
        if (field === 'name') {
            setAppData((prev: any) => {
                const { userData } = prev
                const updatedUserData = { ...userData, name: text }
                return { ...prev, userData: updatedUserData }
            })
        }

        if (field === 'phone') {
            const textparsed = Number(text)
            setAppData((prev: any) => {
                const { userData } = prev
                const updatedUserData = { ...userData, number: textparsed }
                return { ...prev, userData: updatedUserData }
            })
        }

        if (field === 'email') {
            setAppData((prev: any) => {
                const { userData } = prev
                const updatedUserData = { ...userData, email: text }
                return { ...prev, userData: updatedUserData }
            })
        }

        if (field === 'language') {
            setAppData((prev: any) => {
                const { userData } = prev
                const updatedUserData = { ...userData, preferredLanguage: text }
                return { ...prev, userData: updatedUserData }
            })
        }
    }

    React.useEffect(() => {
        const nameLength = appData?.userData.name?.length
        const emailLength = appData?.userData.email?.length
        const phone = String(appData?.userData.number)
        const phoneLength = phone?.length
        const langLength = appData?.userData.preferredLanguage?.length

        if (nameLength && nameLength > 0 && emailLength && emailLength > 0 && langLength && langLength > 0 &&
            phoneLength && phoneLength > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [appData])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Your details to start the test</Text>
            <Text style={styles.text}>Enter your Name</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Name"
                placeholderTextColor="gray"
                onChangeText={(text: string) => handleChange(text, 'name')}
            />

            <Text style={styles.text}>Enter your Phone No.</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Phone Number"
                placeholderTextColor="gray"
                onChangeText={(text: string) => handleChange(text, 'phone')}
            />

            <Text style={styles.text}>Enter your Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Email"
                placeholderTextColor="gray"
                onChangeText={(text: string) => handleChange(text, 'email')}
            />

            <Text style={styles.text}>Enter your Preferred language</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Language"
                placeholderTextColor="gray"
                onChangeText={(text: string) => handleChange(text, 'language')}
            />

            <View style={styles.button}>
                <Button disabled={buttonDisabled} title="Start Test" onPress={handlePress} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    container: {
        flex: 1,
        margin: '10%'
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        color: 'black'
    },
    text: {
        color: '#000',
        marginTop: '10%'
    },
    button: {
        marginTop: '15%',
    }
})

export default InputPage