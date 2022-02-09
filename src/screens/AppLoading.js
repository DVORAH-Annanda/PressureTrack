import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

import { setRunning } from "../actions/appActions";
import { listUnits, unitSensorValues } from "../actions/unitActions";

import colors from "../styles/colors";

const AppLoading = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  const unitSelected = useSelector((state) => state.unitSelected);
  const { selectedUnit } = unitSelected;

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      /* load and check user data*/
      // userInfo.eId.length > 0
      //   ? dispatch(setRunning(true))
      //   : navigation.navigate("AppCheck");
      if (userInfo.eId.length > 0) {
        dispatch(setRunning(true));
        dispatch(listUnits());
        dispatch(unitSensorValues(selectedUnit.id));
      } else {
        navigation.navigate("AppCheck");
      }
    }, [dispatch, setRunning, listUnits, unitSensorValues, selectedUnit])
  );

  return (
    <View style={styles.page}>
      <ActivityIndicator size="large" color={colors.primary} />
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

export default AppLoading;
