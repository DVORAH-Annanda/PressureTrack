import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
//import Swipeable from 'react-native-gesture-handler/Swipeable';
import { unitSensorValues } from "../actions/unitActions";

import WheelContainer from "../components/WheelContainer";
import MetricsContainer from "../components/MetricsContainer";
import TextBox from "../components/TextBox";
import PressureBox from "../components/PressureBox";
import NoSignalBox from "../components/NoSignalBox";
import TemperatureBox from "../components/TemperatureBox";
import DateTimeUpdatedBox from "../components/DateTimeUpdatedBox";
import SensorValuesAxleContainer from "../components/SensorValuesAxleContainer";

import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../styles/colors";

const SensorValuesDiagram = ({ navigation, route }) => {
  const { title, item } = route.params;
  const { id, nm } = item;

  // const [unitId, setUnitId] = useState(0);
  // const [axleSensorValues, setAxleSensorValues] = useState([]);
  const unitSelected = useSelector((state) => state.unitSelected);
  const { unitIsSelected, selectedUnit } = unitSelected;

  const sensorValueProps = useSelector((state) => state.unitSensorValues);
  const { loading, error, unitTrailersSensorValues, dateUpdated, timeUpdated } =
    sensorValueProps;

  console.log(
    `sensorValues screen!! sensorvalues ${JSON.stringify(
      unitTrailersSensorValues
    )}`
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`sensorValues screen useEffect unit id ${id}`);
    dispatch(unitSensorValues(id));
  }, [dispatch, unitSensorValues, id]);

  // renderRightActions={rightSwipeActions}
  // onSwipeableRightOpen={swipeFromRightOpen}
  // onSwipeableLeftOpen={swipeFromLeftOpen}

  // onPress={() =>
  //   navigation.navigate("WheelsDiagram", { title: item.nm, item: item })
  // } removeMoveResponder

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
                    <View>
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
                                <SensorValuesAxleContainer
                                  style={styles.axle}
                                  key={axle.axleId}
                                >
                                  {axle.wheels.map((wheel) => {
                                    return (
                                      <WheelContainer key={wheel.wheelId}>
                                        <TextBox style={styles.tyreName}>
                                          {wheel.wheelName}
                                        </TextBox>
                                        {wheel.pressureValue == null ? (
                                          <NoSignalBox>{wheel}</NoSignalBox>
                                        ) : (
                                          <MetricsContainer>
                                            <PressureBox>{wheel}</PressureBox>
                                            <TemperatureBox>
                                              {wheel}
                                            </TemperatureBox>
                                          </MetricsContainer>
                                        )}
                                      </WheelContainer>
                                    );
                                  })}
                                </SensorValuesAxleContainer>
                              );
                            })}
                          </View>
                        );
                      })}
                    </View>
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

// marginTop:
// Platform.OS === "ios"
//   ? StatusBar.currentHeight + 25
//   : StatusBar.currentHeight,

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 10,
    paddingRight: 5,
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
    margin: 20,
    marginBottom: 5,
    paddingBottom: 5,
  },
  unitName: {
    textAlign: "center",
    fontWeight: "bold",
  },
  axle: {
    paddingLeft: 2.5,
    paddingRight: 2.5,
  },
  tyreName: {
    flex: 1,
    backgroundColor: colors.tyreNameGreen,
  },
});

export default SensorValuesDiagram;
