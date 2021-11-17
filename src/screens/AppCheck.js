import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const AppCheck = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('SignIn')
        }, 1500)
    }, [navigation])

    return (
        <View style={styles.page}>
            <Text>checking for updates...</Text>
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

export default AppCheck