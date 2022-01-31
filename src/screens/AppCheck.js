import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { isObjectEmpty } from "../utilities/general";

const AppCheck = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  // const userDetails = useSelector((state) => state.userSignIn);
  // const { userInfo } = userDetails;

  const getRoute = useCallback(
    () => (!isObjectEmpty(userInfo) ? "AppLoading" : "SignIn"), 
    [userInfo]
  );

  useFocusEffect(
    useCallback(() => {
      /*
       * fake timer where you would instead
       * load and check the app version
       * and possible breaking changes before
       * you send the user to the App Stack
       */          
        userInfo ? navigation.navigate(getRoute()) : navigation.navigate("SignIn");      
    }, [navigation, getRoute])
  );

  return (
    <View style={styles.page}>
      <Text>checking for updates...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppCheck;
