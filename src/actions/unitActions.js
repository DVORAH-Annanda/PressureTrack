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
  console.log(`listUnits userInfo%%% `);
  dispatch({
    type: UNIT_LIST_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();

  console.log(`listUnits userInfo%%% ${JSON.stringify(userInfo)}`);
  try {
    //const eidStored = {}; //await authenticationHandler.getStoredToken();
    if (!isObjectEmpty(userInfo[0].eId)) {
      console.log(`listUnits userInfo%%% ${JSON.stringify(userInfo[0].eId)}`);
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

async function getNotifications(url) {
  return await Axios.get(url)
    .then((response) => {
      return response.data.items;
    })
    .catch((error) => {
      console.log(`Get Notifications - API ERROR ${error}`);
      return "Get Notifications - API ERROR";
    });
}

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
    console.log(`unit ID ${unitId}`);
    if (!isObjectEmpty(userInfo[0].eId)) {
      const notificationsUrl =
        `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_resource","propName":"notifications","propValueMask":"*","sortType":"notifications","propType":"propitemname"},"force":1,"flags":1025,"from":0,"to":1}&sid=` +
        userInfo[0].eId;

      console.log(`notificationsUrl ${notificationsUrl}`);

      const notifications = await getNotifications(notificationsUrl);

      //const getSensorsUrl =
      //`https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"unit_sensors","propValueMask":"*","sortType":"unit_sensors","propType":"propitemname"},"force":1,"flags":4097,"from":0,"to":1}&sid=` +
      //userInfo[0].eId;

      //const getSensorsUrl =
      ///`https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"unit_sensors","propValueMask":"*","sortType":"unit_sensors","propType":"propitemname"},"force":1,"flags":4097,"from":0,"to":1}&sid=` +
      //userInfo[0].eId;

      const getSensorsUrl =
        `https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_item&params={"id":${unitId},"flags":4096}&sid=` +
        userInfo[0].eId;

      console.log(`getSensorsUrl ${getSensorsUrl}`);
      const getSensorsResponse = await Axios.get(getSensorsUrl);
      console.log(`sensorData ${JSON.stringify(getSensorsResponse.data)}`);
      const sensorData = getSensorsResponse.data
      let sensors = {};
      sensors = Object.assign(sensors, sensorData.item.sens);
      

      console.log(`sensors ${JSON.stringify(sensors)}`);

      const timeTo = Math.floor(Date.now() / 1000);
      const timeFrom = timeTo - 3600;
      const getSensorsValuesUrl =
        'https://hst-api.wialon.com/wialon/ajax.html?svc=messages/load_interval&params={"itemId":' +
        unitId +
        ',"timeFrom":' +
        timeFrom +
        ',"timeTo":' +
        timeTo +
        ',"flags":1,"flagsMask":65281,"loadCount":1800}&sid=' +
        userInfo[0].eId;
      const { data } = await Axios.get(getSensorsValuesUrl);

     

      let sensorValues = [];
      if (
        data &&
        !isObjectEmpty(data) &&
        notifications &&
        !isObjectEmpty(notifications)
      ) {
        const e6SensorValues = getE6SensorValues(data);
        console.log(`e6SensorValues ${JSON.stringify(e6SensorValues)}`);
        sensorValues = getWheels(
          getAxles(unitId, sensors, notifications),
          sensors,
          e6SensorValues
        );
      } else {
        if (!data) {
          console.log(`NO DATA`);
        }
        if (isObjectEmpty(data)) {
          console.log(`DATA IS EMPTY`);
        }
        if (!notifications) {
          console.log(`NO NOTIFICATIONS`);
        }
        if (isObjectEmpty(notifications)) {
          console.log(`NOTIFICATIONS IS EMPTY`);
        }
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

  console.log(`AXLES js ${JSON.stringify(axles)}`);
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

  console.log(
    `dvorah ${JSON.stringify(notifications)} unitid ${unitId} axleNo ${axleNo}`
  );

  //notifications = [{"userName":"10002","eId":"317a8ca4d3cd4564974cca1476437fa4"}];

  let keyNames = Object.keys(notifications[0].unf);
  console.log(`keyNames ${JSON.stringify(keyNames)}`);
  // const k = "1";
  // const temp = notifications[0].unf[k].un[0];
  // console.log(`UNITid & data[0].unf[key].un[0] & ${temp}`);

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
  console.log(`axleMetrics ${JSON.stringify(axleMetrics)}`);
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
              //if (!wheelIdExists(wheels, parseInt(wheelNo))) {
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
              //}
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
