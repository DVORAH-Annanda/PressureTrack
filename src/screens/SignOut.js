import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SignOut = ({ navigation }) => {

    //https://hst-api.wialon.com/wialon/ajax.html?svc=core/logout&params={}&sid=d1cb60897768780f846df7ab2400eb5f

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