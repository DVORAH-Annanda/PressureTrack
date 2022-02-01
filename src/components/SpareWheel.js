import React from "react";

import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

const SpareWheel = (props) => {
  {
    console.log(`SpareWheel props ${JSON.stringify(props)}`);
  }
  renderWheelStyle = () => {
    if (props.children.pressureValue == null) {
      return <View style={[styles.wheel, styles.noSignalWheel]}></View>;
    }
    if (props.children.pressureValue > props.children.maxPressureValue) {
      return <View style={[styles.wheel, styles.purpleWheel]}></View>;
    }
    if (props.children.pressureValue < props.children.minPressureValue) {
      return <View style={[styles.wheel, styles.redWheel]}></View>;
    }
    if (props.children.temperatureValue > props.children.maxTemperatureValue) {
      return <View style={[styles.wheel, styles.orangeWheel]}></View>;
    }
    if (props.children.voltageValue < props.children.minVoltageValue) {
      return <View style={[styles.wheel, styles.yellowWheel]}></View>;
    } else {
      return <View style={styles.wheel}></View>;
    }
  };

  return <View>{renderWheelStyle()}</View>;
};

const styles = StyleSheet.create({
  wheel: {
    margin: 1.5,
    width: 60,
    height: 25,
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
});
//height: 95,
export default SpareWheel;
