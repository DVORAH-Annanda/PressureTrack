import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Device from 'expo-device';




import colors from "../styles/colors";

const PressureBox = (props) => {

  return (
    <View style={styles.container(props)}>
      <Text style={styles.textValue}>{props.children.pressureValue} bar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (props) => ({
    flex: 1,
    width: "100%",
    height: '100%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 1.5,
    backgroundColor:
      props.children.pressureValue < props.children.minPressureValue
        ? "red"
        : ( props.children.pressureValue > props.children.maxPressureValue
          ? colors.purpleWheel
          : "green" ),     
    alignItems: "center",
    justifyContent: "center",
  }),
  textValue: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    color: colors.white,
  },
});

export default PressureBox;
