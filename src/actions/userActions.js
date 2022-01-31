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

export const validateToken = (eid) => async (dispatch, getState) => {
  dispatch({
    type: UNIT_LIST_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    if (!isObjectEmpty(userInfo.eId)) {
      console.log(`listUnits UNIT_LIST_SUCCESS userInfo ${JSON.stringify(userInfo.eId)}`);
      const fetchurl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}&sid=' +
        userInfo.eId;
      const { data } = await Axios.get(fetchurl);
      dispatch({
        type: UNIT_LIST_SUCCESS,
        payload: data.items,
      });
    }
  } catch (error) {
    dispatch({
      type: UNIT_LIST_FAIL,
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

