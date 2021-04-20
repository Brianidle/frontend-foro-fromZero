import React from "react";
import { BACKEND_API_URI } from "../constantVariables";
import { getBrowserCookiesInJSON } from "../helpers/cookieHelper";

class Auth {
  isAuthenticated() {
    let jsonCookies = getBrowserCookiesInJSON();
    
    console.log(jsonCookies);

    if (jsonCookies.user_session) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    fetch(BACKEND_API_URI + "/logout", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      credentials: "include", // omit, include
    });
  }
}

export default new Auth();
