import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

const DateTimeUpdatedBox = (props) => {
  return (
    <View style={styles.container}>
      <Text>Last updated:</Text>
      <Text style={styles.timeBox}>{props.time}</Text>
      <Text>{props.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 35,
    padding: 1.5,

    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  timeBox: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
  },
});

export default DateTimeUpdatedBox;
