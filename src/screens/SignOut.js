import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import { signOut } from "../actions/userActions";

const SignOut = ({ navigation }) => {

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    console.log(`SIGNOUT ${JSON.stringify(userInfo)}`)

  const dispatch = useDispatch();



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
          // Alert.alert('Are you sure you want to exit?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => null,
    //     style: 'cancel',
    //   },
    //   { text: 'YES', onPress: () => BackHandler.exitApp() },
    // ]);
      
        console.log(
          `APPCHECK 2  USERINFO `
        );
        dispatch(signOut());
        navigation.navigate('SignIn');
        
      
    }, [dispatch, signOut, navigation])
  );

  //https://hst-api.wialon.com/wialon/ajax.html?svc=core/logout&params={}&sid=d1cb60897768780f846df7ab2400eb5f

  //signout handler
  return (
    <View style={styles.page}>
      <Text>Stay on track!</Text>
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

export default SignOut;
