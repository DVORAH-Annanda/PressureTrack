//    /* Psalm 127:1-2 */
//    As YHWH die huis nie bou nie, tevergeefs werk die wat daaraan bou;
//    as YHWH die stad nie bewaar nie, tevergeefs waak die wagter.
//    Tevergeefs dat julle vroeg opstaan, laat opbly, brood van smarte eet —
//    net so goed gee Hy dit aan sy beminde in die slaap!

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store";

import { SafeAreaProvider } from "react-native-safe-area-context";

import MainStackNavigator from "./src/routing/MainStackNavigator";

import { enableScreens } from "react-native-screens";

enableScreens();

// useEffect(() => {
//   checkAuthenticationStatus()
// }, [])

// const checkAuthenticationStatus = async () => {
//   try {
//       const returnedToken = await AsyncStorage.getItem('userToken');
//       setUserToken(returnedToken);
//       console.warn('User token set to the state value');
//   } catch(err){
//       console.warn(`Error occured while retrieving token: ${err}`)
//   }
//   setIsLoading(false)
// }

const onBeforeLift = async () =>
  console.log(`onBeforeLift store.getState() ${JSON.stringify(store.getState())}`);

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={onBeforeLift}
      >
        <SafeAreaProvider>
          <MainStackNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
