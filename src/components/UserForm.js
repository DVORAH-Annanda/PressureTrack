import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, ActivityIndicator } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
//import { selectIsSubmitting, selectLoginMessage } from '../../redux/ducks/user'

import colors from '../styles/colors'

import authenticationHandler from '../utilities/authenticationHandler'

const UserForm = ({ submitHandler }) => {

    //const isLoading = useReduxSelector(selectIsSubmitting)
    //const loginMessage = useReduxSelector(selectLoginMessage)

    const handleWebViewNavigationStateChange = async (navState) => {
        try{
            
        const { url } = navState
        const eId = await authenticationHandler.getToken(url)
        if (eId != null) {
            authenticationHandler.storeToken(eId)
            submitHandler()
            
        }
    } catch (error) {
        console.error(error);
      }
    }



    return (
       
            <WebView
                style={styles.wialoncontainer}
                source={{
                    uri: 'https://hosting.wialon.com/login.html?client_id=PressureTrack&access_type=-1&activation_time=0&duration=2592000&flags=0x1&redirect_uri=https://hosting.wialon.com/login.html',
                }}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator color={colors.primary} size="large" />}
                onNavigationStateChange={handleWebViewNavigationStateChange}
            />
            
            
        
    )
}
//{loginMessage && <Text>{loginMessage}</Text>}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wialoncontainer: {
        minWidth: 300,
    },
})

export default UserForm