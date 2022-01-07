import React, { useDispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UnitsNavigator from "./UnitsNavigator";
import GeneralStackNavigator from "./GeneralStackNavigator";

import colors from "../styles/colors";

import SignIn from "../screens/SignIn";

import { clearAllLocalStorageData } from "../utilities/localStoreData";

const GeneralDrawer = createDrawerNavigator();

const GeneralDrawerNavigator = () => {
  return (
    <GeneralDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
      }}
    >
      <GeneralDrawer.Screen
        name="UnitListTabs"
        options={{
          title: "Go Back",
        }}
        component={UnitsNavigator}
      />
      <GeneralDrawer.Screen
        name="GeneralStack"
        options={{
          title: "Sign Out",
        }}
        component={GeneralStackNavigator}
      />
    </GeneralDrawer.Navigator>
  );
};

export default GeneralDrawerNavigator;
