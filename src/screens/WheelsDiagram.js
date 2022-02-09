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
import DateTimeUpdatedBox from "../components/DateTimeUpdatedBox";

import { isObjectEmpty } from "../utilities/general";

import colors from "../styles/colors";

const WheelsDiagram = ({ navigation, route }) => {
  const { title, item } = route.params;
  const { id, nm } = item;

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

  //*** */ console.log(`WheelsDiagram ERROR ${error}`);
  //*** */ console.log(`WheelsDiagram sensorValues ${JSON.stringify(unitTrailersSensorValues)}`);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(unitSensorValues(id));
    console.log(`WheelsDiagram useEffect unit id ${id}`);
    if (!loading || !isObjectEmpty(unitTrailersSensorValues)) 
      console.log(
        `WheelsDiagram useEffect LOAding ${JSON.stringify(
          unitTrailersSensorValues
        )}`
      );
      const interval = setInterval(() => {
        dispatch(unitSensorValues(id));
      }, 60000);

      return () => clearInterval(interval);
    
  }, [dispatch, unitSensorValues, id]);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(`sensorValues screen useEffect unit id ${id}`);
  //   dispatch(unitSensorValues(id));
  // }, [dispatch, unitSensorValues, id]);

  // return (
  //   <TouchableWithoutFeedback
  //     onPress={() =>
  //       navigation.navigate("SensorValuesDiagram", {
  //         title: item.nm,
  //         item: item,
  //       })
  //     }
  //   >
  //     <View style={styles.page}>
  //       {loading ? (
  //         <Text>loading...</Text>
  //       ) : (
  //         <ScrollView>
  //           {unitTrailersSensorValues.map((unit) => {
  //             return (
  //               <View
  //                 style={styles.axle}
  //                 key={unit.unitId}
  //               >
  //           {unit.sensorValues.map((axle) => {
  //             return (
  //             <AxleContainer key={axle.axleId}>{axle}
  //             </AxleContainer>
  //           )})}
  //           </View>);
  //           })}
  //         </ScrollView>

  //       )}
  //        <DateTimeUpdatedBox date = {dateUpdated} time = {timeUpdated}/>
  //     </View>
  //   </TouchableWithoutFeedback>
  // );

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
        {loading || unitTrailersSensorValues == null ?  (
          <Text>loading...</Text>
        ) : (
          <ScrollView>
            {unitTrailersSensorValues.map((unit) => {
              return (
                <View style={styles.axle} key={unit.unitId}>
                  {unit.sensorValues.map((axle) => {
                    return (
                      <AxleContainer key={axle.axleId}>{axle}</AxleContainer>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
         ) 
        }
        <DateTimeUpdatedBox date={dateUpdated} time={timeUpdated} />
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
