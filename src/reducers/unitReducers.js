import {
  ADD_SELECTED_UNIT,
  REMOVE_SELECTED_UNIT,
  UNIT_LIST_FAIL,
  UNIT_LIST_REQUEST,
  UNIT_LIST_SUCCESS,
  USER_UNIT_LIST_FAIL,
  USER_UNIT_LIST_REQUEST,
  USER_UNIT_LIST_SUCCESS,
  UNIT_SENSORVALUES_FAIL,
  UNIT_SENSORVALUES_REQUEST,
  UNIT_SENSORVALUES_SUCCESS,
  UNIT_SELECTED,
  CLEAR_UNITS_USER_SIGNOUT,
} from "../constants/unitConstants";

export const unitListReducer = (
  state = { loading: true, units: [], selectedUnits: [] },
  action
) => {
  switch (action.type) {
    //case UNIT_LIST_REQUEST:
    //  return { ...state, loading: true };
    case UNIT_LIST_SUCCESS:
      return { ...state, loading: false, units: action.payload };
    //case USER_UNIT_LIST_REQUEST:
    //  return { ...state, loading: true };
    case USER_UNIT_LIST_SUCCESS:
      return { ...state, loading: false, selectedUnits: action.payload };
    case ADD_SELECTED_UNIT:
      return {
        ...state,
        loading: false,
        selectedUnits: [...state.selectedUnits, action.payload],
      };
    case REMOVE_SELECTED_UNIT:
      return {
        ...state,
        loading: false,
        selectedUnits: state.selectedUnits.filter(
          (unit) => unit.id !== action.payload.id
        ),
      };
    case UNIT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UNIT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_UNITS_USER_SIGNOUT:
      return { loading: true, units: [], selectedUnits: [] };
    default:
      return state;
  }
};

export const unitSelectedReducer = (
  state = { unitIsSelected: false, selectedUnit: {} },
  action
) => {
  switch (action.type) {
    case UNIT_SELECTED:
      return { unitIsSelected: action.payload.unitIsSelected, selectedUnit: action.payload.selectedUnit };
    default:
      return state;
  }
};

export const unitSensorValuesReducer = (
  state = { loading: true, sensorValues: [], dateUpdated: "", timeUpdated: "" },
  action
) => {  
  switch (action.type) {
    case UNIT_SENSORVALUES_REQUEST:
      return { loading: true };
    case UNIT_SENSORVALUES_SUCCESS:
      return { loading: false, sensorValues: action.payload.sensorValues, dateUpdated: action.payload.dateUpdated, timeUpdated: action.payload.timeUpdated };
    case UNIT_SENSORVALUES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
