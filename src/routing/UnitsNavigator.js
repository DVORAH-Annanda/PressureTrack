import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValuesDiagram from "../screens/SensorValuesDiagram";
import WheelsDiagram from "../screens/WheelsDiagram";

import { listUserUnits } from "../actions/unitActions";

import colors from "../styles/colors";
import { isObjectEmpty } from "../utilities/general";

const UnitListTabs = createBottomTabNavigator();

const UnitsNavigator = () => {
  const dispatch = useDispatch();

  //const logoutHandler = () => dispatch(setLogout())
  const userUnitList = useSelector((state) => state.unitList);
  const { loading, error, selectedUnits } = userUnitList;

  // const selectedUnitSensorValues = useSelector(
  //   (state) => state.unitSensorValues
  // );
  // const { selectedUnit } = selectedUnitSensorValues;
  // console.log(
  //   `selectedUnitSensorValues state.unitSensorValuesh ${JSON.stringify(selectedUnit)}`
  // );

  // useEffect(() => {
  //   dispatch(listUserUnits());
  // }, [dispatch, listUserUnits]);

  const tabBarOptions = {
    tabBarShowLabel: true,
    tabBarActiveTintColor: colors.primary,
    tabBarStyle: [
      {
        height: "10%",
      },
    ],
  };

  function getInitialRouteName() {
    console.log(
      `getInitialRouteName() loading ${loading} selectedUnits.length ${selectedUnits.length}`
    );
    if (!loading) {
      if (selectedUnits.length === 0) {
        return "UnitList";
      } else {
        return "UnitsSelected"
        // if (isObjectEmpty(selectedUnit)) return "UnitsSelected";
        // else return "WheelsDiagram";
      }
    }
  }

  return (
    <UnitListTabs.Navigator
      screenOptions={tabBarOptions}
      initialRouteName={getInitialRouteName()}
    >
      <UnitListTabs.Screen
        name="UnitList"
        component={UnitList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-bus" color={color} size={36} />
          ),
          title: "All Units",
        }}
      />
      <UnitListTabs.Screen
        name="UnitsSelected"
        component={UnitsSelected}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
          title: "Selected Units",
        }}
      />
      <UnitListTabs.Screen
        name="WheelsDiagram"
        component={WheelsDiagram}
        options={({ route }) => ({
          title: route.params?.title || "Wheels Diagram",
          tabBarButton: (props) => null,
        })}
      />
      <UnitListTabs.Screen
        name="SensorValuesDiagram"
        component={SensorValuesDiagram}
        options={({ route }) => ({
          title: route.params?.title || "Sensor Values",
          tabBarButton: (props) => null,
        })}
      />
    </UnitListTabs.Navigator>
  );
};

export default UnitsNavigator;
