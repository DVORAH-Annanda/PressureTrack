import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { isObjectEmpty } from "../utilities/general";
//import { MainRoutes } from '../routing/MainStackNavigator';

const AppCheck = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  const getRoute = useCallback(
    () => (!isObjectEmpty(userInfo) ? "AppLoading" : "SignIn"),
    [userInfo]
  );

  useFocusEffect(
    useCallback(() => {
      // console.log(
      //     `useFocusEffect SignIn store.getState() ${JSON.stringify(userInfo)}`
      //   );
      console.log(
        `APPCHECK 1 USERINFO ${userInfo}`
      );
      /*
       * fake timer where you would instead
       * load and check the app version
       * and possible breaking changes before
       * you send the user to the App Stack
       */
      
        console.log(
          `APPCHECK 2  USERINFO `
        );

        
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
