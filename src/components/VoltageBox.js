import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const VoltageBox = (props) => {
    return (
        <View style={styles.container(props)} >
            <Text style={styles.valueBox}>{props.children.voltageValue} V</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: props  => ({
        width: '100%',
        height: 25,
        borderWidth: 1,
        borderColor: '#eee',
        padding: 1.5,
        backgroundColor: props.children.voltageValue < props.children.minVoltageValue ?  'yellow' : 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    valueBox: {
    color: colors.white,
    },
    });

export default VoltageBox;