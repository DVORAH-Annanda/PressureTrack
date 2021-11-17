import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import {
  StatusBar,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import colors from "../styles/colors";

const Splash = ({ navigation }) => {
  //const { navigation } = props
  const navigate = useCallback(
    () => navigation.navigate("SignIn"),
    [navigation]
  );

  useFocusEffect(
    useCallback(() => {
      const navigationTimer = setTimeout(() => {
        navigate();
      }, 14500);

      return () => clearTimeout(navigationTimer);
    }, [navigate])
  );

  return (
    <TouchableWithoutFeedback onPress={() => navigate()}>
      <View style={styles.page}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/background.jpg")}
        >
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.footer}>
            <View style={styles.updates}>
              <Text>checking for updates...</Text>
            </View>
            <Footer
              title="Stay On Track"
              subTitle="checking for updates....."
            />
          </View>
        </ImageBackground>
        <StatusBar backgroundColor={colors.primary} />
      </View>
    </TouchableWithoutFeedback>
    
  );
};

//<View style={styles.background}></View>
const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  updates: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Splash;
