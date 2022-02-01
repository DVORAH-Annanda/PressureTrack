import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { updateSessionId } from "../actions/userActions";
import { isObjectEmpty } from "../utilities/general";

const AppCheck = ({ navigation }) => {
  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  const unitSelected = useSelector((state) => state.unitSelected);
  const { unitIsSelected } = unitSelected;

  // const userDetails = useSelector((state) => state.userSignIn);
  // const { userInfo } = userDetails;

  const getNewSessionId = useCallback(
    (currentSessionId) => {
      console.log(
        `AppCheck getNewSessionId userInfo ${JSON.stringify(userInfo)}}`
      );
      (currentSessionId === userInfo.eId ? navigation.navigate("SignIn") : navigation.navigate("AppLoading"))
  
  },
    [userInfo]
  );

  const getRoute = useCallback(
    () => (unitIsSelected ? "AppLoading" : "SignIn"), 
    [unitIsSelected]
  );

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      /*
       * load and check the app version
       * and possible breaking changes before
       * you send the user to the App Stack
       */


      if (isObjectEmpty(userInfo) || !userInfo) {
        console.log(
          `AppCheck userInfo object empty ${JSON.stringify(userInfo)}`
        );
        navigation.navigate("SignIn");
      } else {

        console.log(`AppCheck currentSessionId ${userInfo.eId}`);
        dispatch(updateSessionId());
        navigation.navigate(getRoute());
        //getNewSessionId(currentSessionId);
        
        console.log(`AppCheck newSessionId NEW SESSION ID?`);

      }

    }, [dispatch, navigation])
  );

  return (
    <View style={styles.page}>
      <Text>checking for updates...</Text>
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

export default AppCheck;
