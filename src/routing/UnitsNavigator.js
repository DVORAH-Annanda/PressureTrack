import React, { useCallback, useState, useEffect  } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";
import SensorValuesDiagram from "../screens/SensorValuesDiagram";
import WheelsDiagram from "../screens/WheelsDiagram";

import {
  selectUnit
} from "../actions/unitActions";

import { listUserUnits } from "../actions/unitActions";

import colors from "../styles/colors";
import { isObjectEmpty } from "../utilities/general";
import { getLocalStorageData  } from "../utilities/localStoreData";

const UnitListTabs = createBottomTabNavigator();

const UnitsNavigator = ({ navigation }) => {

  const unitSelected = useSelector((state) => state.unitSelected);
  const { unitIsSelected, selectedUnit } = unitSelected;

  const [isUnitSelected, setIsUnitSelected] = useState(false);
  const [params, setParams] = useState("");

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



  const tabBarOptions = {
    
    tabBarShowLabel: true,
    tabBarActiveTintColor: colors.primary,
    tabBarStyle: [
      {
        height: (Platform.OS === 'ios') ? "10%" : "7.5%"
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

  const handleSelectedUnit = (unit) => {
    dispatch(selectUnit(true, unit));
    return navigation.navigate("WheelsDiagram", {
      title: unit.nm,
      item: unit,
    });
  };

  useFocusEffect(
    useCallback(() => {  
        if (unitIsSelected)
          navigation.navigate("WheelsDiagram", { title: selectedUnit.nm, item: selectedUnit });
    }, [navigation, dispatch])
  );

  const dispatch = useDispatch();
  function resetSelectedUnit() {
    console.log(
      `RESETSELECTEDUNIT`
    );
    dispatch(selectUnit(false, {}));
  }

  
  useEffect(() => {
    const checkAuth = async () => {
      const isAssigned = await getLocalStorageData("isAssigned");
      const alreadyExist = await getLocalStorageData("WheelsDiagram");

      setParams(alreadyExist);
      setIsUnitSelected(isAssigned);

      if (isAssigned === "true") {
        //   console.log("SUUCUCUUCUC");
        handleSelectedUnit(JSON.parse(params));
        // navigation.navigate("WheelsDiagram", {
        //   title: JSON.parse(params).nm,
        //   item: JSON.parse(params),
        // });
      }
    };
    checkAuth().then()
    .catch((e) => {
      console.log("catch", e);
    });
  }, [unitIsSelected, params]);


  console.log(`isUnitSelected? ${typeof isUnitSelected}`);
  return (
    <UnitListTabs.Navigator
    
      screenOptions={tabBarOptions}
      
      initialRouteName="UnitList"
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
        name="WheelsDiagram"
        component={WheelsDiagram}
        options={({ route }) => ({
          title: "WheelsDiagram",
          headerShown: false,
          tabBarButton: (props) => null,
        })}
      />
      <UnitListTabs.Screen
        name="SensorValuesDiagram"
        component={SensorValuesDiagram}
        options={({ route }) => ({
          title: "Sensor Values Diagram",
          headerShown: false,
          tabBarButton: (props) => null,
        })}
      />
    </UnitListTabs.Navigator>
  );
};


{/* <UnitListTabs.Screen
name="UnitsSelected"
component={UnitsSelected}
options={{
  tabBarIcon: ({ color, size }) => (
    <MaterialIcons name="person" color={color} size={36} />
  ),
  title: "Selected Units",
}}
/> */}

// listeners={{
//   tabPress: e => {
//       resetSelectedUnit();
//       e.preventDefault();
//   },
// }}

export default UnitsNavigator;
