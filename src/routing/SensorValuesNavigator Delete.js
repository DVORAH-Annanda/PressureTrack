import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValuesDiagram from "../screens/SensorValuesDiagram";

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
 
  // const userUnitList = useSelector((state) => state.unitList);
  // const { loading, error, selectedUnits } = userUnitList;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(listUserUnits());
  // }, []); 

  return (
    <SensorValuesTabs.Navigator
      screenOptions={tabBarOptions}
      initialRouteName={
        "SensorValuesDiagram"
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
