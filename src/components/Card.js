import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../styles/colors';

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
{props.children}
        </View>
    );
}

const styles = StyleSheet.create({
card: {

    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.25,
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 5,
},
headerTitle: {
    color: 'gray',
    fontSize: 25,
},
});

export default Card;