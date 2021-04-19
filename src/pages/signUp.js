import React, { useEffect } from "react";
import styled from "styled-components";
import {connect} from 'react-redux';

import SignUpLoginFormContainer from "../components/SignUpLoginFormContainer";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../gql/mutation";

const Layout = styled.div`
  height: 100vh;
  text-align: center;
  margin-top: 25px;
`;

const SignUp = (props) => {
  useEffect(() => {
    document.title = "SignUp Page";
  });

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: () => {
      props.history.push("/signin");
    },
  });

  return (
    <Layout>
      <SignUpLoginFormContainer
        buttonText="Sign Up"
        formType="signup"
        requestTrigger={signUp}
      />
    </Layout>
  );
};

export default SignUp;
