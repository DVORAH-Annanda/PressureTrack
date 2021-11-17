import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const MetricsContainer = (props) => {
    return (
        <SafeAreaView>
        <View style={{ ...styles.container, ...props.style }}>{props.children}</View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
container: {
    margin: 6.5
    ,
    borderWidth: 1.5,
    borderColor: colors.gray,
    padding: 2.5,
    borderRadius: 4.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default MetricsContainer;