import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ColorPropType,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; //person-add person-remove
import { signIn } from "../actions/userActions";
import {
  listUnits,
  addSelectedUnit,
  removeSelectedUnit,
} from "../actions/unitActions";
import { storeData, removeStoredData } from "../utilities/localStoreData";


import colors from "../styles/colors";

const UnitList = ({ navigation, route }) => {
  //const logoutHandler = () => dispatch(setLogout())

  //const [eId, seteId] = useState([]);
  //const userSignIn = useSelector((state) => state.userSignIn);
  //const { userInfo } = userSignIn;
  //console.log(`userInfo&& ${JSON.stringify(userInfo)}`);
  //if(userInfo && userInfo.length > 0){
  //  seteId(userInfo[0].eId)
  //  console.log(`userInfo&& eid ${JSON.stringify(eId)}`);
  //}
  //console.log(`userInfo&& ${JSON.stringify(userInfo)}`)

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const unitList = useSelector((state) => state.unitList);
  const { loading, error, units, selectedUnits } = unitList;

  const dispatch = useDispatch();
  //if(!loading && !units){
  //  const userInfoRemoved = removeStoredData("userInfo");
  //  if(userInfoRemoved){
  //    dispatch(signIn([]));
  //  useCallback(
  //    () => navigation.navigate("SignIn"),
  //    [navigation]
  //  );
  //  console.log("haloooo")
  //  }
  //}

  useEffect(() => {
    dispatch(signIn(userInfo));
    dispatch(listUnits());
  }, [dispatch, signIn, listUnits]);

  const addToSelectedUnits = (unit) => dispatch(addSelectedUnit(unit));

  const handleAddSelectedUnit = async (unit) => {
    addToSelectedUnits(unit);

    selectedUnits.push(unit);
    storeData("selectedUnits", JSON.stringify(selectedUnits));
  };

  const removeFromSelectedUnits = (unit) => dispatch(removeSelectedUnit(unit));
  const handleRemoveSelectedUnit = (unit) => {
    removeFromSelectedUnits(unit);
  };

  const exists = (unit) => {
    if (selectedUnits.filter((item) => item.id === unit.id).length > 0) {
      return true;
    }
    return false;
  };
//onPress={() => navigation.navigate("SensorValues", { item: item })}, 
  const renderItem = ({ item }) => {
    console.log("name: " + item.nm + " id: " + item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.45}
        onPress={() => navigation.navigate("WheelsDiagram", { title: item.nm, item: item })}
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
    <View style={styles.page} >
      {loading && <Text>loading...</Text>}
      {units && (
        <FlatList
          data={units}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

//name={exists(item) ? 'favorite' : 'favorite-outline'}
//onPress={() => exists(item) ? handleRemoveSelectedUnit(item) : handleAddSelectedUnit(item)}
//<Button color={colors.primary} title="Log Out" onPress={() => logoutHandler()} />

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
