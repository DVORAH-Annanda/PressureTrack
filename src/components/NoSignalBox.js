import React, { useState } from "react";
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const NoSignalBox = (props) => {
    console.log(`PressureBox pressureValue ${JSON.stringify(props.children.pressureValue)}`)
    console.log(`PressureBox MINpressureValue ${JSON.stringify(props.children.minPressureValue)}`)
    return (
        <View style={styles.container} >
            <Text style={styles.valueBox}>No Signal</Text>
        </View>
    );
}

//<Text>{props.children.pressureValue}</Text>

const styles = StyleSheet.create({
container: {    
    width: '100%',
    height: 25,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 1.5,
    backgroundColor: colors.noSignalBlue,
    alignItems: 'center',
    justifyContent: 'center',
},
valueBox: {
color: colors.white,
},
});



export default NoSignalBox;