import Axios from "axios";
import { API_URL } from "../constants/appConstants";
import {
  UNIT_LIST_FAIL,
  UNIT_LIST_REQUEST,
  UNIT_LIST_SUCCESS,
  USER_UNIT_LIST_FAIL,
  USER_UNIT_LIST_REQUEST,
  USER_UNIT_LIST_SUCCESS,
  UNIT_SENSORVALUES_FAIL,
  UNIT_SENSORVALUES_REQUEST,
  UNIT_SENSORVALUES_SUCCESS,
  ADD_SELECTED_UNIT,
  REMOVE_SELECTED_UNIT,
} from "../constants/unitConstants";
import authenticationHandler from "../utilities/authenticationHandler";
import { getLocalStorageData } from "../utilities/localStoreData";

export const listUnits = () => async (dispatch, getState) => {
  console.log(`listUnits userInfo%%% `)
  dispatch({
    type: UNIT_LIST_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  
  console.log(`listUnits userInfo%%% ${JSON.stringify(userInfo)}`)
  try {
    //const eidStored = {}; //await authenticationHandler.getStoredToken();
    if (!isObjectEmpty(userInfo[0].eId)) {
      const fetchurl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}&sid=' +
        userInfo[0].eId;
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

export const listUserUnits = () => async (dispatch) => {
  dispatch({
    type: USER_UNIT_LIST_REQUEST,
  });
  try {
    const data = await getLocalStorageData("selectedUnits");
    if (isObjectEmpty(data)) {
      dispatch({
        type: USER_UNIT_LIST_SUCCESS,
        payload: [],
      });
    } else {
      dispatch({
        type: USER_UNIT_LIST_SUCCESS,
        payload: JSON.parse(data),
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UNIT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const addSelectedUnit = (unit) => (dispatch) => {
  dispatch({
    type: ADD_SELECTED_UNIT,
    payload: unit,
  });
};

export const removeSelectedUnit = (unit) => (dispatch) => {
  dispatch({
    type: REMOVE_SELECTED_UNIT,
    payload: unit,
  });
};

export const unitSensorValues = (unitId) => async (dispatch, getState) => {
  dispatch({ type: UNIT_SENSORVALUES_REQUEST, payload: unitId });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    console.log(`unitSensorValues userInfo%%% ${JSON.stringify(userInfo)}`)
    if (!isObjectEmpty(userInfo[0].eId)) {
      const timeTo = Math.floor(Date.now() / 1000);
      const timeFrom = timeTo - 3600;
      const fetchurl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=messages/load_interval&params={"itemId":' +
        unitId +
        ',"timeFrom":' +
        timeFrom +
        ',"timeTo":' +
        timeTo +
        ',"flags":1,"flagsMask":65281,"loadCount":1800}&sid=' +
        userInfo[0].eId;
      const { data } = await Axios.get(fetchurl);

      console.log("Wialon URL " + fetchurl);

      let sensorValues = [];
      if (data && !isObjectEmpty(data)) {
        let e6SensorValues = getE6SensorValues(data);
        sensorValues = getWheels(getAxles(e6SensorValues), e6SensorValues);
      }

      console.log(
        "unitSensorValues -AXLES!!!!! " + JSON.stringify(sensorValues)
      );
      dispatch({
        type: UNIT_SENSORVALUES_SUCCESS,
        payload: sensorValues,
      });
    }
  } catch (error) {
    dispatch({
      type: UNIT_SENSORVALUES_FAIL,
      payload: error.message,
    });
  }
};

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
} //move to utils

//function isEmptyObj(obj) {
//    for (var key in obj) {
//        if (obj.hasOwnProperty(key))
//            return false;
//    }
//    return true;
//}

function getE6SensorValues(sensorValues) {
  let e6SensorValues = {};

  for (let i = 0; i < sensorValues.messages.length; i++) {
    if (sensorValues.messages[i].p.data_type === "E6") {
      e6SensorValues = Object.assign(
        e6SensorValues,
        sensorValues.messages[i].p
      );
    }
  }

  delete e6SensorValues.real_count;
  delete e6SensorValues.total_count;
  delete e6SensorValues.data_type;

  return e6SensorValues;
}

function getAxles(e6SensorValues) {
  let axles = [];
  for (let property in e6SensorValues) {
    let axleNo = property.substring(1, 2);
    if (!axleIdExists(axles, parseInt(axleNo))) {
      let axle = {};
      axle.axleId = parseInt(axleNo);
      axles.push(axle);
    }
  }
  axles.sort((a, b) => (a.axleId > b.axleId ? 1 : -1));

  return axles;
}

function axleIdExists(axles, axleId) {
  for (let i = 0; i < axles.length; ++i) {
    if (axles[i].axleId === axleId) {
      return true;
    }
  }
}

function getWheels(unitSensorValues, e6SensorValues) {
  for (let i = 0; i < unitSensorValues.length; i++) {
    let wheels = [];
    for (let property in e6SensorValues) {
      let axleNo = property.substring(1, 2);
      let wheelNo = property.substring(2, 3);
      if (unitSensorValues[i].axleId === parseInt(axleNo)) {
        if (!wheelIdExists(wheels, parseInt(wheelNo))) {
          let wheel = {};
          wheel.wheelId = parseInt(wheelNo);
          if (axleNo === "9") {
            wheel.wheelName = "Spare " + wheelNo;
          } else {
            wheel.wheelName = "A" + axleNo + "-" + "T" + wheelNo;
          }
          wheels.push(wheel);
        }
      }
    }
    wheels.sort((a, b) => (a.wheelId > b.wheelId ? 1 : -1));
    unitSensorValues[i].wheels = getWheelsSensorMetrics(
      unitSensorValues[i],
      e6SensorValues,
      wheels
    );
  }

  return unitSensorValues;
}

function getWheelsSensorMetrics(unitSensorValues, e6SensorValues, wheels) {
  for (let w = 0; w < wheels.length; w++) {
    for (let property in e6SensorValues) {
      let axleNo = property.substring(1, 2);
      let wheelNo = property.substring(2, 3);
      if (
        unitSensorValues.axleId === parseInt(axleNo) &&
        wheels[w].wheelId === parseInt(wheelNo)
      ) {
        wheels[w].sensorId = "S1234567";
        wheels[w].tyreId = "T12345";
        if (property.includes("pressure")) {
          wheels[w].pressureValue = parseFloat(
            (e6SensorValues[property] * 0.0689475729).toFixed(2)
          );
        }
        wheels[w].minPressureValue = 4.5;
        wheels[w].maxPressureValue = 9.5;
        if (property.includes("temp")) {
          wheels[w].temperatureValue = e6SensorValues[property];
        }
        wheels[w].maxTemperatureValue = 85;
        if (property.includes("volt")) {
          wheels[w].voltageValue = e6SensorValues[property];
        }
        wheels[w].minVoltageValue = 3.1;
      }
    }
  }

  return wheels;
}

function wheelIdExists(wheels, wheelId) {
  for (let i = 0; i < wheels.length; ++i) {
    if (wheels[i].wheelId === wheelId) {
      return true;
    }
  }
}
