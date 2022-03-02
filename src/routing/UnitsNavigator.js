import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector, useDispatch } from "react-redux";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValuesDiagram from "../screens/SensorValuesDiagram";
import WheelsDiagram from "../screens/WheelsDiagram";

import { selectUnit } from "../actions/unitActions";

import { listUnits } from "../actions/unitActions";

import colors from "../styles/colors";
import { isObjectEmpty } from "../utilities/general";
import { getLocalStorageData } from "../utilities/localStoreData";

const UnitListTabs = createMaterialTopTabNavigator(); //createMaterialBottomTabNavigator(); createBottomTabNavigator

const UnitsNavigator = ({ navigation }) => {
  const color = colors.primary;

  // const userUnitList = useSelector((state) => state.unitList);
  // const { loading, error, selectedUnits } = userUnitList;

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

  // function getInitialRouteName() {
  //   console.log(
  //     `getInitialRouteName() loading ${loading} selectedUnits.length ${selectedUnits.length}`
  //   );
  //   if (!loading) {
  //     if (selectedUnits.length === 0) {
  //       return "UnitList";
  //     } else {
  //       return "UnitsSelected";
  //       // if (isObjectEmpty(selectedUnit)) return "UnitsSelected";
  //       // else return "WheelsDiagram";
  //     }
  //   }
  // }

  const unitSelected = useSelector((state) => state.unitSelected);
  const { unitIsSelected, selectedUnit } = unitSelected;

  // const unitList = useSelector((state) => state.unitList);
  // const { loading, error, units } = unitList;

  const dispatch = useDispatch();
  // useFocusEffect(
  //   useCallback(() => {
  //        dispatch(listUnits());
  //   }, [dispatch, listUnits])
  // );

  const [isUnitSelected, setIsUnitSelected] = useState(false);
  const [params, setParams] = useState("");

  const handleSelectedUnit = (unit) => {
    dispatch(selectUnit(true, unit));
    return navigation.navigate("WheelsDiagram", {
      title: unit.nm,
      item: unit,
    });
  };

  // useFocusEffect(
  //   useCallback(() => {
  //       if (unitIsSelected)
  //         navigation.navigate("WheelsDiagram", { title: selectedUnit.nm, item: selectedUnit });
  //         else
  //         dispatch(listUnits());
  //   }, [navigation, dispatch, listUnits])
  // );

  function resetSelectedUnit() {
    console.log(`RESETSELECTEDUNIT`);
    dispatch(selectUnit(false, {}));
  }

  useEffect(() => {
    const checkAuth = async () => {
      //dispatch(listUnits());

      const isAssigned = await getLocalStorageData("isAssigned");
      const alreadyExist = await getLocalStorageData("WheelsDiagram");

      setParams(alreadyExist);
      setIsUnitSelected(isAssigned);

      if (isAssigned === "true") {
        console.log(
          `isAssigned TRUE string ${JSON.stringify(JSON.parse(params))}`
        );
        handleSelectedUnit(JSON.parse(params));
        // navigation.navigate("WheelsDiagram", {
        //   title: JSON.parse(params).nm,
        //   item: JSON.parse(params),
        // });
      }

      // else {
      //   console.log(`SUUCUCUUCUC string ${(JSON.stringify(units[0]))}`);
      //   if(!loading) setParams((units[0]));

      //   console.log(`SUUCUCUUCUC no parse ${((units[0]))}`);
      // }
    };
    checkAuth()
      .then()
      .catch((e) => {
        console.log("catch", e);
      });
  }, [dispatch, unitIsSelected, params]);

  // initialLayout={height=Platform.OS === "ios" ? "10%" : "7.5%" }
  // barStyle={{
  //   height: Platform.OS === "ios" ? "10%" : "7.5%",
  //   backgroundColor: colors.white,
  // }}

  return (
      <UnitListTabs.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 8.5 },
          tabBarAllowFontScaling: true,
          tabBarInactiveTintColor: colors.gray,
          tabBarActiveTintColor: colors.primary,
          tabBarPressColor: colors.tyreNameGreen,

          tabBarStyle: {
            marginBottom: 2.5,
            paddingBottom: 1.5,
            height: Platform.OS === "ios" ? "8.5%" : "10%",
          },
          tabBarIconStyle: { margin: 0, paddingTop: 0 },
          tabBarIndicatorStyle: { height: 0 },
        }}
        initialRouteName="UnitList"
      >
        <UnitListTabs.Screen
          name="UnitList"
          component={UnitList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="hand-point-up" size={24} color={color} />
            ),
            title: "Units List",
            tabBarLabel: "Select a Unit",
          }}
        />
        <UnitListTabs.Screen
          name="WheelsDiagram"
          component={WheelsDiagram}
          initialParams={{ item: params }}
          options={({ route }) => ({
            title: "Wheels Diagram",
            tabBarLabel: "Wheels Diagram",
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="bus" size={24} color={color} />
            ),
            title: "Wheels Diagram",
            tabBarLabel: "Wheels Diagram",
          }}
        />
        <UnitListTabs.Screen
          name="SensorValuesDiagram"
          component={SensorValuesDiagram}
          initialParams={{ item: params }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="file-text" size={24} color={color} />
            ),
            title: "Sensor Values Diagram",
            tabBarLabel: "Sensor Values",
          }}
        />
      </UnitListTabs.Navigator>
    
  );
};

//   return (
//     <UnitListTabs.Navigator

//       screenOptions={tabBarOptions}

//       initialRouteName="UnitList"
//     >
//       <UnitListTabs.Screen
//         name="UnitList"
//         component={UnitList}

//       />
//       <UnitListTabs.Screen
//         name="WheelsDiagram"
//         component={WheelsDiagram}

//       />
//       <UnitListTabs.Screen
//         name="SensorValuesDiagram"
//         component={SensorValuesDiagram}

//       />
//     </UnitListTabs.Navigator>
//   );
// };

{
  /* <UnitListTabs.Screen
name="UnitsSelected"
component={UnitsSelected}
options={{
  tabBarIcon: ({ color, size }) => (
    <MaterialIcons name="person" color={color} size={36} />
  ),
  title: "Selected Units",
}}
/> */
}

// listeners={{
//   tabPress: e => {
//       resetSelectedUnit();
//       e.preventDefault();
//   },
// }}

export default UnitsNavigator;
