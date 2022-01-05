import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Wheel from "./Wheel";

import WheelAxle from "../components/WheelAxle";

import colors from "../styles/colors";

const Axle4Wheels = (props) => {
  {
    console.log(`props.children.wheel: ${JSON.stringify(props)}`);
  }
  return (
    <View>
      {props.children.wheelId === 2 ? (
        <WheelAxle>{props.children}</WheelAxle>
      ) : (
        
        <Wheel>{props.children}</Wheel>
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

  axle: {
    width: 50,
    height: 8.5,
    backgroundColor: colors.axleBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
//height: 95,
export default Axle4Wheels;
