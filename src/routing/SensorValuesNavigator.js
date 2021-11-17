import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValues from "../screens/SensorValues";

import { listUserUnits } from "../actions/unitActions";

import colors from "../styles/colors";

const tabBarOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.primary,
  tabBarStyle: [
    {
      height: "10%",
    },
    null,
  ],
};

const SensorValuesTabs = createBottomTabNavigator();

const SensorValuesNavigator = () => {

  const dispatch = useDispatch();
  //const logoutHandler = () => dispatch(setLogout())
  const userUnitList = useSelector((state) => state.unitList);
  //const { loading, error, units, selectedUnits } = unitList;
  const { loading, error, selectedUnits } = userUnitList;

  useEffect(() => {
    dispatch(listUserUnits());
  }, []);

 

  return (
    <SensorValuesTabs.Navigator
      screenOptions={tabBarOptions}
      initialRouteName={
        "SensorValues"
      }
    >
      <SensorValuesTabs.Screen
        name="Units"
        component={UnitList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-bus" color={color} size={36} />
          ),
        }}
      />
      <SensorValuesTabs.Screen
        name="UnitsSelected"
        component={UnitsSelected}
        options={{
          title: "Selected Units",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
        }}
      />
    </SensorValuesTabs.Navigator>
  );
};

export default SensorValuesNavigator;
