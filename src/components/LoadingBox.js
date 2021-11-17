import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

const UnitItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={props.onShowUnitDiagram.bind(this, props)}>
      <View style={styles.listItem} >
        <Text>{props.unitName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2.5,
    padding: 10,
    backgroundColor: "whiteSmoke",
  },
});

//<View style={styles.listItem} on>

export default UnitItem;