import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SignUpLoginFormContainer from "../components/SignUpLoginFormContainer";

import { connect } from "react-redux";
import { doChangueToken } from "../actions/actionCreators";
import { BACKEND_API_URI } from "../constantVariables";

const Layout = styled.div`
  height: 100vh;
  text-align: center;
  margin-top: 25px;
`;

const SignIn = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    document.title = "SignIn Page";
  });

  return (
    <Layout>
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
