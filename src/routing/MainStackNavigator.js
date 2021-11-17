import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import UnitsNavigator from "./UnitsNavigator";
import SensorValuesNavigator from "./SensorValuesNavigator";
import Splash from "../screens/Splash";
import AppCheck from "../screens/AppCheck";

import SignIn from "../screens/SignIn";


import SensorValues from "../screens/SensorValues";
//import WheelsDiagram from '../screens/AppStack/WheelsDiagramScreen'

import colors from "../styles/colors";

const Stack = createStackNavigator();
const screenNames = {
  splash: "Splash",
  signIn: "SignIn",
  unitsNavigator: "UnitsNavigator",
  sensorValuesNavigator: "SensorValuesNavigator",
};

//{
//  gestureEnabled: true,
//  headerStyle: {
//    backgroundColor: "#101010",
//  },
//  headerTitleStyle: {
//    fontWeight: "bold",
//  },
//  headerBackTitleVisible: false,
//  headerTintColor: colors.primary,
//}

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.splash}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          name={screenNames.splash}
          component={Splash}
          options={{
            title: "Stay On Track",
          }}
        />
        <Stack.Screen
          name="AppCheck"
          component={AppCheck}
          options={{
            title: "PRESSURE TRACK",
          }}
        />
        <Stack.Screen
          name={screenNames.signIn}
          component={SignIn}
          options={{
            title: "Sign In",
          }}
        />
        <Stack.Screen
          name= { screenNames.unitsNavigator }
          component={UnitsNavigator}
          options={{
            title: "Units",
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

//<Stack.Screen
//name="SensorValues"
//screenOptions={{
//  headerShown: true,
//}}
//component={SensorValues}
//options={({ route }) => ({
//  title: route.params.item.nm,
//})}
///>



export default MainStackNavigator;
