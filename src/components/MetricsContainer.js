import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View, Text} from 'react-native'

import colors from '../styles/colors'

const MetricsContainer = (props) => {
    return (
        <View style={styles.container}>
        <View style={ styles.metric }>{props.children}</View>
        </View>
      );
}

const styles = StyleSheet.create({
container: {
    flex: 2,
    width: '100%',    
    backgroundColor: colors.white,
   
    alignItems: 'center',
    justifyContent: 'center',
},
metric: {
    width: '100%', 
     

   

},
});
//marginTop : 1,
//marginBottom: Platform.OS === 'ios' ? 35 : 1,

export default MetricsContainer;