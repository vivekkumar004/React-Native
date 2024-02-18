import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const RawJSON = ({route}: any) => {
  const {item} = route.params;
  return (
    <ScrollView>
      <Text style={{color: 'black'}}>{JSON.stringify(item, null, 4)}</Text>
    </ScrollView>
  );
};

export default RawJSON;
