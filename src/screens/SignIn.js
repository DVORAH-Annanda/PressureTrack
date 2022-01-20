import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { signIn } from "../actions/userActions";
import { setRunning } from "../actions/appActions";
import UserForm from "../components/UserForm";

import colors from "../styles/colors";

import { isObjectEmpty } from "../utilities/general";

import { clearAllLocalStorageData } from "../utilities/localStoreData";

//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';

const SignIn = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  // useFocusEffect(
  //   useCallback(() => {
  //     // console.log(
  //     //   `useFocusEffect SignIn store.getState() ${JSON.stringify(userInfo)}`
  //     // );
  //     if (!isObjectEmpty(userInfo))
  //       navigation.navigate("AppLoading");
  //   }, [navigation, userInfo])
  // );

  //const [user, setUser] = useState([]);

 //{!isObjectEmpty(userInfo) ? (

  const dispatch = useDispatch();
  const handleSubmit = (userInfo) => {
    dispatch(setRunning(true));
    dispatch(signIn(userInfo));
    //navigation.navigate("UnitsNavigator");
    //navigation.navigate("GeneralDrawerNavigator");
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
