import {View, Button, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';

const Input_Page = ({navigation}: any) => {
  const [asteroidId, setAsteroidId] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const pattern = /^\d+$/;

  function handleInputChange(text: string) {
    setButtonDisabled(text.length < 3);
    setAsteroidId(text);
  }

  const handleSubmit = () => {
    navigation.navigate('Asteroid Details', {asteroidId});
    setAsteroidId('');
  };

  const handleRandom = () => {
    let randomAsteroid = Math.floor(Math.random() * 20);
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
      .then((response: any) =>
        navigation.navigate('Asteroid Details', {
          asteroidId: response.data.near_earth_objects[randomAsteroid].id,
        }),
      )
      .catch(() => {
        Alert.alert('Error');
      });
    setAsteroidId('');
  };

  React.useEffect(() => {
    setButtonDisabled(!pattern.test(asteroidId));
  }, [asteroidId]);

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter Asteroid Id"
        onChangeText={handleInputChange}
        style={styles.input}
        autoFocus={true}
        placeholderTextColor="gray"
        value={asteroidId}
      />

      <View style={styles.buttonSubmit}>
        <Button
          onPress={handleSubmit}
          disabled={buttonDisabled}
          title="Submit"
        />
      </View>

      <View style={styles.buttonRandom}>
        <Button
          color="#000"
          onPress={handleRandom}
          title="Get Random Asteroid"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFE5',
  },

  buttonSubmit: {
    width: '45%',
    margin: 20,
  },
  buttonRandom: {
    backgroundColor: '#B4B4B8',
    borderRadius: 10,
    padding: 2,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    color: 'black',
    borderRadius: 50,
    padding: 8,
    paddingLeft: 20,
  },
});

export default Input_Page;
