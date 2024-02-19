import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LocationDetailsContext, contextType } from './Provider'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';


const MapViewPage = () => {
    enableLatestRenderer();
    const { locationList, setLocationList, isLocationAllowed, setIsLocationAllowed } = React.useContext(LocationDetailsContext) as contextType;
    const { currentLocation } = locationList
    const { latitude, longitude } = currentLocation.coordinates

    const [region, setRegion] = React.useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    return (
        <View style={styles.container}>
            <MapView
                testID='Map View'
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                style={styles.map}
                initialRegion={{
                    latitude: 12.972442,
                    longitude: 77.580643,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={region} title="your present location" />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapViewPage