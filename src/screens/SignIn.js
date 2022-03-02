import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserForm from "../components/UserForm";

import { signIn } from "../actions/userActions";
import { setRunning } from "../actions/appActions";

import { isObjectEmpty } from "../utilities/general";

import colors from "../styles/colors";

const SignIn = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails; 

  const dispatch = useDispatch();
  const handleSubmit = (userInfo) => {
    dispatch(signIn(userInfo));
  };

  useFocusEffect(
    useCallback(() => {
      if (!isObjectEmpty(userInfo)) {
        console.log(
          `SignIn useFocusEffect userInfo.eid ${JSON.stringify(userInfo.eId)}`
        );
        navigation.navigate("AppLoading");
      }
    }, [navigation, userInfo])
  );

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Header title="Sign In" />
      </View>
      <View style={styles.wialonLoginPge}>
        <UserForm submitHandler={handleSubmit} />
      </View>
      <View style={styles.footer}>
        <Footer title={"Stay On Track"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.white,
    flexDirection: "column",
  },
  header: {
    flex: 2,
  },
  wialonLoginPge: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 2,
    justifyContent: "flex-end",
  },
});

export default SignIn;
