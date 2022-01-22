import { APPSTATE_SET_RUNNING, APPSTATE_FAIL } from "../constants/appConstants";

export const appStateReducer = (state = { isRunning: false }, action) => {
  switch (action.type) {
    case APPSTATE_SET_RUNNING:
      return { isRunning: action.payload };
    case APPSTATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

