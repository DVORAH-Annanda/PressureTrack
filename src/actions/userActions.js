import Axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";
import {
  getLocalStorageData,
  storeData,
  removeStoredData,
  clearAllLocalStorageData,
} from "../utilities/localStoreData";

export const setLogin = (isLoggedIn) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_SUCCESS, payload: isLoggedIn });
};

export const signIn = (userInfo) => async (dispatch) => {
  //dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    console.log(`signIn USER_SIGNIN_SUCCESS userInfo  ${JSON.stringify(userInfo)}`);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message,
    });
  }
};

export const signOut = () => (dispatch) => {
  console.log(`signOut USER_SIGNOUT`);
  //removeStoredData("userInfo");
  //removeStoredData("selectedUnits");
  removeStoredData("persist:root");
  dispatch({ type: USER_SIGNOUT, payload: {} });
};

export const detailsUser = () => async (dispatch) => {
  try {
    console.log(`detailsUser USER_DETAILS_SUCCESS`);
    const data = await getLocalStorageData("userInfo");
      dispatch({ type: USER_DETAILS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    const message = error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

