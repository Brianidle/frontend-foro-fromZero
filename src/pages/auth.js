import React from "react";

class Auth {
  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Auth();
