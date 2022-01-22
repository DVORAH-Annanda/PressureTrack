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
    try {
      if (isObjectEmpty(data)) {
        return [];
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      return error.message;
    }
  }

  async getSignInUserInfo(url) {
    let userInfo = [];
    console.log(`getSignInUserInfo url ${url}`);
    const user = {};
    const urlParams = url.split("&");
    const token = urlParams[1].replace("access_token=", "");
    user.userName = urlParams[2].replace("user_name=", "");
    const wialonApi = "https://hst-api.wialon.com/wialon/ajax.html";
    const wialonUrl =
      wialonApi + '?svc=token/login&params={"token":"' + token + '"}';
    console.log(`getSignInUserInfo wialonurl ${wialonUrl}`);
    const response = await fetch(wialonUrl);
    const result = await response.json();
    user.eId = result.eid;
    console.log(`getSignInUserInfo user.eId ${user.eId}`);
    userInfo.push(user);
    console.log(`getSignInUserInfo usrInfo ${JSON.stringify(userInfo)}`);
    return userInfo;
  }

  async getUserInfo(url) {
    if (url.includes("svc_error=0")) {
      let urlParams = url.split("&");
      let token = urlParams[1].replace("access_token=", "");
      let userInfo = [];
      let user = {};
      user.userName = urlParams[2].replace("user_name=", "");
      let data = await getLocalStorageData("userInfo");
      if (!isObjectEmpty(data)) {
        if (data.length === 0) {
          //clearAllLocalStorageData();
        } else {
          let localStoreUser = JSON.parse(data);
          console.log(`getUserInfo localStoreUser ${JSON.stringify(localStoreUser)}`);
          user.userName = urlParams[2].replace("user_name=", "");
          let localStoreUserName = localStoreUser[0].userName;
          if (localStoreUserName.trim() !== user.userName.trim()) {
            clearAllLocalStorageData();
          }
          console.log(`getUserInfo localStoreUserName ${localStoreUserName}`);
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
        console.log(`getUserInfo userinfo ${JSON.stringify(userInfo)}`);
        return result.eid;
      }
    } else {
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
