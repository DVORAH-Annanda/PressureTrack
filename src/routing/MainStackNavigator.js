import React from "react";
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { MainRoutes } from "./Routes";
import Splash from "../screens/Splash";
import AppCheck from "../screens/AppCheck";
import SignIn from "../screens/SignIn";
import AppLoading from "../screens/AppLoading";
import GeneralDrawerNavigator from "./GeneralDrawerNavigator";

import { isObjectEmpty } from "../utilities/general";

import { clearAllLocalStorageData } from "../utilities/localStoreData";

const MainStack = createStackNavigator();

function MainStackNavigator() {
  //clearAllLocalStorageData();
  const appState = useSelector((state) => state.appState);
  const { isRunning } = appState;

  console.log(`MainStackNavigator useSelector isRunning ${isRunning}`);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {isRunning ? (
          <>
            <MainStack.Screen
              name={MainRoutes.GeneralDrawerNavigator}
              component={GeneralDrawerNavigator}
              navigationOptions={{
                drawerLabel: () => null,
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
              name={MainRoutes.AppLoading}
              component={AppLoading}
              options={{
                title: "Loading App",
              }}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
