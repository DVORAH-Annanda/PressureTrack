import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const TemperatureBox = (props) => {
    return (
        <View style={styles.container(props)} >
            <Text style={styles.textValue}>{props.children.temperatureValue}&deg;C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: props  => ({
        flex: 1, 
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: colors.lightGray,
        padding: 1.5,
        backgroundColor: props.children.temperatureValue > props.children.maxTemperatureValue ? 'orange' : 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    textValue: {
    color: colors.white,
    },
    });

export default TemperatureBox;