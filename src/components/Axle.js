import React from 'react';
import { StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const Wheel = (props) => {
    return (
        <View>
        <View style={styles.container}>{props.children}</View>
        </View>
      );
}

const styles = StyleSheet.create({
container: {
    flex: 1,  
    width: 45,  
    height: 10,  
    borderRadius: 8.5,
    backgroundColor: colors.axleBlue,
    alignItems: 'center',
    justifyContent: 'center',
},
});
//height: 95,
export default Wheel;