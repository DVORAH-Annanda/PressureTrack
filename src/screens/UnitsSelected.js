import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {removeSelectedUnit } from "../actions/unitActions";

import colors from "../styles/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { storeData } from '../utilities/localData';

const UnitsSelected = ({ navigation }) => {
  
  const unitList = useSelector((state) => state.unitList);
  const { selectedUnits } = unitList;

  console.log("UnitsSelected-unitList!!! " + JSON.stringify(unitList))
  console.log("UnitsSelected-selectedUnits!!! " + JSON.stringify(selectedUnits))
 

  const dispatch = useDispatch();

  const removeFromSelectedUnits = (unit) => dispatch(removeSelectedUnit(unit));
  const handleRemoveSelectedUnit = (unit) => {
    //var newArray = myArray.filter((item) => item.id !== 1);
    const selectedUnitsReduced = selectedUnits.filter(
      (item) => unit.id !== item.id
    );
    storeData('selectedUnits', JSON.stringify(selectedUnitsReduced)); 
    removeFromSelectedUnits(unit);
  };
  //onPress={() => navigation.navigate("SensorValues", { item: item })}
  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1}}>
        {selectedUnits.length === 0 ? (
          <Text style={{ marginLeft: 10, color: colors.gray, fontSize: 18 }}>
            No units selected.
          </Text>
        ) : (
          <FlatList
            data={selectedUnits}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (               
                <TouchableOpacity
                activeOpacity={0.45}
                onPress={() => navigation.navigate("SensorValues", { item: item })}
              >

                    <View style={styles.listItem}>
                      
                        <Text style={{ marginLeft: 10, fontSize: 18}}>
                          {item.nm}
                        </Text>
                      
                      
                        <TouchableOpacity
                          onPress={() => handleRemoveSelectedUnit(item)}
                          
                          style={{
                            marginRight: 10,
                            padding: 2.5,
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 35,
                            width: 35,
                          }}
                        >
                          <MaterialIcons
                            color={colors.gray}
                            size={24}
                            name="person-remove"
                          />
                        </TouchableOpacity>
                     
                    </View>
                    </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 2.5,
    padding: 10,
    backgroundColor: colors.lightGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UnitsSelected;
