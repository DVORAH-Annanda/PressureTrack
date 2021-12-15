import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons"; 
import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValuesDiagram from "../screens/SensorValuesDiagram";
import WheelsDiagram from "../screens/WheelsDiagram";
import SignOut from "../screens/SignOut";

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
        "UnitList"
        //selectedUnits > 0 ? "UnitsSelected"  : "UnitList"
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
        name="Units Selected"
        component={UnitsSelected}
        options={{
          //title: "User's Selected Units",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
        }}
      />

            <UnitListTabs.Screen
        name="WheelsDiagram"
        component={WheelsDiagram}
        // options={({ route }) => ({ title: route.params.name })}  tabBarButton: (props) => null,

        options={({ route }) => ({ title: route.params?.title || 'Wheels Diagram',
        tabBarButton: (props) => null})}
      />
      {/* <UnitListTabs.Screen
        name="Sign Out"
        component={SignOut}
        options={{
          //title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={36} />
          ),
          navigationOptions: ({ navigation }) => ({
            tabBarOnPress: () => {
              Alert.alert(
                "Sign Out",
                "Are you sure you want to sign out?",
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      //console.log("logout");
                      //AsyncStorage.setItem("token", null);
                      navigation.navigate("SignIn");
                    },
                  },
                ],
                { cancelable: false }
              );
            },
          }),
        }}
      /> */}
    </UnitListTabs.Navigator>
  );
};

//options={({ route }) => ({
//  title: route.params.item.nm,
//})}
//options={{tabBarButton: props => null}}

      /* <UnitListTabs.Screen
        name="SensorValues"
        component={SensorValuesDiagram}
        // options={({ route }) => ({ title: route.params.name })}  tabBarButton: (props) => null,

        options={({ route }) => ({ title: route.params?.title || 'Sensor Values',
        tabBarButton: (props) => null})}
      /> */

export default UnitsNavigator;
