import axios from "axios";
import { decodeToken } from "react-jwt";
import { getApiUrl } from "../properties/Properties.js";

const API_URL = getApiUrl();

class AuthService {

  isAuthenticated() {

    let isExpiredToken = this.tokenIsExpired();
    if (isExpiredToken) {
      this.logout();
    }

    let jwttoken = this.getCurrentToken();
    return jwttoken != undefined && jwttoken != null;
  };
  
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.jwttoken) {
          window.localStorage.setItem("jwttoken", JSON.stringify(response.data));
          window.localStorage.setItem("username", username);

        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("username");
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
  getCurrentToken() {
    
    let jwttoken = undefined;

    let tokenObject = JSON.parse(localStorage.getItem("jwttoken"));

    if (tokenObject) {
      jwttoken = tokenObject.jwttoken;
    }
    
    return jwttoken;
  }

  decodeJWTToken() {

    const token = this.getCurrentToken();

    if (token != undefined) {
        const myDecodedToken = decodeToken(token);

        return myDecodedToken;
    }
    else {
        return undefined;
    }

    
  }

  tokenIsExpired() {

    let isExpired = true;

    let token = this.decodeJWTToken();
    
    if (token && token.exp*1000 >= new Date()) {
      isExpired = false;
    }

    return isExpired;
  }

}

export default new AuthService();
