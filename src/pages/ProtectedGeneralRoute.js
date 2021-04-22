import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// add the PrivateRoute component below our `Pages` component
const ProtectedGeneralRoute = ({ component: Component, userAuthenticated, ...rest }) => {
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
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
  console.log("userAuthenticated");
  console.log(userAuthenticated);
  return {
    userAuthenticated
  }
}

export default connect(mapStateToProps)(ProtectedGeneralRoute);
