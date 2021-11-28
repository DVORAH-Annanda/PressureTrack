import React, { useDispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UnitsNavigator from "./UnitsNavigator";
import SensorValuesNavigator from "./SensorValuesNavigator";
import Splash from "../screens/Splash";
import AppCheck from "../screens/AppCheck";

import SignIn from "../screens/SignIn";


import {clearAllLocalStorageData} from "../utilities/localStoreData";

const MainStack = createStackNavigator();

const MainRoutes = {
  Splash: "Splash",
  AppCheck: "AppCheck",
  SignIn: "SignIn",
  UnitsNavigator: "UnitsNavigator",
  SensorValuesNavigator: "SensorValuesNavigator",
};

//{
//  gestureEnabled: true,
//  headerStyle: {
//    backgroundColor: "#101010",
//  },
//  headerTitleStyle: {
//    fontWeight: "bold",
//  },
//  headerBackTitleVisible: false,
//  headerTintColor: colors.primary,
//}

//const dispatch = useDispatch();
//useEffect(() => {
//  dispatch(detailsUser());
//}, []);

function MainStackNavigator() {

  //clearAllLocalStorageData();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  //signIn(userInfo);

  console.log(`userInfo ${JSON.stringify(userInfo)}`)
  //const dispatch = useDispatch();
  
      //dispatch(signIn(userInfo));
  //const userInfo = false;
  //console.log(`MAIN STACK isSignedIn ${JSON.stringify(userInfo)}`);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={MainRoutes.Splash}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {userInfo ? (
          <>                      
            <MainStack.Screen
              name={MainRoutes.UnitsNavigator}
              component={UnitsNavigator}
              options={{
                title: "Units",
              }}
            />
          </>
        ) : (
          <>
            <MainStack.Screen
              name={MainRoutes.Splash}
              component={Splash}
              options={{
                title: "Stay On Track",
              }}
            />
            <MainStack.Screen
              name={MainRoutes.AppCheck}
              component={AppCheck}
              options={{
                title: "PRESSURE TRACK",
              }}
            />
            <MainStack.Screen
              name={MainRoutes.SignIn}
              component={SignIn}
              options={{
                title: "Sign In",
              }}
            />
            <MainStack.Screen
              name={MainRoutes.UnitsNavigator}
              component={UnitsNavigator}
              options={{
                title: "Units",
              }}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

//<Stack.Screen
//name="SensorValues"
//screenOptions={{
//  headerShown: true,
//}}
//component={SensorValues}
//options={({ route }) => ({
//  title: route.params.item.nm,
//})}
///>

export default MainStackNavigator;
