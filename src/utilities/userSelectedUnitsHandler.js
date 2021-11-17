//    /* Psalm 127:1-2 */
//    As YHWH die huis nie bou nie, tevergeefs werk die wat daaraan bou;
//    as YHWH die stad nie bewaar nie, tevergeefs waak die wagter.
//    Tevergeefs dat julle vroeg opstaan, laat opbly, brood van smarte eet —
//    net so goed gee Hy dit aan sy beminde in die slaap!

import AsyncStorage from "@react-native-async-storage/async-storage";

//class UserSelectedUnitsHandler {

//const AppHeader = ({navigation, route}) => {
//    const [user, setUser] = useState();
//    const [isLoading, setIsLoading] = useState(false);
//
//    useEffect(() => {
//      fetchUser();
//    }, [])
//
//    const fetchUser = async () => {
//      setIsLoading(true);
//      const userData = await _retrieveData('user');
//      setUser(userData);
//      setIsLoading(false);
//    }
//
//    if (isLoading) return <LoadingIndicator />
//    if (!!user) return <UserButton user={user} />
//    return <LoginButton />;
//  }   *** asyncstoragehandler
//import AsyncStorage from '@react-native-community/async-storage';
//
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
    console.log("getLocalStorageData js storedSelectedUnits no parse" + data)
    console.log("getLocalStorageData js storedSelectedUnits " + JSON.parse(data))
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { storeData, getLocalStorageData };

//    async getUserSelectedUnits()  {
//        try {
//          await AsyncStorage.clear();
//          const selectedUnits = await AsyncStorage.getItem('selectedUnits');
//          return JSON.parse(selectedUnits);
//        } catch(error) {
//          console.log('error', error);
//        };
//      };
//
//      async setUserSelectedUnits(selectedUnits) {
//        try {
//          await AsyncStorage.setItem('selectedUnits', JSON.parse(selectedUnits));
//        } catch(error) {
//          console.log('error', error);
//        };
//      };
//}

//const userSelectedUnitsHandler = new UserSelectedUnitsHandler();

//export default userSelectedUnitsHandler;
