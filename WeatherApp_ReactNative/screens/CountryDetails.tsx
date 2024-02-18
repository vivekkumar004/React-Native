import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const CountryDetails = ({ route, navigation }: any) => {
    const { countryName } = route.params
    const { useLayoutEffect, useState } = React;
    const [wrongCountryError, setwrongCountryError] = useState(false);
    const [countryDetail, setCountryDetail] = useState({
        "flags": { "png": "https://" }, "capital": "", "latlng": [0, 0], "population": ""
    })

    useLayoutEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
            .then((response) => {
                setCountryDetail(response.data[0])
            })
            .catch(() => {
                setwrongCountryError(true)
            })
    }, [])

    function handleButtonPress() {
        navigation.push('Capital Details', { capital: countryDetail.capital })
    }
    return (
        <View>
            {wrongCountryError ? <Text style={styles.errorMsg}>Please Enter a valid Country Name</Text>
                :
                <View>
                    <Text style={styles.text}>Country Details</Text>
                    <View>
                        <Image style={styles.image} source={{ uri: countryDetail.flags.png }} />
                    </View>
                    <Text style={styles.data}>Capital : {countryDetail?.capital}</Text>
                    <Text style={styles.data}>Country's Population : {countryDetail?.population}</Text>
                    <Text style={styles.data}>Latitude : {countryDetail?.latlng[0]}</Text>
                    <Text style={styles.data}>Longitude : {countryDetail?.latlng[1]}</Text>
                    <View style={styles.button}>
                        <Button onPress={handleButtonPress} title="Capital Weather" />
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 120
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 40,
        marginHorizontal: 40
    },
    data: {
        color: 'black',
        margin: 20,
        fontSize: 16,
        marginLeft: 40
    },
    button: {
        width: 200,
        marginHorizontal: 80,
        marginTop: 40,
    },
    errorMsg: {
        color: 'red',
        fontSize: 16,
        margin: 50,
    }

})

export default React.memo(CountryDetails);
