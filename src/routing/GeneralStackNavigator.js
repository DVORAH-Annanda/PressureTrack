import React from "react";

import { GeneralRoutes } from "./Routes";

import SignOut from "../screens/SignOut";

import { createStackNavigator } from "@react-navigation/stack";

const GeneralStack = createStackNavigator();

function GeneralStackNavigator() {

  return (
    <GeneralStack.Navigator
      initialRouteName={GeneralRoutes.SignOut}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <GeneralStack.Screen
        name={GeneralRoutes.SignOut}
        component={SignOut}
        options={{
          title: "Sign Out",
        }}
      />
    </GeneralStack.Navigator>
  );
}

export default GeneralStackNavigator;
