import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SIGNOUT,
  USER_SESSION_ID_UPDATE_FAIL,
  USER_SESSION_ID_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userSignInReducer = (
  state = { loading: true, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SESSION_ID_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SESSION_ID_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      console.log(`userSignInReducer USER_SIGNOUT ${JSON.stringify(action)}`);
      //*for all keys defined in your persistConfig(s)
      //storage.removeItem('persist:root')
      return { loading: true, userInfo: {} };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { loading: true, userInfo: {} },
  action
) => {
  console.log(`userDetailsReducer action ${JSON.stringify(action)}`);
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
