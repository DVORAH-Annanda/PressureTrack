import React from "react";
import { useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";

import SignOut from "../screens/SignOut";

import { clearAllLocalStorageData } from "../utilities/localStoreData";

const GeneralStack = createStackNavigator();

const GeneralRoutes = {
  SignOut: "SignOut",
};

function GeneralStackNavigator() {
  //clearAllLocalStorageData();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  //signIn(userInfo);

  console.log(`userInfo ${JSON.stringify(userInfo)}`);
  //const dispatch = useDispatch();

  //dispatch(signIn(userInfo));
  //const userInfo = false;
  //console.log(`MAIN STACK isSignedIn ${JSON.stringify(userInfo)}`);

  return (
    <GeneralStack.Navigator
      initialRouteName={GeneralRoutes.SignOut}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <GeneralStack.Screen
        name={GeneralRoutes.SignOut}
        component={SignOut}
        options={{
          title: "Sign Out",
        }}
      />
    </GeneralStack.Navigator>
  );
}

export default GeneralStackNavigator;
