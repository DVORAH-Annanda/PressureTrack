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
  UNIT_SELECTED,
  ADD_SELECTED_UNIT,
  REMOVE_SELECTED_UNIT,
  CLEAR_UNITS_USER_SIGNOUT,
  CLEAR_UNIT_SENSORVALUES_SIGNOUT,
} from "../constants/unitConstants";

import { getSessionId } from "../utilities/authenticationHandler";

import { getLocalStorageData } from "../utilities/localStoreData";

import { isObjectEmpty, convertUnixDateTime } from "../utilities/general";

export const listUnits = () => async (dispatch, getState) => {
  dispatch({
    type: UNIT_LIST_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    if (!isObjectEmpty(userInfo.eId)) {
      console.log(
        `listUnits UNIT_LIST_SUCCESS userInfo ${JSON.stringify(userInfo.eId)}`
      );
      const fetchurl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}&sid=' +
        userInfo.eId;
      const { data } = await Axios.get(fetchurl);
      if(data){
      dispatch({
        type: UNIT_LIST_SUCCESS,
        payload: data.items,
      });
    }else{
      console.log(`UNSUCCESSFUL - fetch Units from Wailon API`)
    }
    }
  } catch (error) {
    dispatch({
      type: UNIT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listUserUnits = (selectedUnits) => async (dispatch) => {
  dispatch({
    type: USER_UNIT_LIST_REQUEST,
  });
  try {
    // const data = await getLocalStorageData("selectedUnits");
    // if (isObjectEmpty(data)) {
    //   dispatch({
    //     type: USER_UNIT_LIST_SUCCESS,
    //     payload: [],
    //   });
    // } else {
    //   dispatch({
    //     type: USER_UNIT_LIST_SUCCESS,
    //     payload: JSON.parse(data),
    //   });
    // }
    console.log(
      `listUserUnits USER_UNIT_LIST_SUCCESS selectedUnits ${selectedUnits}`
    );
    dispatch({ type: USER_UNIT_LIST_SUCCESS, payload: selectedUnits });
  } catch (error) {
    dispatch({
      type: USER_UNIT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const selectUnit = (isSelected, unit) => (dispatch) => {
  console.log(`selectUnit UNIT_SELECTED unit ${JSON.stringify(unit)}`);
  dispatch({
    type: UNIT_SELECTED,
    payload: { unitIsSelected: isSelected, selectedUnit: unit },
  });
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

// async function getNotifications(url) {
//   return await Axios.get(url)
//     .then((response) => {
//       return response.data.items;
//     })
//     .catch((error) => {
//       console.log(`Get Notifications - API ERROR ${error}`);
//       return "Get Notifications - API ERROR";
//     });
// }

export const unitSensorValues = (unitId) => async (dispatch, getState) => {
  let storedUnits = await getLocalStorageData("unitList");
  storedUnits = storedUnits ? JSON.parse(storedUnits).units : null;

  let storedUserInfo = await getLocalStorageData("userInfo");
  storedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  dispatch({ type: UNIT_SENSORVALUES_REQUEST, payload: unitId });

  const {
    userSignIn: { userInfo },
  } = getState();

  const {
    unitList: { units },
  } = getState();

  const isUnitsExist = units && !isObjectEmpty(units) ? true : false;
  const isUserInfoExist =
    userInfo && !isObjectEmpty(userInfo) ? true : false;

  try {

      let _units = isUnitsExist ? units : storedUnits;
      let _userInfo = isUserInfoExist ? userInfo : storedUserInfo;

      let unitTrailersSensorValues = [];
      let dateUpdated = "";
      let timeUpdated = "";

      let unitWithTrailers = [];

      let unit = {};
      unit.unitId = unitId;
      unit.orderId = 0;
      unitWithTrailers.push(unit);

      unit = {};
      let linkedTrailerUnitId = 0;
      const linkedTrailersUrl = `https://hst-api.wialon.com/wialon/ajax.html?svc=resource/get_unit_trailers&params={"unitId":${unitId}}&sid=${_userInfo.eId}`;
      const { data: trailerData } = await Axios.get(linkedTrailersUrl);
      let linkedTrailer = "";
      if (!isObjectEmpty(trailerData)) {
        const linkedTrailerData = trailerData["22520915"];
        linkedTrailer = linkedTrailerData[0].nm;
        for (let u = 0; u < _units.length; u++) {
          if (_units[u].nm === linkedTrailer) {
            linkedTrailerUnitId = _units[u].id;
            break;
          }
        }
        unit.unitId = linkedTrailerUnitId;
        unit.orderId = 1;
        unitWithTrailers.push(unit);
      }

      const notificationsUrl =
        `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_resource","propName":"notifications","propValueMask":"*","sortType":"notifications","propType":"propitemname"},"force":1,"flags":1025,"from":0,"to":1}&sid=` +
        _userInfo.eId;
      const { data: notificationData } = await Axios.get(notificationsUrl);
      let notifications = notificationData.items;

      for (let uwt = 0; uwt < unitWithTrailers.length; uwt++) {
        let unit = {};
        unitId = unitWithTrailers[uwt].unitId;
        unit.unitId = unitId;
        unit.orderId = unitWithTrailers[uwt].orderId;

        for (let u = 0; u < _units.length; u++) {
          if (unit.unitId === _units[u].id) {
            unit.unitName = _units[u].nm;
            break;
          }
        }

        let sensors = {};
        let sensorValues = [];

        const sensorsUrl = `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_item&params={"id":${unitId},"flags":4096}&sid=${_userInfo.eId}`;
        const timeTo = Math.floor(Date.now() / 1000);
        const timeFrom = timeTo - 3600;
        const sensorValuesUrl =
          'https://hst-api.wialon.com/wialon/ajax.html?svc=messages/load_interval&params={"itemId":' +
          unitId +
          ',"timeFrom":' +
          timeFrom +
          ',"timeTo":' +
          timeTo +
          ',"flags":1,"flagsMask":65281,"loadCount":1800}&sid=' +
          _userInfo.eId;

        console.log(`unitActions unitSensorValues sensorsUrl ${sensorsUrl} unitId ${unitId}`);
        console.log(
          `unitActions unitSensorValues sensorValuesUrl ${sensorValuesUrl} unitId ${unitId}`
        );

        let endpoints = [sensorsUrl, sensorValuesUrl];
        Promise.all(endpoints.map((endpoint) => Axios.get(endpoint)))
          .then(([{ data: sensorData }, { data: sensorValuesData }]) => {
            sensors = Object.assign(sensors, sensorData.item.sens);
            if (unitWithTrailers[uwt].orderId === 0) {
              const dateTimeUpdated = getDateTimeUpdated(sensorValuesData);

              timeUpdated = dateTimeUpdated.slice(-9);
              dateUpdated = dateTimeUpdated.slice(
                0,
                dateTimeUpdated.length - 9
              );
            }

            if (sensorValuesData && !isObjectEmpty(sensorValuesData) && sensors &&
            !isObjectEmpty(sensors) &&
            notifications &&
            !isObjectEmpty(notifications)) {
              const e6SensorValues = getE6SensorValues(sensorValuesData);
                sensorValues = getWheels(
                  getAxles(unit.unitId, sensors, notifications),
                  sensors,
                  e6SensorValues
                );
                unit.sensorValues = sensorValues;
                unitTrailersSensorValues.push(unit);
                unitTrailersSensorValues.sort((a, b) => a.orderId - b.orderId);
                dispatch({
                  type: UNIT_SENSORVALUES_SUCCESS,
                  payload: {
                    unitTrailersSensorValues: unitTrailersSensorValues,
                    dateUpdated: dateUpdated,
                    timeUpdated: timeUpdated,
                  },
                });
                console.log(
                  `NA dsipatch SENSOR VALUES WITH TRAILER ${JSON.stringify(
                    unitTrailersSensorValues
                  )} timeUpdated ${timeUpdated}`
                );
            } 
          })
          .catch(function (err) {
            console.log("catch__error", err);
          });
      }
  } catch (error) {
    dispatch({
      type: UNIT_SENSORVALUES_FAIL,
      payload: error.message,
    });
  }
};

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

function getDateTimeUpdated(sensorValues) {
  let dateTimeUpdated = 0;
  let lastUpdated = 0;

  for (let i = 0; i < sensorValues.messages.length; i++) {
    if (sensorValues.messages[i].p.data_type === "E6") {
      lastUpdated = sensorValues.messages[i].rt;
      if (dateTimeUpdated < lastUpdated) dateTimeUpdated = lastUpdated;
    }
  }
  if (dateTimeUpdated === 0) return "---";
  else return convertUnixDateTime(dateTimeUpdated);
}

function getAxles(unitId, sensors, notifications) {
  let keyNames = Object.keys(sensors);
  let axles = [];
  for (let key = 0; key < keyNames.length; key++) {
    if (sensors[keyNames[key]].m === "bar") {
      let axleNo = sensors[keyNames[key]].n.substring(1, 2);
      if (!axleIdExists(axles, parseInt(axleNo))) {
        let axle = {};
        let axleMetrics = getAxleMetrics(unitId, axleNo, notifications);
        axle.axleId = parseInt(axleNo);
        axleMetrics.minPressureValue
          ? (axle.minPressureValue = axleMetrics.minPressureValue)
          : (axle.minPressureValue = 1.0);
        axleMetrics.maxPressureValue
          ? (axle.maxPressureValue = axleMetrics.maxPressureValue)
          : (axle.maxPressureValue = 12.0);
        axleMetrics.maxTemperatureValue
          ? (axle.maxTemperatureValue = axleMetrics.maxTemperatureValue)
          : (axle.maxTemperatureValue = 85);
        axleMetrics.minVoltageValue
          ? (axle.minVoltageValue = axleMetrics.minVoltageValue)
          : (axle.minVoltageValue = 3.1);

        axles.push(axle);
      }
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

function getAxleMetrics(unitId, axleNo, notifications) {
  let axleMetrics = {};
  let pressureMetric = false;
  let temperatureMetric = false;
  let voltageMetric = false;

  let keyNames = Object.keys(notifications[0].unf);

  for (let key = 0; key < keyNames.length; key++) {
    if (pressureMetric && temperatureMetric && voltageMetric) break;

    if (notifications[0].unf[keyNames[key]].un[0] === unitId) {
      if (
        axleNo === notifications[0].unf[keyNames[key]].n.slice(-10).slice(0, 1)
      ) {
        const metric = notifications[0].unf[keyNames[key]].n
          .slice(-11)
          .slice(0, 1);
        switch (metric) {
          case "P":
            axleMetrics.minPressureValue = parseFloat(
              notifications[0].unf[keyNames[key]].trg_p.lower_bound
            );
            axleMetrics.maxPressureValue = parseFloat(
              notifications[0].unf[keyNames[key]].trg_p.upper_bound
            );
            pressureMetric = true;
            break;
          case "T":
            axleMetrics.maxTemperatureValue = parseFloat(
              notifications[0].unf[keyNames[key]].trg_p.upper_bound
            );
            temperatureMetric = true;
            break;
          case "V":
            axleMetrics.minVoltageValue = parseFloat(
              notifications[0].unf[keyNames[key]].trg_p.lower_bound
            );
            voltageMetric = true;
            break;
        }
      }
    }
  }
  return axleMetrics;
}

function getWheels(unitSensorValues, sensors, e6SensorValues) {
  let keyNames = Object.keys(sensors);
  for (let i = 0; i < unitSensorValues.length; i++) {
    let wheels = [];
    for (let key = 0; key < keyNames.length; key++) {
      if (sensors[keyNames[key]].m === "bar") {
        let axleNo = sensors[keyNames[key]].n.slice(1, 2);
        let wheelNo = sensors[keyNames[key]].n.slice(2, 3);

        if (unitSensorValues[i].axleId === parseInt(axleNo)) {
          let wheel = {};
          wheel.wheelId = parseInt(wheelNo);
          if (axleNo === "9") {
            wheel.wheelName = "Spare " + wheelNo;
          } else {
            wheel.wheelName = "A" + axleNo + "-" + "T" + wheelNo;
          }
          wheel.sensorId = sensors[keyNames[key]].n.slice(-8);
          wheel.tyreId = sensors[keyNames[key]].d;
          wheel.minPressureValue = unitSensorValues[i].minPressureValue;
          wheel.maxPressureValue = unitSensorValues[i].maxPressureValue;
          wheel.maxTemperatureValue = unitSensorValues[i].maxTemperatureValue;
          wheel.minVoltageValue = unitSensorValues[i].minVoltageValue;
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
            (e6SensorValues[property] * 0.0689475729).toFixed(1)
          );
        }

        if (property.includes("temp")) {
          wheels[w].temperatureValue = e6SensorValues[property];
        }
        if (property.includes("volt")) {
          wheels[w].voltageValue = e6SensorValues[property];
        }
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

export const clearStorageUnits = () => (dispatch) => {
  dispatch({
    type: CLEAR_UNITS_USER_SIGNOUT,
    payload: {
      unitTrailersSensorValues: [],
      dateUpdated: "",
      timeUpdated: "",
    },
  });
};

export const clearStorageSensorValues = () => (dispatch) => {
  dispatch({
    type: CLEAR_UNIT_SENSORVALUES_SIGNOUT,
    payload: [],
  });
};
