import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const AxleContainer = (props) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>{props.children}</View>
      );
}

const styles = StyleSheet.create({
container: {
    flex:1,
    flexDirection:'row',
    margin: 5,
    borderWidth: 2,
    borderColor: colors.axleBlue,
    borderRadius: 4.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default AxleContainer;