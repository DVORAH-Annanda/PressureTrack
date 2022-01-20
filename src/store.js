import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"; //Middleware
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import { appStateReducer } from "./reducers/appReducer";
import { userSignInReducer, userDetailsReducer } from "./reducers/userReducer";
import {
  unitListReducer,
  unitSensorValuesReducer,
} from "./reducers/unitReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userSignIn", "unitList"],
};

const reducer = combineReducers({
  appState: appStateReducer,
  userSignIn: userSignInReducer,
  //userDetails: userDetailsReducer,
  unitList: unitListReducer,
  unitSensorValues: unitSensorValuesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  //reducer,
  persistedReducer,
  // getDefaultMiddleware => getDefaultMiddleware({
  //     serializableCheck: {
  //         /* ignore persistance actions */
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  // }).prepend(rootMiddleware),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store;
