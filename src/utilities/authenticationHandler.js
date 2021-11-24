import { authorize, refresh } from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getLocalStorageData,
  storeData,
  clearAllLocalStorageData,
} from "./localStoreData";
import { isObjectEmpty } from "./general";

class AuthenticationHandler {
  
  async getlocalStoreUserInfo() {
    //clearAllLocalStorageData();
    try {
      const data = await getLocalStorageData("userInfo");
      if (isObjectEmpty(data)) {
        return [];
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      return error.message;
    }
  }

  async getUserInfo(url) {
    //clearAllLocalStorageData();
    if (url.includes("svc_error=0")) {
      //if (url.includes("access_token=")) {

      let urlParams = url.split("&");
      let token = urlParams[1].replace("access_token=", "");
      let userInfo = [];
      let user = {};
      user.userName = urlParams[2].replace("user_name=", "");
      let data = await getLocalStorageData("userInfo");
      if (!isObjectEmpty(data)) {
        if (data.length === 0){
          //clearAllLocalStorageData();
        } else {
        let localStoreUser = JSON.parse(data);
        console.log(`localStoreUser!! ${JSON.stringify(localStoreUser)}`);
        user.userName = urlParams[2].replace("user_name=", "");
        let localStoreUserName = localStoreUser[0].userName;
        if (localStoreUserName.trim() !== user.userName.trim()) {
          clearAllLocalStorageData();
        }
        console.log(`userName!!! ${localStoreUserName}`);
      }
      }

      

      
      if (token) {
        const wialonurl = "https://hst-api.wialon.com/wialon/ajax.html";
        const wialonapi =
          wialonurl + '?svc=token/login&params={"token":"' + token + '"}';

        let response = await fetch(wialonapi);
        let result = await response.json();
        user.eId = result.eid;
        userInfo.push(user);
        storeData("userInfo", JSON.stringify(userInfo));
        console.log(`usrinfo!! ${JSON.stringify(userInfo)}`);
        return result.eid;
      }
    } else {
      //Alert.alert("Authorization failed!");
      return;
    }
  }

  async getStoredToken() {
    try {
      const value = await AsyncStorage.getItem("eid");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log("Session expired!");
    }
  }

  async storeToken(eid) {
    try {
      await AsyncStorage.setItem("eid", eid);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async fetchJSONAsync(url) {
    let response = await fetch(url);

    let body = await response.json();
    let eid = "";
    if (body.eid !== "") eid = body.eid;
    console.log(eid);
    return body;
  }

  async onLogin() {
    try {
      const result = await authorize(this.wialonAuthConfig);
      console.log("test2");
      alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.wialonAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}

const authenticationHandler = new AuthenticationHandler();

export default authenticationHandler;
