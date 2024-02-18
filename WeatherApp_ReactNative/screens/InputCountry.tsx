import * as  React from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet, Button, Alert } from "react-native";

const InputCountry = ({ navigation }: any) => {
    const { useState, useRef } = React;
    const [countryName, setCountryName] = useState("")
    const [buttonDisable, setButtonDisable] = useState(true)
    const errorRef = useRef(false)

    const handleButtonPress = () => {
        navigation.push('Country Details', { countryName })
    }

    const handleChange = (value: string) => {
        if (value.length < 4) {
            setButtonDisable(true)
            errorRef.current = true;
        }
        else {
            setButtonDisable(false)
            errorRef.current = false;
        }
        setCountryName(value)
    }

    return (

        <View style={styles.container}>
            <TextInput
                placeholderTextColor="#000"
                autoFocus={true}
                style={styles.input}
                clearButtonMode="always"
                onChangeText={handleChange}
                placeholder="Enter Country"
                value={countryName}
            />
            <Text style={styles.errorText}>{errorRef.current ? "Type atleast 4 characters" : ""}</Text>

            <View style={styles.button}>
                <Button disabled={buttonDisable} onPress={handleButtonPress} title="Submit" />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    input: {
        color: 'black',
        backgroundColor: 'white',
        height: 50,
        width: 150,
        borderWidth: 1,
        borderRadius: 6,

    },
    button: {
        width: 80,
        height: 60,
        borderRadius: 5,
        marginTop: 20,
    },
    errorText: {
        color: 'red',
    }
})

export default React.memo(InputCountry);
