import Axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SESSION_ID_UPDATE_FAIL,
  USER_SESSION_ID_UPDATE_SUCCESS,
  USER_SESSION_ID_UPDATE_REQUEST,
} from "../constants/userConstants";

import { isObjectEmpty } from "../utilities/general"; //isObjectEmpty
import { getSessionId } from "../utilities/authenticationHandler"; 
import {
  getLocalStorageData,
  removeStoredData,
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

export const updateSessionId = (userInfo) => async (dispatch) => {

  try {
    //if (!isObjectEmpty(userInfo)) {
      console.log(`usrActions updateSessionId userInfo.eid before -1 ${JSON.stringify(userInfo.eId)}`);
      userInfo.eid = "";
      console.log(`usrActions updateSessionId userInfo.eid to -1 ${JSON.stringify(userInfo.eId)}`);
      dispatch({
       type: USER_SESSION_ID_UPDATE_REQUEST,
       payload: userInfo,
     });
      await getSessionId(userInfo);
      console.log(`usrActions updateSessionId userInfo.eid ${JSON.stringify(userInfo.eId)}`);
      const fetchurl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}&sid=' +
        userInfo.eId;
      const { data } = await Axios.get(fetchurl);
      if (data.items.length > 0) {
        console.log(`usrActions updateSessionId BEFORE DISPATCH userInfo.eid ${JSON.stringify(userInfo.eId)}`);
         dispatch({
          type: USER_SESSION_ID_UPDATE_SUCCESS,
          payload: userInfo,
        });
      }
    //}
  } catch (error) {
    dispatch({
      type: USER_SESSION_ID_UPDATE_FAIL,
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

// export const detailsUser = () => async (dispatch) => {
//   try {
//     console.log(`detailsUser USER_DETAILS_SUCCESS`);
//     const data = await getLocalStorageData("userInfo");
//       dispatch({ type: USER_DETAILS_SUCCESS, payload: JSON.parse(data) });
//   } catch (error) {
//     const message = error.message;
//     dispatch({ type: USER_DETAILS_FAIL, payload: message });
//   }
// };

