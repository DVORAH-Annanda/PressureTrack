import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

import colors from '../styles/colors'

const Footer = (props) => {
    return (
        <View style={styles.footer}>
            
            <Text style={styles.footerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
footer: {
    width: '100%',
    padding: 5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
},
footerTitle: {
    color: colors.white,
    padding: 5,
    fontSize: 18,
},
footerSubTitle: {
    color: colors.white,
    padding: 5,
    fontSize: 12.5,
},
});

export default Footer;