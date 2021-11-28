import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { signIn } from "../actions/userActions";
import UserForm from "../components/UserForm";

import colors from "../styles/colors";

import { clearAllLocalStorageData } from "../utilities/localStoreData";

//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';

const SignIn = ({ navigation }) => {

  const [user, setUser] = useState([]);

  const dispatch = useDispatch(); 
  const handleSubmit = (userInfo) => {
    setUser(userInfo);   
    dispatch(signIn(userInfo));
    navigation.navigate("UnitsNavigator");   
  };

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
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default SignIn;
