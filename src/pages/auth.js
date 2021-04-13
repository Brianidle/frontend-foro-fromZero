import React from "react";

class Auth {
  isAuthenticated() {
    if (sessionStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Auth();
