import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SignUpLoginFormContainer from "../components/SignUpLoginFormContainer";

import { connect } from "react-redux";
import { doChangueToken } from "../actions/actionCreators";
import { BACKEND_API_URI } from "../constantVariables";

const Layout = styled.div`
  text-align: center;
  margin-top: 25px;
`;

const pageTitle = "Sign In";

const SignIn = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = pageTitle;
  });

  const signIn = ({
    variables: {
      username, password
    },
  }) => {
    fetch(BACKEND_API_URI + "/signin", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password
      })
    }).then(response =>
      response.text()).then((logInMessage) => {

        if (logInMessage == "Unauthorized User") {
          setErrorMessage("Invalid Username or Password");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000)
        } else if (logInMessage == "Authorized User") {

          props.changueTokenState("Autorizado");
          props.history.push("/");
        }
      });
  }

  return (
    <Layout>
      <h1>{pageTitle}</h1>
      <SignUpLoginFormContainer buttonText="Sign In" requestTrigger={signIn} />
      {errorMessage && (
        <div>
          <p>
            {errorMessage}
          </p>
        </div>)
      }
    </Layout>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    changueTokenState: (token) => dispatch(doChangueToken(token)),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
