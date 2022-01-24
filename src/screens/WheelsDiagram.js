import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { unitSensorValues } from "../actions/unitActions";

import AxleContainer from "../components/AxleContainer";

import colors from "../styles/colors";

const WheelsDiagram = ({ navigation, route }) => {
  const { title, item } = route.params;
  const { id, nm } = item;

  const sensorValueProps = useSelector((state) => state.unitSensorValues);
  const { loading, error, sensorValues } = sensorValueProps;
  //unitIsSelected, selectedUnit,

  // console.log(
  //   `WheelsDiagram selectedUnit ${JSON.stringify(
  //     selectedUnit
  //   )} unitIsSelected ${unitIsSelected} loading ${loading}`
  // );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`WheelsDiagram useEffect unit id ${id}`);
    dispatch(unitSensorValues(id));

    const interval = setInterval(() => {
      dispatch(unitSensorValues(id));
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch, unitSensorValues, id]);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("SensorValuesDiagram", {
          title: item.nm,
          item: item,
        })
      }
    >
      <View style={styles.page}>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          <ScrollView>
            {sensorValues.map((axle) => {
              return <AxleContainer key={axle.axleId}>{axle}</AxleContainer>;
            })}
          </ScrollView>
        )}
        <View></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginLeft: 2.5,
    marginRight: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tyreName: {
    flex: 1,
    backgroundColor: colors.tyreNameGreen,
  },
  sensorId: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WheelsDiagram;
