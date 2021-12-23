import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Wheel from "../components/Wheel";

import colors from "../styles/colors";

const WheelAxle = (props) => {
  {console.log(`WHEELNAME : ${props.children.wheelName}`)}
  return props.children.wheelName.slice(0, 5) !== "Spare" ? (
    <View style={styles.wheelAxle}>
      <Wheel>{props.children}</Wheel>
      <View style={styles.axle}></View>
    </View>
  ) : (
    <View style={styles.wheelAxle}>
      <Wheel>{props.children}</Wheel>
    </View>
  );
};

const styles = StyleSheet.create({
  wheelAxle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  axle: {
    width: 65,
    height: 8.5,
    backgroundColor: colors.axleBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
//height: 95,
export default WheelAxle;
