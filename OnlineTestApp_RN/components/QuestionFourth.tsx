import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppDataContext, AppContextType } from '../App'
import QuestionButtons from './QuestionButtons'
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const QuestionFourth = ({ navigation }: any) => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType

    const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[styles.options,
                    { backgroundColor: isActive ? "red" : 'lightgrey' },
                    ]}
                >
                    <Text style={[styles.optionText]}>{item}</Text>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    const handleDragChange = ({ data }: any) => {
        setAppData((prev: any) => {
            const { answers } = prev
            const updatedAnswerData = { ...answers, q4: data }
            return { ...prev, answers: updatedAnswerData }
        })
    }

    return (
        <View>
            <QuestionButtons navigation={navigation} />
            <Text style={styles.text}>Answer the below questions by matching it (hint:drag and drop the gray boxes!)</Text>
            <View style={styles.optionsContainer}>
                <View >
                    <Text style={styles.text}>Something that is used in cricket  -  </Text>
                    <Text style={styles.text}>part of a computer - </Text>
                    <Text style={styles.text}>used to measure the temperature - </Text>
                </View>
                <GestureHandlerRootView>
                    <DraggableFlatList
                        data={appData?.answers?.q4}
                        onDragEnd={handleDragChange}
                        keyExtractor={(_, index) => "" + index}
                        renderItem={renderItem}
                    />
                </GestureHandlerRootView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
    },
    optionText: {
        color: 'black',
    },
    optionsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    options: {
        height: 20,
        margin: 10,
        paddingLeft: 6,
        paddingRight: 6
    }
})

export default QuestionFourth