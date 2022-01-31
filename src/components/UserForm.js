import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

import colors from "../styles/colors";

import {getSignInUserInfo} from "../utilities/authenticationHandler";

const UserForm = ({ submitHandler }) => {

  const handleWebViewNavigationStateChange = async (navState) => {
    try {
      const { url } = navState;
      if (url.includes("svc_error=0")) {
        const userInfo = await getSignInUserInfo(url);
        submitHandler(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WebView
      style={styles.wialoncontainer}
      source={{
        uri: "https://hosting.wialon.com/login.html?client_id=PressureTrack&access_type=-1&activation_time=0&duration=2592000&flags=0x1&redirect_uri=https://hosting.wialon.com/login.html",
      }}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator color={colors.primary} size="large" />
      )}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  wialoncontainer: {
    minWidth: 300,
  },
});

export default UserForm;
