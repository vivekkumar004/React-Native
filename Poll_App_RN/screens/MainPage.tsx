import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useRef} from 'react';
import axios from 'axios';

const MainPage = ({navigation}: any) => {
  type data = {
    title: string;
    url: string;
    created_at: string;
    author: string;
    objectID: string;
  };

  const {useState, useEffect} = React;
  const [listData, setListData] = useState<Array<data>>([]);
  // const [pageCount, setPageCount] = useState<number>(0)
  let currentPageNo = useRef<number>(0);

  useEffect(() => {
    setInterval(() => {
      currentPageNo.current = currentPageNo.current + 1;
      axios
        .get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPageNo.current}`,
        )
        .then(response => setListData(prev => prev.concat(response.data.hits)))
        .catch(err =>
          Alert.alert('Error Occured', 'Reasons : Api could have failed'),
        );
    }, 10000);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPageNo.current}`,
      )
      .then(response => setListData(response.data.hits))
      .catch(err =>
        Alert.alert('Error Occured', 'Reasons : Api could have failed'),
      );
    currentPageNo.current = currentPageNo.current + 1;
  }, []);

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('Raw Json', {item})}>
      <View style={styles.itemContainer}>
        <Text key={item.objectID} style={styles.item}>
          {item.url}
        </Text>
        <Text style={styles.item}>{item.title}</Text>
        <Text style={styles.item}>{item.created_at}</Text>
        <Text style={styles.item}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerItem}>URL</Text>
        <Text style={styles.headerItem}>Title</Text>
        <Text style={styles.headerItem}>CREATED AT</Text>
        <Text style={styles.headerItem}>AUTHOR</Text>
      </View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    borderRightWidth: 1,
    width: '25%',
    padding: 4,
    paddingTop: 10,
    borderColor: 'gray',
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
  },
  item: {
    color: 'black',
    borderRightWidth: 1,
    width: '25%',
    padding: 2,
    borderColor: 'gray',
  },
});

export default MainPage;
