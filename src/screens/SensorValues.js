import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { unitSensorValues } from "../actions/unitActions";

//import { setLogout } from '../../redux/ducks/user'

import colors from "../styles/colors";

import MetricsContainer from "../components/MetricsContainer";
import TextBox from "../components/TextBox";
import PressureBox from "../components/PressureBox";
import TemperatureBox from "../components/TemperatureBox";
import VoltageBox from "../components/VoltageBox";
import AxleContainer from "../components/AxleContainer";
//import LoadingBox from '../../components/LoadingBox'
//import MessageBox from '../../components/MessageBox'

const SensorValues = ({ navigation, route }) => {
  //const { route } = props;
  const { title, item } = route.params;
  const { id, nm } = item;

  const dispatch = useDispatch();
  //const unitId = item.id
  //console.log("UNIT ID: " + unitId)
  //const dispatch = useReduxDispatch()
  //const logoutHandler = () => dispatch(setLogout())
  //const { unitId } = route.params.item.id

  const [unitId, setUnitId] = useState(0);
  const [axleSensorValues, setAxleSensorValues] = useState([]);

  const sensorValueProps = useSelector((state) => state.unitSensorValues);
  const { loading, error, sensorValues } = sensorValueProps;

  if(!loading){

    console.log(`sensorValues screen ${JSON.stringify(sensorValues)} what is loading ${loading}`)
  }

  useEffect(() => {
    console.log(`sensorValues screen useEffect unit id ${id}`)
    dispatch(unitSensorValues(id));
  }, [dispatch, unitSensorValues, id]);

  return (
      <View style={styles.page}>
        {loading ? (
          <Text>loading...</Text>
        ) : (
          //<View>
          //  <Text>{sensorValues[0].name}</Text>
          //
          //</View>

          <ScrollView>
            {sensorValues.map((axle) => {
              return (
                <AxleContainer style={styles.axle} key={axle.axleId}>
                  {axle.wheels.map((wheel) => {
                    return (
                      <MetricsContainer style={styles.wheel}  key={wheel.wheelId}>
                        <TextBox style={styles.tyreName}>
                          {wheel.wheelName}
                        </TextBox>

                        <PressureBox>{wheel}</PressureBox>
                        <TemperatureBox>{wheel}</TemperatureBox>
                      </MetricsContainer>
                    );
                  })}
                </AxleContainer>
              );
            })}
          </ScrollView>
        )}
        <View></View>
      </View>
  );
};

//{loading ? (
//  <LoadingBox></LoadingBox>
//  ) : error ? (
//  <MessageBox>{error}</MessageBox>
//  ) : (

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginLeft: 2.5,
    marginRight: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  axle: {    
    margin: 2.5,
    padding: 2.5,
    flexDirection: "row",
  },
  wheel: {    
    minWidth: 75,
  },
  tyreName: {
    backgroundColor: colors.tyreNameBg,
    alignItems: "center",
    justifyContent: "center",
  },
  sensorId: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SensorValues;

//<Text>{JSON.stringify(sensorValues)}</Text>
//<View></View>
//<Button
//  title="show"
//  color={colors.primary}
//  onPress={() => helper(sensorValues)}
///>
//
//<Button
//  title="back"
//  color={colors.primary}
//  onPress={() => navigation.goBack()}
///>
//<Button
//color={colors.primary}
//title="Wheels Diagram"
//onPress={() => navigation.navigate("WheelsDiagram")}
///>
//<Button
//color={colors.primary}
//title="Log Out"
//onPress={() => logoutHandler()}
///>
