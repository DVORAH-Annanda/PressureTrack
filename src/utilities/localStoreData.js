//    /* Psalm 127:1-2 */
//    As YHWH die huis nie bou nie, tevergeefs werk die wat daaraan bou;
//    as YHWH die stad nie bewaar nie, tevergeefs waak die wagter.
//    Tevergeefs dat julle vroeg opstaan, laat opbly, brood van smarte eet —
//    net so goed gee Hy dit aan sy beminde in die slaap!

import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const getLocalStorageData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if(data){
    console.log("getLocalStorageData js storedSelectedUnits no parse" + data)
    console.log("getLocalStorageData js storedSelectedUnits " + JSON.parse(data))
    return data;
  } else { return []}
  } catch (error) {
    console.log(error);
  }
};


  const clearAllLocalStorageData = () => {
  console.log("clearAllLocalStorgeData");
  AsyncStorage.getAllKeys()
    .then((keys) => AsyncStorage.multiRemove(keys));
}

export { storeData, getLocalStorageData, clearAllLocalStorageData };

