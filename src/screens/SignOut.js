import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SignOut = ({ navigation }) => {

    //signout handler
    return (
        <View style={styles.page}>
            <Text>signing out...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SignOut