import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';

const Asteroid_details = ({route}: any) => {
  type details = {
    name: string;
    closeApproach: string;
    is_potentially_hazardous_asteroid: boolean;
    description: string;
  };

  const {asteroidId} = route.params;
  const [asteroidData, setAsteroidData] = React.useState<details>({
    name: '',
    closeApproach: '',
    description: '',
    is_potentially_hazardous_asteroid: false,
  });
  const [error, setError] = React.useState(false);

  const handleResponse = (data: any) => {
    const {
      close_approach_data: [{close_approach_date_full}],
      name,
      is_potentially_hazardous_asteroid,
      orbital_data: {
        orbit_class: {orbit_class_description},
      },
    } = data;
    setAsteroidData({
      name: name,
      closeApproach: close_approach_date_full,
      is_potentially_hazardous_asteroid: is_potentially_hazardous_asteroid,
      description: orbit_class_description,
    });
  };

  React.useLayoutEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=EMoWGbG8PNnmasNbI0XbwMiYxfWq2OcpM8AfRcBt`,
      )
      .then((response: any) => handleResponse(response.data))
      .catch(() => setError(true));
  }, []);

  return (
    <View style={styles.conatiner}>
      {error ? (
        <Text style={{color: 'red'}}>Please Enter a valid Asteroid Id</Text>
      ) : (
        <View>
          <Text style={styles.title}>
            ID : <Text style={styles.values}>{asteroidId}</Text>
          </Text>
          <Text style={styles.title}>
            Name : <Text style={styles.values}>{asteroidData.name}</Text>
          </Text>
          <Text style={styles.title}>
            Description :
            <Text style={styles.values}> {asteroidData.description}</Text>
          </Text>
          <Text style={styles.title}>
            Closest Approach :
            <Text style={styles.values}> {asteroidData.closeApproach}</Text>
          </Text>
          <Text style={styles.title}>
            is potentially hazardous asteroid :
            <Text style={styles.values}>
              {' '}
              {asteroidData.is_potentially_hazardous_asteroid
                ? 'True'
                : 'False'}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
  },
  values: {
    color: 'black',
    fontSize: 15,
  },
  title: {
    color: '#070F2B',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 18,
  },
});

export default Asteroid_details;
