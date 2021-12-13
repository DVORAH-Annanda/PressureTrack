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
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default MetricsContainer;