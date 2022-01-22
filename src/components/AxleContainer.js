import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Axle4Wheels from "../components/Axle4Wheels";
import Axle2Wheels from "../components/Axle2Wheels";

import colors from "../styles/colors";

const AxleContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children.wheels.map((wheel) => {
        {
          console.log(`AxleContainer wheels count: ${props.children.wheels.length}`);
        }
        return props.children.wheels.length === 4 ? (
          <Axle4Wheels key={wheel.wheelId}>{wheel}</Axle4Wheels>
        ) : (
          <Axle2Wheels key={wheel.wheelId}>{wheel}</Axle2Wheels>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 385,
    margin: 5,
    borderColor: colors.axleBlue,
    borderRadius: 4.5,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AxleContainer;
