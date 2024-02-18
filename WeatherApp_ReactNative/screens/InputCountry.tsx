import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

const InputCountry = ({navigation}: any) => {
  const {useState} = React;
  const [countryName, setCountryName] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleButtonPress = () => {
    navigation.push('Country Details', {countryName});
  };

  const handleChange = (value: string) => {
    value.length < 4 ? setButtonDisable(true) : setButtonDisable(false);
    setCountryName(value);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="gray"
          autoFocus={true}
          style={styles.input}
          // clearButtonMode="always"
          onChangeText={handleChange}
          placeholder="Enter the Country name"
          value={countryName}
        />
        <Text style={styles.errorText}>
          {countryName.length < 4 ? 'Type atleast 4 characters' : null}
        </Text>
        <View style={styles.button}>
          <Button
            disabled={buttonDisable}
            onPress={handleButtonPress}
            title="SUBMIT"
            color="#000"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  button: {
    width: '40%',
    backgroundColor: '#BED1CF',
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default React.memo(InputCountry);
