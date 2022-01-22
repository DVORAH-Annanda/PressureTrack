import React, { useCallback } from "react";
import {  useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import colors from "../styles/colors";
import { setRunning } from "../actions/appActions";

const AppLoading = ({ navigation }) => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        /*
         * fake timer where you would instead
         * load and check the user data before
         * you send the user to the App Stack
         */
        dispatch(setRunning(true));
        //navigation.navigate("GeneralDrawerNavigator");
      }, 1500);
    }, [dispatch])
  );

  return (
    <View style={styles.page}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppLoading;
