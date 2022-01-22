import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { signOut } from "../actions/userActions";
import { setRunning } from "../actions/appActions";

const SignOut = ({ navigation }) => {
  
  // const userSignIn = useSelector((state) => state.userSignIn);
  // const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(signOut());
      dispatch(setRunning(false));
    }, [dispatch, signOut, setRunning])
  );
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
