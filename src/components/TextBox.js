import React from 'react';
import {StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const TextBox = (props) => {
    console.log(JSON.stringify(props.children))
    return (
        <Text style={{ ...styles.container, ...props.style }}>{props.children}</Text>
      );
}

const styles = StyleSheet.create({
    container: ({   
        width: '100%',     
        fontSize: 10,
        height: 18,
        borderWidth: 1,
        borderColor: colors.lightGray,
        padding: 1.5,
        textAlignVertical: 'center',
        textAlign: 'center',
    }),
    });

export default TextBox;