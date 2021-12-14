import React, { useState } from "react";
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const PressureBox = (props) => {
    console.log(`PressureBox pressureValue ${JSON.stringify(props.children.pressureValue)}`)
    console.log(`PressureBox MINpressureValue ${JSON.stringify(props.children.minPressureValue)}`)
    return (
        <View style={styles.container(props)} >
            <Text style={styles.textValue}>{props.children.pressureValue} bar</Text>
        </View>
    );
}

//<Text>{props.children.pressureValue}</Text>

const styles = StyleSheet.create({
container: props  => ({    
    flex: 1, 
    width: '100%',
    height: 25,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 1.5,
    
    backgroundColor: props.children.pressureValue < props.children.minPressureValue ? 'red' : 'green',
    alignItems: 'center',
    justifyContent: 'center',
}),
textValue: {
    color: colors.white,
},
});



export default PressureBox;