import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

const ProtectedRouteForEdition = ({ component: Component, userAuthenticated, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userAuthenticated && sessionStorage.getItem("post")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  let userAuthenticated;

  if (state.tokenState) {
    userAuthenticated = true;
  } else {
    userAuthenticated = false;
  }

  return {
    userAuthenticated
  }
}

export default connect(mapStateToProps)(ProtectedRouteForEdition);
