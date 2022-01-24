import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";

import colors from "../styles/colors";

const BlinkWheel = (props) => {
  const [showWheel, setShowWheel] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowWheel((showWheel) => !showWheel);
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <View
        style={[
          styles.wheel,
          styles.redWheel,
          { display: showWheel ? "none" : "flex" },
        ]}
      ></View>
      <View
        style={[
          styles.wheel,
          styles.redBlinkWheel,
          { display: showWheel ? "flex" : "none" },
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wheel: {
    margin: 0.5,
    width: 25,
    height: 60,
    borderColor: colors.darkGray,
    borderRadius: 8.5,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  redWheel: {
    backgroundColor: colors.redWheel,
    borderColor: colors.redWheelBorder,
  },
  redBlinkWheel: {
    opacity: 0.05,
    backgroundColor: colors.redWheel,
  },
});

export default BlinkWheel;
