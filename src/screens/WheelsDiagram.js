import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Alert,
} from "react-native";
import { unitSensorValues } from "../actions/unitActions";

import AxleContainer from "../components/AxleContainer";
import DateTimeUpdatedBox from "../components/DateTimeUpdatedBox";

import { FontAwesome5 } from "@expo/vector-icons";

import { isObjectEmpty } from "../utilities/general";

import colors from "../styles/colors";

const WheelsDiagram = ({ navigation, route }) => {
  const { title, item } = route.params;
  const { id, nm } = item;

  const unitSelected = useSelector((state) => state.unitSelected);
  const { unitIsSelected, selectedUnit } = unitSelected;

  const sensorValueProps = useSelector((state) => state.unitSensorValues);
  const { loading, error, unitTrailersSensorValues, dateUpdated, timeUpdated } =
    sensorValueProps;
  //unitIsSelected, selectedUnit,

  //const time = dateTimeUpdated.toString();
  //time = time.slice(0,8);
  //console.log(  `TIME : ${time}`)

  // console.log(
  //   `WheelsDiagram selectedUnit ${JSON.stringify(
  //     selectedUnit
  //   )} unitIsSelected ${unitIsSelected} loading ${loading}`
  // );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(unitSensorValues(id));
  //   console.log(`WheelsDiagram useEffect unit id ${id}`);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(unitSensorValues(id));

      // @setInterval regte manier??
      const interval = setInterval(() => {
        dispatch(unitSensorValues(id));
      }, 60000);

      return () => clearInterval(interval);
    }, [dispatch, unitSensorValues, id, route])
  );
  // style={styles.page}
  return (
    <SafeAreaView style={styles.page}>
      <View>
        {!unitIsSelected ? (
          <View>
            <Text>
              You have not selected a unit. Click on the{" "}
              <FontAwesome5
                name="hand-point-up"
                size={24}
                color={colors.primary}
              />{" "}
              icon and select a unit from the list.
            </Text>
          </View>
        ) : (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              {loading || unitTrailersSensorValues == null ? (
                <View>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                <View style={styles.unitsView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {unitTrailersSensorValues.map((unit) => {
                      return (
                        <View
                          style={styles.unit}
                          onStartShouldSetResponder={() => true}
                          key={unit.unitId}
                        >
                          <Text style={styles.unitName}>{unit.unitName}</Text>
                          {unit.sensorValues.map((axle) => {
                            return (
                              <AxleContainer key={axle.axleId}>
                                {axle}
                              </AxleContainer>
                            );
                          })}
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
              <DateTimeUpdatedBox date={dateUpdated} time={timeUpdated} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};

//marginTop: Platform.OS === "ios" ? StatusBar.currentHeight + 45 : 12.5,
const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 10,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  unitsView: {
    flex: 1,
   
    alignItems: "center",
    justifyContent: "center",
  },
  unit: {
    marginTop: 5,
    borderWidth: 1,
  },
  unitName: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WheelsDiagram;
