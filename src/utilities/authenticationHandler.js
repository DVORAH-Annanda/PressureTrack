import {authorize, refresh} from 'expo-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthenticationHandler {

  async getToken(url) {
    if (url.includes("access_token=")) {
      let tokenIndex = url.indexOf("access_token=");
  
      let urlParams = url.split("&");
      let token = urlParams[1].replace("access_token=", "");
      if (token) {
        // Save token for native requests & move to the next screen
        //setAccessToken(token);
        
        console.log("token: " + token);
        const wialonurl = 'https://hst-api.wialon.com/wialon/ajax.html';
        const wialonapi = wialonurl + '?svc=token/login&params={"token":"' + token + '"}'
  
        let response = await fetch(wialonapi);
        let result = await response.json();
        //console.log(JSON.stringify(result));
        //let sessionId = "";
        //if (result.eid !== "")
          //sessionId = result.eid;
          

        console.log("sessionID: " + result.eid);
        return result.eid;
      }
      
    } else {
      //Alert.alert("Authorization failed!");
      return;
    }
  }

   async getStoredToken () {
    try {
      const value = await AsyncStorage.getItem("eid")
      if(value !== null) {
        return value;
      }
    } catch(e) {
      console.log("Session expired!")
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
    if (body.eid !== "")
      eid = body.eid;
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