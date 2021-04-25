import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import SignUpLoginFormContainer from "../components/SignUpLoginFormContainer";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../gql/mutation";

const Layout = styled.div`
  text-align: center;
  margin-top: 25px;
`;

const pageTitle = "Sign Up";

const SignUp = (props) => {
  useEffect(() => {
    document.title = "Sign Up";
  });

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: () => {
      props.history.push("/signin");
    },
  });

  return (
    <Layout>
      <h1>{pageTitle}</h1>
      <SignUpLoginFormContainer
        buttonText="Sign Up"
        formType="signup"
        requestTrigger={signUp}
      />
    </Layout>
  );
};

export default SignUp;
