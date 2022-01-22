import React from "react";

import { StyleSheet, View, Text } from "react-native";

import SpareWheel from "./SpareWheel";

import colors from "../styles/colors";

const Wheel = (props) => {
  {
    console.log(`Wheel props ${JSON.stringify(props)}`);
  }
  renderWheelStyle = () => {
    if(props.children.pressureValue == null){
      return (
        <View style={[styles.wheel, styles.noSignalWheel]}></View>
      );
    }
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
      {props.children.wheelName.slice(0, 5) !== "Spare" ? (
        <View >
          {renderWheelStyle()}
          
        </View>
      ) : (
<SpareWheel>{props.children}</SpareWheel>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  wheel: {
    margin: 0.5,
    width: 25,
    height: 60,
    borderWidth: 2.5,
    borderColor: colors.darkGray,
    borderRadius: 8.5,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  noSignalWheel: {
    borderColor: colors.noSignalBlueBorder,
    backgroundColor: colors.noSignalBlue,    
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
  axle: {
    width: 45,
    height: 8.5,
    backgroundColor: colors.axleBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Wheel;
