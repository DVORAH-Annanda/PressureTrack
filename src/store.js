import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"; //*Middleware
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import { appStateReducer } from "./reducers/appReducer";
import { userSignInReducer, userDetailsReducer } from "./reducers/userReducer";
import {
  unitListReducer,
  unitSelectedReducer,
  unitSensorValuesReducer,
} from "./reducers/unitReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userSignIn"],
  //whitelist: ["userSignIn", "unitSelected"],
  //whitelist: ["userSignIn", "unitList", "unitSelected", "unitSensorValues"],
};

const reducer = combineReducers({
  appState: appStateReducer,
  userSignIn: userSignInReducer,
  //userDetails: userDetailsReducer,
  unitList: unitListReducer,
  unitSelected: unitSelectedReducer,
  unitSensorValues: unitSensorValuesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store;
