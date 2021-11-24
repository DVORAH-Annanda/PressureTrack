import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { userSignInReducer, userDetailsReducer } from './reducers/userReducer';
import {
  unitListReducer,
  unitSensorValuesReducer,
} from './reducers/unitReducers';
import { getLocalStorageData } from './utilities/localStoreData';
import { isObjectEmpty } from './utilities/general';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInfo = async () => {
  try {
    console.log(`try to get userinfo`);
    const data = await getLocalStorageData('userInfo');    
    if (!isObjectEmpty(data)) {
      //const temp2 = JSON.parse(data);
      //console.log(`temp2 ${JSON.stringify(temp2)}`);
      return JSON.parse(data);
    }
  } catch (error) {
    //return error.message;
  }
};

//const temp = getUserInfo();
//console.log(`temp ${JSON.stringify(temp)}`)

const initialState = {  //moet waarskynlik uit! ook in createStore
  //userSignIn: {
  //  userInfo: null,
  //}
  //***sien beefree vir onthou van units en userinfo @@@await
  userSignIn: {
    userInfo: getUserInfo() ? console.log(`GETUSERINFO!! ${JSON.stringify(getUserInfo())}`) : [],
  },
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userDetails: userDetailsReducer,
  unitList: unitListReducer,
  unitSensorValues: unitSensorValuesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  //initialState,
  compose(applyMiddleware(thunk))
);

export const persistor  = persistStore(store)

export default store;
