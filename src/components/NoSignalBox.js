import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

const NoSignalBox = (props) => {
  console.log(
    `PressureBox pressureValue ${JSON.stringify(props.children.pressureValue)}`
  );
  console.log(
    `PressureBox MINpressureValue ${JSON.stringify(
      props.children.minPressureValue
    )}`
  );
  return (
    <View style={styles.container}>
      <Text style={styles.textValue}>No Signal</Text>
    </View>
  );
};

//<Text>{props.children.pressureValue}</Text>

const styles = StyleSheet.create({
  container: {
    flex:2,
      width: '100%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 1.5,
    
    

    backgroundColor: colors.noSignalBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  textValue: {
    fontWeight: "bold",
    flexWrap: "wrap",
    fontSize: 13.5,
    textAlign: "center",
    color: colors.white,
    alignItems: "center",
    textAlignVertical: "center",
  },
});

export default NoSignalBox;
