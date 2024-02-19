import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-date-picker'
import { ParkingDataContext, totalSpacesDataType, ParkingDataContextType } from '../App'


const ParkingManagement = ({ navigation, route }: any) => {

    const { totalSpacesData, setTotalSpacesData } = React.useContext(ParkingDataContext) as ParkingDataContextType;

    const { totalSpaces } = route.params;
    const [buttonSwitch, setButtonSwitch] = React.useState<boolean>(true)
    const [date, setDate] = React.useState<Date>(new Date())
    const [timePopup, setTimePopup] = React.useState<boolean>(false)
    const [registrationNo, setRegistrationNo] = React.useState<string>("")
    const [submitButtonDisable, setSubmitButtonDisable] = React.useState<boolean>(true)
    const [availableSpaces, setAvailableSpaces] = React.useState<number>(totalSpaces)

    React.useEffect(() => {
        let data = []
        for (let i = 1; i <= totalSpaces; i++) {
            data.push({
                id: i,
                free: true,
                time: "",
                registrationNo: ""
            })
        }
        setTotalSpacesData(data)
    }, [])

    React.useEffect(() => {
        let spacesAvailable: number = 0
        totalSpacesData.map(item => {
            if (item.free === true) { spacesAvailable++; }
        })
        setAvailableSpaces(spacesAvailable)
    }, [totalSpacesData])

    const handleRegistrationNumber = (text: string) => {
        setRegistrationNo(text)
        if (registrationNo.length >= 5) {
            setSubmitButtonDisable(false)
        }
        else setSubmitButtonDisable(true)
    }

    const handleSubmit = () => {
        const getRandomNumberFunction = () => Math.floor(Math.random() * totalSpaces);

        const registringData = () => {
            const randomNumber = getRandomNumberFunction()
            const modifiedData: Array<totalSpacesDataType> = totalSpacesData?.map(item => {
                if (item.id === randomNumber + 1) {
                    if (item.free === true) {
                        setAvailableSpaces(prev => prev - 1)
                        const reg = registrationNo
                        setRegistrationNo("")
                        setButtonSwitch(true)
                        return { ...item, free: false, registrationNo: reg, time: date };
                    }
                    else {
                        Alert.alert("Engaged", "This parking spot has already been registered.Try again.")
                        setRegistrationNo("")
                        setButtonSwitch(true)
                    }
                }
                return item;
            })
            setTotalSpacesData(modifiedData)
        }

        if (availableSpaces <= 0) {
            Alert.alert("", "Parking is Full")
        }
        else {
            registringData()
        }
    }

    const handleCheckout = (id: any) => {
        navigation.push('Payment', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Available spaces {availableSpaces} of {totalSpaces}</Text>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={totalSpacesData}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) => (item.free ?
                        <View testID={`parking-drawing-space-${item.id}`} style={styles.initialNumberTextContainer}>
                            <Text testID={`parking-drawing-space-number-${item.id}`} style={styles.initialNumberText}>{item.id}</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => handleCheckout(item.id)}>
                            <View testID={`parking-drawing-registered-${item.id}`} style={styles.filledDetailsContainer}>
                                <Text style={styles.idText}>{item.id}</Text>
                                <Text style={styles.registerNumber}>{item.registrationNo}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.button}>
                {buttonSwitch ? <Button onPress={() => setButtonSwitch(false)} title="Add New Parking" />
                    :
                    <View>
                        <View style={styles.timeButton}>
                            <Button title="Set Parking Time" onPress={() => setTimePopup(true)} />
                        </View>
                        <DatePicker
                            modal
                            mode="time"
                            is24hourSource="device"
                            open={timePopup}
                            date={date}
                            onConfirm={(date) => {
                                setTimePopup(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setTimePopup(false)
                            }}
                        />
                        <Text style={styles.inputtext}>Car Registration Number : </Text>
                        <TextInput testID='parking-drawing-registration-input'
                            style={styles.input}
                            placeholder="Enter vehicle registration number"
                            placeholderTextColor="gray"
                            onChangeText={handleRegistrationNumber}
                        />
                        <View style={styles.buttonContainer}>
                            <Button onPress={() => setButtonSwitch(true)} title="cancel" />
                            <Button testID='parking-drawing-add-carbutton' onPress={handleSubmit} disabled={submitButtonDisable} title="submit" />
                        </View>
                    </View>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        color: 'black',
        backgroundColor: 'lightblue',
        width: '50%',
        margin: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    initialNumberText: {
        color: 'black',
        fontSize: 19,
    },
    initialNumberTextContainer: {
        backgroundColor: 'lightgreen',
        paddingLeft: 45,
        paddingTop: 15,
        height: 60,
        width: 110,
        margin: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'green',
    },
    flatlistContainer: {
        height: '70%',
    },
    button: {
        margin: 50
    },
    inputtext: {
        color: 'black',
        marginTop: 10,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        color: 'black',
    },
    timeButton: {
        marginTop: -35
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5,
        maxHeight: 40
    },
    filledDetailsContainer: {
        backgroundColor: '#FF0000',
        height: 60,
        width: 110,
        margin: 20,
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'white',
    },
    registerNumber: {
        color: 'white',
        marginLeft: 10,
    },
    idText: {
        color: 'white',
        marginLeft: 50,
        margin: 5
    }

})

export default ParkingManagement