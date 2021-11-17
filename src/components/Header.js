import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import colors from "../styles/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require("../../assets/pressureTrack.png")}
      />
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height:65,
    paddingTop: 10.5,    
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.darkGray,
    fontSize: 25,
  },
  logo: {
    width: "100%",
  },
});

export default Header;
