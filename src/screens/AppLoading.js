import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

const AppLoading = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('UnitList')
        }, 1500)
    }, [navigation])

    return (
        <View style={styles.page}>
            <Text>loading...</Text>
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

export default AppLoading