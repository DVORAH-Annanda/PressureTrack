import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'react-native';
import Splash from "../screens/Splash";
import AppCheck from "../screens/AppCheck";

import SignIn from "../screens/SignIn";

//import AppLoading from '../screens/AppLoading'
import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValues from "../screens/SensorValues";
//import WheelsDiagram from '../screens/AppStack/WheelsDiagramScreen'

import colors from "../styles/colors";
import UnitsNavigator from "./UnitsNavigator";

const Stack = createStackNavigator();


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
        initialRouteName="Splash"
        screenOptions={
          {
            headerShown: false,
          }
        }

        
      >
        <Stack.Screen
          name="Splash"
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
          name="SignIn"
          component={SignIn}
          options={{
            title: "Sign In",
          }}
        />

        <Stack.Screen
          name="UnitsNavigator"
          component={UnitsNavigator}
          options={{
            title: "Units",
          }}
        />
        <Stack.Screen
          name="SensorValues"
          component={SensorValues}
          options={({ route }) => ({
            title: route.params.item.nm,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default MainStackNavigator;
