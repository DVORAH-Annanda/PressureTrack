import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValues from "../screens/SensorValues";
import SignOut from '../screens/SignOut'

import { listUserUnits } from "../actions/unitActions";

import colors from "../styles/colors";

const UnitListTabs = createBottomTabNavigator();

const UnitsNavigator = () => {

  const tabBarOptions = {
    tabBarShowLabel: true,
    tabBarActiveTintColor: colors.primary,
    tabBarStyle: [
      {
        height: "10%",
      },
      null,
    ],
  };

  const dispatch = useDispatch();
  //const logoutHandler = () => dispatch(setLogout())
  const userUnitList = useSelector((state) => state.unitList);
  //const { loading, error, units, selectedUnits } = unitList;
  const { loading, error, selectedUnits } = userUnitList;

  useEffect(() => {
    dispatch(listUserUnits());
  }, [dispatch, listUserUnits]);


  return (
    <UnitListTabs.Navigator
      screenOptions={tabBarOptions}
      initialRouteName={
        selectedUnits.length > 0 ? "UnitsSelected"  : "UnitList"
      }
    >
      <UnitListTabs.Screen
        name="All Units"
        component={UnitList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-bus" color={color} size={36} />
          ),
        }}
      />
      <UnitListTabs.Screen
        name="UnitsSelected"
        component={UnitsSelected}
        options={{
          title: "User's Selected Units",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
        }}
      />
            <UnitListTabs.Screen
      name='SensorValues'
        component={SensorValues}
        options={{
          title: "",
          tabBarButton: props => null}}

      />
                  <UnitListTabs.Screen
      name='LogOut'
        component={SignOut}
        options={{
          title: "",
          tabBarButton: props => null}}

      />
    </UnitListTabs.Navigator>
  );
};

//options={({ route }) => ({
//  title: route.params.item.nm,
//})}
//options={{tabBarButton: props => null}}


export default UnitsNavigator;
