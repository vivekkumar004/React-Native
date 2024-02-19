import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'

const InputPage = ({ navigation }: any) => {

    const [totalSpaces, setTotalSpaces] = React.useState<number>(0)

    const handlePress = () => {
        navigation.navigate("ParkingManagement", { totalSpaces });
    };

    const handleChange = (text: string) => {
        const textparsed = Number(text)
        setTotalSpaces(textparsed)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Parking Management</Text>
            <TextInput
                testID='Parking-create-text-input'
                style={styles.input}
                placeholder="Enter number of parking spaces"
                placeholderTextColor="gray"
                keyboardType="numeric"
                onChangeText={handleChange}
            />
            <View style={styles.button}>
                <Button title='Submit' testID='Parking-create-submit button' disabled={!totalSpaces}
                    onPress={handlePress}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 70
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        margin: 20
    },
    text: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
    }
})

export default InputPage