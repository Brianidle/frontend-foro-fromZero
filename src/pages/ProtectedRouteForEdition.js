import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

// add the PrivateRoute component below our `Pages` component
const ProtectedRouteForEdition = ({ component: Component, ...rest }) => {
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated() && sessionStorage.getItem("post")) {
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

export default ProtectedRouteForEdition;
