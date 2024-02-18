import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import axios from 'axios';

const Asteroid_details = ({ route }: any) => {

    type details = {
        name: string,
        nasa_jpl_url: string,
        is_potentially_hazardous_asteroid: boolean
    }

    const { asteroidId } = route.params;

    const [asteroidData, setAsteroidData] = React.useState<details>([])
    const [error, setError] = React.useState(false)

    React.useLayoutEffect(() => {
        axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=EMoWGbG8PNnmasNbI0XbwMiYxfWq2OcpM8AfRcBt`)
            .then((response: any) => setAsteroidData(response.data))
            .catch(() => setError(true))
    }, [])
    return (
        <View style={styles.conatiner}>
            {
                error ?
                    <Text style={{ color: 'red' }}>Please Enter a valid Asteroid Id</Text> :
                    <View>
                        <Text style={styles.title}>ID : <Text style={styles.values}>{asteroidId}</Text></Text>
                        <Text style={styles.title}>Name : <Text style={styles.values}>{asteroidData.name}</Text></Text>
                        <Text style={styles.title}>nasa jpl url :<Text style={styles.values}> {asteroidData.nasa_jpl_url}</Text></Text>
                        <Text style={styles.title}>is potentially hazardous asteroid :<Text style={styles.values}> {asteroidData.is_potentially_hazardous_asteroid ? "True" : "False"}</Text></Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        marginTop: 40,
        marginLeft: 10,

    },
    values: {
        color: 'black',
        fontWeight: 'normal'
    },
    title: {
        color: 'blue',
        fontWeight: 'bold',
        padding: 5
    }
})

export default Asteroid_details;