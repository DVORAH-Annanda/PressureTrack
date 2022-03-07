import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

const SensorValuesAxleContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

//borderColor: colors.axleBlue,
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 405,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SensorValuesAxleContainer;
