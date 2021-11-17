import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import UnitList from "../screens/UnitList";
import UnitsSelected from "../screens/UnitsSelected";

import { listUserUnits } from "../actions/unitActions";

//import { getLocalStorageData } from "../utilities/userSelectedUnitsHandler";

import colors from "../styles/colors";

//import AsyncStorage from "@react-native-async-storage/async-storage";

function clearAllLocalStorgeData() {
  console.log("clearAllLocalStorgeData");
  AsyncStorage.getAllKeys()
    .then((keys) => AsyncStorage.multiRemove(keys))
    .then(() => alert("success"));
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
} //move to utils

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

const UnitListTabs = createBottomTabNavigator();

const UnitsNavigator = () => {

  const dispatch = useDispatch();
  //const logoutHandler = () => dispatch(setLogout())
  const userUnitList = useSelector((state) => state.unitList);
  //const { loading, error, units, selectedUnits } = unitList;
  const { loading, error, selectedUnits } = userUnitList;
  console.log("navigator-selectedUnits!!! " + JSON.stringify(selectedUnits))

  useEffect(() => {
    dispatch(listUserUnits());
  }, []);

  //const [selectedUnits, setSelectedUnits] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);

  //useEffect(() => {
  //  fetchSelectedUnits();
  //}, []);

  const fetchSelectedUnits = async () => {
    //clearAllLocalStorgeData();
    setIsLoading(true);
    const storedSelectedUnits = await getLocalStorageData("selectedUnits");
    console.log("nav storedSelectedUnits " + storedSelectedUnits);
    if (!isObjectEmpty(storedSelectedUnits)) {
      console.log("nav storedSelectedUnits " + JSON.parse(storedSelectedUnits));
      setSelectedUnits(storedSelectedUnits);
      console.log("nav selectedUnits length" + storedSelectedUnits.length);
    }
    setIsLoading(false);
  };

  return (
    <UnitListTabs.Navigator
      screenOptions={tabBarOptions}
      initialRouteName={
        !loading && selectedUnits.length === 0 ? "UnitList" : "UnitsSelected"
      }
    >
      <UnitListTabs.Screen
        name="Units"
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
          title: "Selected Units",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={36} />
          ),
        }}
      />
    </UnitListTabs.Navigator>
  );
};

export default UnitsNavigator;
