import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  listUnits,
  selectUnit,
  addSelectedUnit,
  removeSelectedUnit,
} from "../actions/unitActions";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";

import { storeData } from "../utilities/localStoreData";

const UnitList = ({ navigation }) => {

  const userDetails = useSelector((state) => state.userSignIn);
  const { userInfo } = userDetails;

  const unitList = useSelector((state) => state.unitList);
  const { loading, error, units, selectedUnits } = unitList;

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
         dispatch(listUnits());
    }, [dispatch, listUnits])
  );

  const addToSelectedUnits = (unit) => dispatch(addSelectedUnit(unit));

  const handleAddSelectedUnit = async (unit) => {
    addToSelectedUnits(unit);

    selectedUnits.push(unit);
    dispatch(listUserUnits(selectedUnits));
  };

  const removeFromSelectedUnits = (unit) => dispatch(removeSelectedUnit(unit));
  const handleRemoveSelectedUnit = (unit) => {
    removeFromSelectedUnits(unit);
  };

  const handleSelectedUnit = (unit) => {
    dispatch(selectUnit(true, unit));
  };

  const exists = (unit) => {
    if (selectedUnits.filter((item) => item.id === unit.id).length > 0) {
      return true;
    }
    return false;
  };

  const renderItem = ({ item }) => {
    console.log("name: " + item.nm + " id: " + item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.45}
        onPress={() => {
          handleSelectedUnit(item);
          storeData("isAssigned", "true");
          storeData("WheelsDiagram", JSON.stringify(item));
          storeData("unitList", JSON.stringify(unitList));
          storeData("userInfo", JSON.stringify(userInfo));
          navigation.navigate("WheelsDiagram", { title: item.nm, item: item });
        }}
      >
        <View style={styles.listItem}>
          <Text style={{ marginLeft: 10 }}>{item.nm}</Text>
          <TouchableOpacity
            onPress={() =>
              exists(item)
                ? handleRemoveSelectedUnit(item)
                : handleAddSelectedUnit(item)
            }
            style={{
              marginRight: 10,
              padding: 1.5,
              alignItems: "center",
              justifyContent: "center",
              height: 25,
              width: 25,
            }}
          >
            <MaterialIcons
              color={exists(item) ? colors.primary : colors.gray}
              size={exists(item) ? 24 : 18}
              name={exists(item) ? "person" : "person-add"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.page}>
      {loading && <Text>loading...</Text>}
      {units && (
        <FlatList
          data={units}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    marginVertical: 2.5,
    padding: 10,
    backgroundColor: colors.lightGray,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UnitList;
