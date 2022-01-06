import React, { useDispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignOut from "../screens/SignOut";
import UnitsNavigator from "./UnitsNavigator";
import SensorValuesNavigator from "./SensorValuesNavigator";


import SignIn from "../screens/SignIn";


import {clearAllLocalStorageData} from "../utilities/localStoreData";

const GeneralDrawer = createDrawerNavigator();

const GeneralDrawerNavigator = () => {
  return (
    <GeneralDrawer.Navigator>
      <GeneralDrawer.Screen name="SignOut" component={SignOut} />
     
    </GeneralDrawer.Navigator>
  );
};
export default GeneralDrawerNavigator;

// const GeneralRoutes = {
//   Splash: "Splash",
//   AppCheck: "AppCheck",
//   SignOut: "SignOut",
//   UnitsNavigator: "UnitsNavigator",
// };

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

//function GeneralDrawerNavigator() {

  //clearAllLocalStorageData();
  //const userSignIn = useSelector((state) => state.userSignIn);
  // { userInfo } = userSignIn;
  //signIn(userInfo);

  //console.log(`userInfo ${JSON.stringify(userInfo)}`)
  //const dispatch = useDispatch();
  
      //dispatch(signIn(userInfo));
  //const userInfo = false;
  //console.log(`MAIN STACK isSignedIn ${JSON.stringify(userInfo)}`);

//   return (
//     <NavigationContainer>
//       <GeneralStack.Navigator
//         initialRouteName={GeneralRoutes.Splash}
//         screenOptions={{
//           headerShown: false,
//           gestureEnabled: true,
//           gestureDirection: "horizontal",
//         }}
//       >
//         {userInfo ? (
//           <>                      
//             <MainStack.Screen
//               name={MainRoutes.UnitsNavigator}
//               component={UnitsNavigator}
//               options={{
//                 title: "Units",
//               }}
//             />
//           </>
//         ) : (
//           <>
//             <MainStack.Screen
//               name={MainRoutes.Splash}
//               component={Splash}
//               options={{
//                 title: "Stay On Track",
//               }}
//             />
//             <MainStack.Screen
//               name={MainRoutes.AppCheck}
//               component={AppCheck}
//               options={{
//                 title: "PRESSURE TRACK",
//               }}
//             />
//             <MainStack.Screen
//               name={MainRoutes.SignIn}
//               component={SignIn}
//               options={{
//                 title: "Sign In",
//               }}
//             />
//             <MainStack.Screen
//               name={MainRoutes.UnitsNavigator}
//               component={UnitsNavigator}
//               options={{
//                 title: "Units",
//               }}
//             />
//           </>
//         )}
//       </MainStack.Navigator>
//     </NavigationContainer>
//   );
// }

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

//export default GeneralDrawerNavigator;
