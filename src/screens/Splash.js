import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MainRoutes } from "../routing/Routes";
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
  
  const navigate = useCallback(
    () => navigation.navigate(MainRoutes.AppCheck),
    [navigation]
  );

  useFocusEffect(
    useCallback(() => {
      const navigationTimer = setTimeout(() => {
        navigate();
      }, 1850);
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
            <Footer title="Stay On Track" subTitle="..." />
          </View>
        </ImageBackground>
        <StatusBar backgroundColor={colors.primary} />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
