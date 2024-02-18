import * as React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

interface countryResponseType {
  flagUrl: string;
  capital: string;
  latlng: {lat: number | undefined; lng: number | undefined};
  population: number | undefined;
  area: number | undefined;
}

const CountryDetails = ({route, navigation}: any) => {
  const {countryName} = route.params;
  const {useLayoutEffect, useState} = React;
  const [error, setError] = useState(false);
  const [countryDetail, setCountryDetail] = useState<countryResponseType>({
    flagUrl: '',
    capital: '',
    latlng: {lat: undefined, lng: undefined},
    population: undefined,
    area: undefined,
  });

  const handleResponse = (data: any) => {
    console.log('latest', data);
    if (data.message === 'Not Found') {
      Alert.alert('Error', 'country name not valid');
    } else {
      const {
        capital: [capital],
        latlng: [lat, lng],
        area,
        population,
        flags: {png},
      } = data[1];
      setCountryDetail({
        flagUrl: png,
        capital: capital,
        latlng: {lat: lat, lng: lng},
        population: population,
        area: area,
      });
    }
  };

  useLayoutEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        handleResponse(response.data);
      })
      .catch(() => {
        setError(true);
        Alert.alert('Error', 'error occured');
      });
  }, []);

  function handleButtonPress() {
    navigation.push('Capital Details', {capital: countryDetail.capital});
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFE4C9'}}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMsg}>Please Enter a valid Country Name</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            <Text style={styles.countryName}>Country Details</Text>
            <Image style={styles.image} source={{uri: countryDetail.flagUrl}} />
            <Text style={styles.bodyTitle}>
              Capital :{' '}
              <Text style={styles.bodyText}>{countryDetail?.capital}</Text>{' '}
            </Text>
            <Text style={styles.bodyTitle}>
              Country's Population :{' '}
              <Text style={styles.bodyText}>{countryDetail.population}</Text>
            </Text>
            <Text style={styles.bodyTitle}>
              Area :<Text style={styles.bodyText}> {countryDetail.area}</Text>
            </Text>
            <Text style={styles.bodyTitle}>
              Latitude :{' '}
              <Text style={styles.bodyText}>{countryDetail.latlng.lat}</Text>
            </Text>
            <Text style={styles.bodyTitle}>
              Longitude :
              <Text style={styles.bodyText}>{countryDetail.latlng.lng}</Text>
            </Text>
            <View style={styles.button}>
              <Button
                onPress={handleButtonPress}
                title="Capital Weather"
                color="black"
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  countryName: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
    marginHorizontal: 40,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  bodyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
  },
  bodyText: {
    fontWeight: '300',
  },
  button: {
    width: 200,
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#BED1CF',
    borderRadius: 10,
    padding: 5,
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    margin: 50,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default React.memo(CountryDetails);
