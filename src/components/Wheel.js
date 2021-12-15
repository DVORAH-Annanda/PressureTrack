import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Axle from "../components/Axle";

import colors from "../styles/colors";

const Wheel = (props) => {
  {
    console.log(`PROPS WHEEL ${JSON.stringify(props)}`);
  }

  return (
<View>
{props.children.wheelId === 2 ? (
  <View style={styles.wheelAxle}>
    <View style={styles.wheel}></View>
    <View style={styles.axle}></View>
  </View>
) : (
  <View style={styles.wheel}></View>
)}
</View> 
  );
};



const styles = StyleSheet.create({
    wheelAxle: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",

      },
  wheel: {
    margin: 0.5,
    width: 25,
    height: 50,
    borderWidth: 2.5,
    borderColor: colors.darkGray,
    borderRadius: 8.5,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  axle: {
    width: 45,  
    height: 8.5,  
    backgroundColor: colors.axleBlue,
    alignItems: 'center',
    justifyContent: 'center',
},
});
//height: 95,
export default Wheel;
