import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MIcon from 'react-native-vector-icons/FontAwesome';
import {useReducer, useEffect, useCallback, useState} from 'react';

type cartitems = {
  cartId: number;
  count: number;
};

type initialstate = {
  TotalCartItemsCount: number;
  cartItems: cartitems[];
};

type action = {
  type:
    | 'REFRESH'
    | 'RECYCLE'
    | 'INCREMENT'
    | 'DECREMENT'
    | 'DELETE'
    | 'SETTOTALITEMSCOUNT';
  payload: any;
};

export default function App() {
  const initialState: initialstate = {
    TotalCartItemsCount: 0,
    cartItems: [
      {
        cartId: 0,
        count: 0,
      },
      {
        cartId: 1,
        count: 0,
      },
      {
        cartId: 2,
        count: 0,
      },
      {
        cartId: 3,
        count: 0,
      },
    ],
  };

  function reducer(state: initialstate, action: action) {
    switch (action.type) {
      case 'REFRESH':
        return initialState;
      case 'RECYCLE':
        return {
          TotalCartItemsCount: 0,
          cartItems: [],
        };
      case 'INCREMENT':
        const cartArray = state.cartItems;
        const selectedCartItem = {
          ...state?.cartItems[action.payload],
          count: state.cartItems[action.payload].count + 1,
        };
        cartArray[action.payload] = selectedCartItem;
        return {...state, cartItems: cartArray};
      case 'DECREMENT':
        const cartarray = state.cartItems;
        const selectedcartItem = {
          ...state?.cartItems[action.payload],
          count: state.cartItems[action.payload].count - 1,
        };
        cartarray[action.payload] = selectedcartItem;
        return {...state, cartItems: cartarray};
      case 'DELETE':
        const cart_array = state.cartItems;
        const updatedArray = cart_array.filter(
          item => item.cartId != action.payload,
        );
        return {...state, cartItems: updatedArray};
      case 'SETTOTALITEMSCOUNT':
        return {...state, TotalCartItemsCount: action.payload};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalCount, setTotalCount] = useState<number>(
    state.TotalCartItemsCount,
  );

  useEffect(() => {
    let count = state.TotalCartItemsCount;
    if (state?.cartItems[0]?.count > 0) {
      count = count + 1;
    }
    if (state?.cartItems[1]?.count > 0) {
      count = count + 1;
    }
    if (state?.cartItems[2]?.count > 0) {
      count = count + 1;
    }
    if (state?.cartItems[3]?.count > 0) {
      count = count + 1;
    }
    setTotalCount(count);
  }, [state]);

  const renderItem = ({item, index}: any) => (
    <View style={styles.individualItem}>
      <Text
        style={[
          styles.text,
          {
            backgroundColor: item?.count > 0 ? '#0066ff' : '#ffff00',
            paddingLeft: item?.count > 0 ? 29 : 14,
          },
        ]}>
        {item?.count > 0 ? item?.count : 'Zero'}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => dispatch({type: 'INCREMENT', payload: index})}>
        <MIcon name="plus-circle" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={item?.count <= 0 ? true : false}
        style={styles.subtractButton}
        onPress={() => dispatch({type: 'DECREMENT', payload: index})}>
        <MIcon name="minus-circle" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch({type: 'DELETE', payload: item?.cartId})}>
        <MIcon name="trash" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <MIcon name="shopping-cart" size={30} />
        <Text style={styles.totalItems}>{totalCount}</Text>
        <Text style={{fontSize: 19}}>Items</Text>
      </View>
      <View style={styles.functionalButtons}>
        <TouchableOpacity
          style={styles.refresh}
          onPress={() => dispatch({type: 'REFRESH', payload: {}})}>
          <MIcon name="refresh" size={25} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recycle}
          onPress={() => dispatch({type: 'RECYCLE', payload: {}})}>
          <MIcon name="recycle" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={state?.cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#e6ffff',
  },
  topContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 190,
    marginLeft: '25%',
    marginTop: '10%',
  },
  totalItems: {
    width: 55,
    backgroundColor: '#00b8e6',
    borderRadius: 50,
    height: 35,
    padding: 4,
    paddingLeft: 22,
    fontSize: 19,
    color: 'white',
  },
  refresh: {
    backgroundColor: '#2eb82e',
    borderRadius: 6,
    width: 40,
    height: 40,
    padding: 8,
  },
  recycle: {
    backgroundColor: '#4db8ff',
    borderRadius: 6,
    width: 40,
    height: 40,
    padding: 8,
    marginLeft: 30,
  },
  functionalButtons: {
    flexDirection: 'row',
    margin: '10%',
    marginLeft: '37%',
  },
  individualItem: {
    margin: 15,
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 21,
    fontWeight: 'bold',
    height: 40,
    width: 70,
    padding: 4,
  },
  addButton: {
    backgroundColor: 'gray',
    borderRadius: 6,
    width: 40,
    height: 40,
    padding: 8,
  },
  subtractButton: {
    backgroundColor: '#4775d1',
    borderRadius: 6,
    width: 40,
    height: 40,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: '#ff1a1a',
    borderRadius: 6,
    height: 40,
    padding: 9,
    width: 40,
  },
});
