import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  FlatList,
  Button,
} from 'react-native';
import React, {useContext} from 'react';
import {
  LocationDetailsContext,
  contextType,
  current,
  defaultValue,
  LocationListType,
} from './Provider';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const LocationList = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const totalLocations = React.useRef<number>(0);
  const prevValues = React.useRef<LocationListType>(defaultValue);
  const {
    locationList,
    setLocationList,
    isLocationAllowed,
    setIsLocationAllowed,
  } = useContext(LocationDetailsContext) as contextType;

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === 'granted') {
        setIsLocationAllowed(true);
      } else {
        setIsLocationAllowed(false);
        Alert.alert(
          'Error',
          'Please provide the location permission from the settings',
        );
      }
    } catch (err) {
      setIsLocationAllowed(false);
      Alert.alert(
        'Error',
        'Please provide the location permission from the settings',
      );
    }
  };

  const handlePost = (name: string, time: string) => {
    axios
      .post('https://httpstat.us/200', {location_name: name, time: time})
      .then(response => console.log('success'))
      .catch(err => console.log('error'));
  };

  const getLocation = (latitude: number, longitude: number) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=rootmeinhai`,
    )
      .then(response => response.json())
      .then((data: any) => {
        setLoading(false);
        const {formatted} = data.results[0];
        const date = String(new Date());
        handlePost(formatted, date);
        setLocationList((prev: any) => ({
          ...prev,
          currentLocation: {
            id: totalLocations.current,
            name: formatted,
            time: date,
            coordinates: {
              latitude,
              longitude,
            },
          },
        }));
      })
      .catch(() => Alert.alert('Error', 'Api Failed'));
  };

  const getLocationName = () => {
    totalLocations.current = totalLocations.current + 1;
    Geolocation.getCurrentPosition(({coords}) => {
      const {latitude, longitude} = coords;
      getLocation(latitude, longitude);
    });
  };

  const assignPreviousValue = () => {
    const prevCurrent = prevValues.current.currentLocation;
    const prevHistory = prevValues.current.history;
    prevHistory.unshift(prevCurrent);
    setLocationList((prev: any) => ({
      ...prev,
      prevHistory,
    }));
    getLocationName();
  };

  React.useEffect(() => {
    requestLocationPermission();
    getLocationName();
    setInterval(() => {
      if (totalLocations.current < 30) {
        assignPreviousValue();
      }
    }, 1000 * 60 * 5);
  }, []);

  React.useEffect(() => {
    prevValues.current = locationList;
  }, [locationList]);

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text
          testID={`List-previous-name-${item.name}`}
          numberOfLines={1}
          style={styles.itemtext}>
          {item.name}
        </Text>
        <Text
          testID={`List-previous-time-${item.name}`}
          numberOfLines={1}
          style={styles.itemtext}>
          {item.time}
        </Text>
      </View>
      <View style={styles.deletebutton}>
        <Button
          onPress={() => handleDelete(item.id)}
          color="lightgray"
          title="delete"
        />
      </View>
    </View>
  );

  const handleDeleteAll = () => {
    totalLocations.current = 1;
    setLocationList((prev: any) => ({
      ...prev,
      history: [],
    }));
  };

  const handleDelete = (id: number) => {
    const {history} = locationList;
    const updatedHistory = history.filter(prev => prev.id != id);
    totalLocations.current = totalLocations.current - 1;
    setLocationList((prev: any) => ({
      ...prev,
      history: updatedHistory,
    }));
  };

  return (
    <View>
      {loading ? (
        <View>
          <Text style={{color: 'black'}}>Loading...</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.current_header} testID="list-current-label">
            Current Location
          </Text>
          <Text style={styles.current_text}>
            <Text style={styles.subtext} testID="list-current-name">
              Location{' '}
            </Text>{' '}
            : {locationList.currentLocation.name}
          </Text>
          <Text style={styles.current_text}>
            <Text style={styles.subtext} testID="list-current-time">
              Time{' '}
            </Text>{' '}
            : {locationList.currentLocation.time}
          </Text>
          <Text style={styles.previous_text}>Previous Locations</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={locationList.history}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
            />
          </View>
          <View style={styles.deleteAllbutton}>
            <Button
              testID="list-clear-all-button"
              onPress={handleDeleteAll}
              title="Delete all"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  current_header: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  current_text: {
    color: 'black',
    margin: 2,
  },
  previous_text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtext: {
    textDecorationLine: 'underline',
  },
  listContainer: {
    height: '78%',
  },
  deletebutton: {
    width: 67,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40,
    justifyContent: 'space-between',
    margin: 5,
  },
  itemtext: {
    color: 'black',
  },
  textContainer: {
    height: 20,
    width: '75%',
  },
  deleteAllbutton: {
    width: '40%',
    marginLeft: '25%',
    marginTop: '160%',
    position: 'absolute',
  },
});

export default LocationList;
