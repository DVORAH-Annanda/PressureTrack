import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native'

import colors from '../styles/colors'

const Footer = (props) => {
    return (
        <SafeAreaView>
            <Text style={styles.versionNumber}>version 4.0</Text>
        <View style={styles.footer}>
        
            <Text style={styles.footerTitle}>{props.title}</Text>
        </View>
        </SafeAreaView>
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
versionNumber: {
    width: '100%',
    color: colors.darkGray,
    padding: 5,
    fontSize: 10.5,
},
});

export default Footer;