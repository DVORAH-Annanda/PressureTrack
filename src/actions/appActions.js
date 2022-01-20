import {
  APPSTATE_SET_RUNNING ,
} from "../constants/appConstants";

export const setRunning = (isRunning) => async (dispatch) => {
  try {
    dispatch({ type: APPSTATE_SET_RUNNING, payload: isRunning });
  } catch (error) {
    dispatch({
      type: APPSTATE_FAIL,
      payload: error.message,
    });
  }
}
