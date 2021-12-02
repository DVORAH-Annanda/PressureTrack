import Axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from '../constants/userConstants';
import {
  getLocalStorageData,
  storeData,
  removeStoredData,
  clearAllLocalStorageData,
} from "../utilities/localStoreData";
import { isObjectEmpty } from "../utilities/general";

import authenticationHandler from "../utilities/authenticationHandler";

        //const { url } = navState;
      //const eId = await authenticationHandler.getUserInfo(url);
      //if (eId != null) {
      //  authenticationHandler.storeToken(eId);
      //  submitHandler();
      //}

      export const setLogin = (isLoggedIn) => async (dispatch) => {
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: isLoggedIn });
    };   

export const signIn = (userInfo) => async (dispatch) => {
  
  //dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    
    //const data = await authenticationHandler.getSignInUserInfo(url);
    console.log(`signIn ACTION kom ons hier uit? `)
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
    console.log(`signIn ACTION kom ons hier uit? ${JSON.stringify(userInfo)}`)
    storeData("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message,
    });
  }
};

export const signOut = () => (dispatch) => {
  console.log(`probeer sign ou in acton`)
  removeStoredData('userInfo');
  removeStoredData('selectedUnits');
  removeStoredData('persist:root');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = () => async (dispatch, getState) => {  
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const data = await getLocalStorageData("userInfo");
    if (isObjectEmpty(data)) {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: [] }); //USER_DETAILS_SUCCESS = USER_LOCALSTORE_SUCCESS
    } else {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: JSON.parse(data)});      
    }
  } catch (error) {
    const message = error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

//const getUserInfo = async () => {
//  try {
//    console.log(`try to get userinfo`);
//    const data = await getLocalStorageData("userInfo");
//    if (isObjectEmpty(data)) {
//      return [];
//    } else {
//      return JSON.parse(data);
//    }
//  } catch (error) {
//    return error.message;
//  }
//};






