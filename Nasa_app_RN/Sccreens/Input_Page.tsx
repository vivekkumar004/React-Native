import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { CardStyleInterpolators } from '@react-navigation/stack'
import axios from 'axios'

const Input_Page = ({ navigation }: any) => {

    const [asteroidId, setAsteroidId] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const pattern = /^\d+$/;

    function handleInputChange(text: string) {
        setButtonDisabled(text.length < 3)
        setAsteroidId(text)
    }

    const handleSubmit = () => {
        navigation.navigate('Asteroid Details', { asteroidId })
        setAsteroidId("")
    }

    const handleRandom = () => {
        let randomAsteroid = Math.floor(Math.random() * 20);
        axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
            .then((response: any) => navigation.navigate('Asteroid Details', { asteroidId: response.data.near_earth_objects[randomAsteroid].id }))
            .catch(() => { })
        setAsteroidId("")
    }

    React.useEffect(() => {
        setButtonDisabled(!pattern.test(asteroidId))
    }, [asteroidId])

    return (
        < View style={styles.container}>
            <TextInput keyboardType='numeric'
                placeholder='Enter Asteroid Id'
                onChangeText={handleInputChange}
                style={styles.input}
                autoFocus={true}
                placeholderTextColor='black'
                value={asteroidId}
            />

            <View style={styles.buttonSubmit}>
                <Button onPress={handleSubmit} disabled={buttonDisabled} title="Submit" />
            </View>

            <View style={styles.buttonRandom}>
                <Button onPress={handleRandom} title="Random Asteroid" />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonSubmit: {
        width: '45%',
        margin: 30,
    },
    buttonRandom: {
        width: '45%',
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: '70%',
        color: 'black',
        borderRadius: 6,
    }
})

export default Input_Page