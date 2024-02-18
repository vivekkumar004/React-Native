import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const CapitalDetails = ({navigation, route}: any) => {
  const {capital} = route.params;
  const {useLayoutEffect, useState} = React;
  const [countryDetail, setCountryDetail] = useState({
    current: {
      weather_icons: '',
      temperature: '',
      precip: '',
      wind_speed: '',
    },
  });

  const handleResponse = (data: any) => {};

  useLayoutEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=2c503e42a6c1a3ae7022c8fc68a0daf2&query=${capital}`,
      )
      .then(response => {
        handleResponse(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <View>
      <Text style={styles.title}>Weather Details</Text>
      <Image
        style={styles.image}
        source={{uri: countryDetail?.current.weather_icons[0]}}
      />
      <Text style={styles.data}>
        Temperature : {countryDetail?.current.temperature} &#176;C
      </Text>
      <Text style={styles.data}>
        Precipitation : {countryDetail?.current.precip}%
      </Text>
      <Text style={styles.data}>
        Wind Speed : {countryDetail?.current.wind_speed} MPH
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 110,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 130,
    marginHorizontal: 40,
    marginBottom: 40,
  },
  data: {
    color: 'black',
    margin: 20,
    fontSize: 16,
    marginLeft: 40,
  },
});

export default React.memo(CapitalDetails);
