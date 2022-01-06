import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import { signOut } from "../actions/userActions";

const SignOut = ({ navigation }) => {

    const userSignIn = useSelector((state) => state.userSignIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
    Alert.alert('Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
  }, [dispatch, signOut]);

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
