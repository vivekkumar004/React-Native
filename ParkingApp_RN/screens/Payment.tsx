import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { ParkingDataContext, totalSpacesDataType, ParkingDataContextType } from '../App'
import axios from 'axios';


const Payment = ({ navigation, route }: any) => {
    const { totalSpacesData, setTotalSpacesData } = React.useContext(ParkingDataContext) as ParkingDataContextType;
    const { id } = route.params

    const [parkingChargesData, setParkingChargesData] = React.useState({ registrationNo: '', time: 0, charges: 0 })

    const CalculatePrice = (hoursSpent: number) => {
        if (hoursSpent == 0) {
            return 0
        }
        else if (hoursSpent <= 2) {
            return 10
        }
        else {
            return 10 + (hoursSpent - 2) * 10
        }
    }

    React.useEffect(() => {
        let parking_time;
        totalSpacesData?.map((item: any) => {
            if (item.id === id) {
                const time = item.time.toLocaleTimeString();
                parking_time = Number(time.split(':')[0])
                const present_time = Number(new Date().toLocaleTimeString().split(':')[0])
                const hoursSpent = present_time - parking_time
                const price = Number(CalculatePrice(hoursSpent))
                setParkingChargesData(prev => ({ ...prev, registrationNo: item.registrationNo, time: hoursSpent, charges: price }));
            }
        })

    }, [])

    const goBack = () => {
        navigation.pop()
    }

    const PaymentTaken = () => {
        const updatedData = totalSpacesData?.map(item => {
            if (item.id === id) {
                return { ...item, free: true, registrationNo: '', time: '' };
            }
            else {
                return item
            }
        })
        setTotalSpacesData(updatedData)

        axios.post("https://httpstat.us/200", {
            "car-registration": parkingChargesData.registrationNo,
            "charge": parkingChargesData.charges,
        })
            .then(res => { })
            .catch(err => { })

        navigation.pop()
    }


    return (
        <View>
            <View style={styles.backBtn}><Button testID='deregister-back-button' onPress={goBack} title='Go Back' /></View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Car Registration Number : {parkingChargesData.registrationNo}</Text>
                <Text testID='deregister-time-spent' style={styles.text}>Time Spent : {parkingChargesData.time}</Text>
                <Text testID='deregister-charge' style={styles.text}>Parking Charges : {parkingChargesData.charges}</Text>
            </View>
            <View style={{ width: '80%', margin: '10%' }}>
                <Button testID='deregister-payment-button' onPress={PaymentTaken} title='payment taken' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backBtn: {
        margin: 10,
        width: 100,
    },
    text: {
        color: 'black',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightblue',
    },
    textContainer: {
        margin: 10,
        borderWidth: 3,
        borderColor: 'lightblue',
        padding: 10,
        borderRadius: 10
    }
})

export default Payment