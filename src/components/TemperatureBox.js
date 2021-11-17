import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const TemperatureBox = (props) => {
    return (
        <View style={styles.container(props)} >
            <Text style={styles.valueBox}>{props.children.temperatureValue} C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: props  => ({
        width: 85,
        height: 25,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        backgroundColor: props.children.temperatureValue > props.children.maxTemperatureValue ? 'orange' : 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    valueBox: {
    color: colors.white,
    },
    });

export default TemperatureBox;