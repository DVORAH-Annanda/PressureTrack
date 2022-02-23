import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { unitSensorValues } from "../actions/unitActions";

import WheelContainer from "../components/WheelContainer";
import MetricsContainer from "../components/MetricsContainer";
import TextBox from "../components/TextBox";
import PressureBox from "../components/PressureBox";
import NoSignalBox from "../components/NoSignalBox";
import TemperatureBox from "../components/TemperatureBox";
import DateTimeUpdatedBox from "../components/DateTimeUpdatedBox";
import SensorValuesAxleContainer from "../components/SensorValuesAxleContainer";

import colors from "../styles/colors";

const SensorValuesDiagram = ({ navigation, route }) => {
  const { title, item } = route.params;
  const { id, nm } = item;

  // const [unitId, setUnitId] = useState(0);
  // const [axleSensorValues, setAxleSensorValues] = useState([]);

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
    <Swipeable
    onSwipeableLeftOpen={() =>
      navigation.navigate("WheelsDiagram", { title: item.nm, item: item })}

  >
      <View style={styles.page}>
        {loading || unitTrailersSensorValues == null ? (
                   <View style={styles.page}>
                   <ActivityIndicator size="large" color={colors.primary} />
                 </View>
        ) : (
         
          <ScrollView>
                <TouchableOpacity 
                

    >
       <View>
            {unitTrailersSensorValues.map((unit) => {
              return (
                
                <View style={styles.unit} onStartShouldSetResponder={() => true} key={unit.unitId}>
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
                                  <TemperatureBox>{wheel}</TemperatureBox>
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
            </TouchableOpacity >
          </ScrollView>
         
        )}
        <DateTimeUpdatedBox date={dateUpdated} time={timeUpdated} />
      </View>
      </Swipeable>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? StatusBar.currentHeight + 25 : StatusBar.currentHeight,
    marginLeft: 2.55,
    marginRight: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  unit: {
    margin: 20,
    marginBottom: 5,
    paddingBottom: 5,
  },
  
  unitName: {
    textAlign: 'center', 
    fontWeight: 'bold',
  },
  axle: {
    borderWidth: 1,
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

export default SensorValuesDiagram;
