import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  unitListReducer,
  unitSensorValuesReducer,
} from "./reducers/unitReducers";
import { userSignInReducer } from "./reducers/userReducer";
import { getLocalStorageData } from "./utilities/localData";
import { isObjectEmpty } from "./utilities/general";

const getUserInfo = async () => {
  try {
    console.log(`try to get userinfo`);
    const data = await getLocalStorageData("userInfo");
    if (isObjectEmpty(data)) {
      return [];
    } else {
      return JSON.parse(data);
    }
  } catch (error) {
    return error.message;
  }
};

const initialState = {
  //userSignIn: {
  //  userInfo: null,
  //}
  //***sien beefree vir onthou van units en userinfo @@@await
  userSignIn: {
    userInfo: getUserInfo()
      ? getUserInfo()
      : [],
  },
};

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  unitList: unitListReducer,
  unitSensorValues: unitSensorValuesReducer,
});

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
