import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserForm from "../components/UserForm";
import colors from "../styles/colors";

//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';

const SignIn = ({ navigation }) => {

  //const userSignIn = useSelector((state) => state.userSignIn);
  //const { userInfo, loading, error } = userSignIn;

  //{loading && <LoadingBox></LoadingBox>}
  //{error && <MessageBox variant='danger'>{ error }</MessageBox>}



  const dispatch = useDispatch();
  //const submitHandler = (e) => {
  //  e.preventDefault();
  //  dispatch(signin(email, password));
  //};

  const handleSubmit = () => {
    navigation.navigate("UnitsNavigator");
  };
  //useEffect(() => {
  //  if (userInfo) {
  //    //props.history.push(redirect);
  //  }
  //}, [userInfo]);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Header title="Sign In" />
      </View>
      <View style={styles.wialonLoginPge}>
        <UserForm submitHandler={handleSubmit} />
      </View>
      <View style={styles.footer}>
        <Footer
          title={"Stay On Track"}
        />
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
