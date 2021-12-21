import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Axle from "../components/Axle";

import colors from "../styles/colors";

const Wheel = (props) => {
  {
    console.log(`PROPS WHEEL ${JSON.stringify(props)}`);
  }

  renderWheelStyle = () => {
    if(props.children.pressureValue > props.children.maxPressureValue){
      return (
        <View style={[styles.wheel, styles.purpleWheel]}></View>
      );
    }
    if(props.children.pressureValue < props.children.minPressureValue){
      return (
        <View style={[styles.wheel, styles.redWheel]}></View>
      );
    }
    if(props.children.temperatureValue > props.children.maxTemperatureValue){
      return (
        <View style={[styles.wheel, styles.orangeWheel]}></View>
      );
    }
    if(props.children.voltageValue < props.children.minVoltageValue){
      return (
        <View style={[styles.wheel, styles.yellowWheel]}></View>
      );
    } else {
      return (
        <View style={styles.wheel}></View>
      );
    }
  }

  return (
    <View>
      {props.children.wheelId === 2 ? (
        <View style={styles.wheelAxle}>
          {renderWheelStyle()}
          <View style={styles.axle}></View>
        </View>
      ) : (
        <View>
        {renderWheelStyle()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wheelAxle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wheel: {
    margin: 0.5,
    width: 25,
    height: 50,
    borderWidth: 2.5,
    borderColor: colors.darkGray,
    borderRadius: 8.5,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  purpleWheel: {
    backgroundColor: colors.purpleWheel,
    borderColor: colors.purpleWheelBorder,
  },
  redWheel: {
    backgroundColor: colors.redWheel,
    borderColor: colors.redWheelBorder,
  },
  orangeWheel: {
    backgroundColor: colors.orangeWheel,
    borderColor: colors.orangeWheelBorder,
  },
  yellowWheel: {
    backgroundColor: colors.yellowWheel,
    borderColor: colors.yellowWheelBorder,
  },
  noSignalWheel: {
    backgroundColor: colors.noSignalBlue,
  },
  axle: {
    width: 45,
    height: 8.5,
    backgroundColor: colors.axleBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
//height: 95,
export default Wheel;
