import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import LocationList from './LocationList'
import MapViewPage from './MapViewPage'

export type current = {
    id: number | null
    name: string | null,
    time: string | null,
    coordinates: {
        latitude: number,
        longitude: number
    }
}

export type LocationListType = {
    currentLocation: current,
    history: current[]
}

export type contextType = {
    locationList: LocationListType,
    setLocationList: (item: any) => void,
    isLocationAllowed: boolean | null,
    setIsLocationAllowed: (value: boolean) => void
};

export const defaultValue: LocationListType = {
    currentLocation: {
        id: null,
        name: "",
        time: "",
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    },
    history: []
}

export const LocationDetailsContext = React.createContext<contextType | null>(null)

const Provider = () => {
    const [locationList, setLocationList] = React.useState<LocationListType>(defaultValue)
    const [listShow, setListShow] = React.useState(true)
    const [isLocationAllowed, setIsLocationAllowed] = React.useState<boolean | null>(null)

    return (
        <LocationDetailsContext.Provider value={{ locationList, setLocationList, isLocationAllowed, setIsLocationAllowed }}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>
                        Location Manager
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button testID='navigation-locations-tab' title="Location List" onPress={() => setListShow(true)} />
                    </View>

                    <View style={styles.button}>
                        <Button testID='navigation-map-tab' title="Map View" onPress={() => setListShow(false)} />
                    </View>
                </View>

                <View style={styles.bodyCotainer}>
                    {
                        listShow ? <LocationList /> : <MapViewPage />
                    }
                </View>
            </View>
        </LocationDetailsContext.Provider>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        height: '10%',
        flexWrap: 'wrap',
        width: '100%',
    },
    button: {
        backgroundColor: 'lightgray',
        width: '45%',
        margin: '2%'
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    bodyCotainer: {
        height: '85%',
        borderWidth: 1,
        margin: 5,
        borderColor: 'lightgray',
        padding: 10
    }
});


export default Provider