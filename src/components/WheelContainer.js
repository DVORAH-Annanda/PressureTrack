import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../styles/colors";

const WheelContainer = (props) => {
  return (
    <View>
      <View style={styles.container}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    width: 75,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 1.5,
    borderRadius: 4.5,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default WheelContainer;
