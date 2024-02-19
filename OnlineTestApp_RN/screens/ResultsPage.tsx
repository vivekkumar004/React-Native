import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { VictoryPie } from 'victory-native'
import { AppDataContext, AppContextType } from '../App'

const ResultsPage = () => {

    const [appData, setAppData] = React.useContext(AppDataContext) as AppContextType
    const [graphicData, setGraphicData] = React.useState([
        { y: 5, x: '00%' },
        { y: 50 / 10, x: '50%' },
    ])
    const graphicColor = ['green', 'red']

    React.useLayoutEffect(() => {
        let correctAnswers = 0
        if (appData.answers.q1 === 'heart') {
            correctAnswers = correctAnswers + 20
        }
        if (appData.answers.q2 === 'true') {
            correctAnswers = correctAnswers + 20
        }
        if (appData.answers.q3 === 'Tiger' || appData.answers.q3 === 'tiger') {
            correctAnswers = correctAnswers + 20
        }
        if (appData.answers.q4[0] === 'stumps' && appData.answers.q4[1] === 'cpu' && appData.answers.q4[2] === 'thermometer') {
            correctAnswers = correctAnswers + 20
        }
        if (appData.answers.q5[0].status === 'checked' && appData.answers.q5[1].status === 'unchecked' && appData.answers.q5[2].status === 'checked') {
            correctAnswers = correctAnswers + 20
        }

        const updatedValues = ([
            { y: correctAnswers / 10, x: `${correctAnswers}%` },
            { y: (100 - correctAnswers) / 10, x: `${100 - correctAnswers}%` },
        ])
        setGraphicData(updatedValues)
    }, [])

    return (
        <View>
            <Text style={styles.text}>Hello {appData.userData.name} the Results are : </Text>
            <View style={styles.pieChart}>
                <VictoryPie
                    colorScale={graphicColor}
                    data={graphicData}
                    width={250}
                    height={250}
                    style={{
                        labels: {
                            fill: 'black', fontSize: 15, padding: 7,
                        },
                    }}
                />
            </View>
            <View style={styles.bottomTextContainer}>
                <View style={styles.greenBox}></View>
                <Text style={styles.colortext}> : Correct answers</Text>
                <View style={styles.redBox}></View>
                <Text style={styles.colortext}> : Wrong answers</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        margin: "15%",
        fontSize: 19,
        fontWeight: "bold",
        textDecorationLine: 'underline'
    },
    pieChart: {
        marginLeft: "18%",
        marginTop: -30
    },
    redBox: {
        backgroundColor: 'red',
        height: 10,
        width: 10,
        marginLeft: 19
    },
    greenBox: {
        backgroundColor: 'green',
        height: 10,
        width: 10
    },
    bottomTextContainer: {
        justifyContent: 'center',
        flexWrap: "wrap",
        height: 20,
        marginLeft: '10%',
    },
    colortext: {
        color: 'black',
        marginTop: -2
    }
})

export default ResultsPage