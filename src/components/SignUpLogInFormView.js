import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const propTypes = {
  requestTrigger: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValues: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 150px;
  font-size: 18px;
`;

const SignUpLogInFormView = ({
  requestTrigger,
  onChange,
  inputValues,
  formType,
  buttonText,
}) => {
  return (
    <form
      id="SignUpLogInForm"
      onSubmit={(e) => {
        e.preventDefault();

        requestTrigger({
          variables: {
            ...inputValues,
          },
        });
      }}
    >
      <div>
        <label htmlFor="username">Username: </label>
        <Input
          value={inputValues.username ?? ""}
          id="username"
          name="username"
          type="text"
          onChange={onChange}
          required
        />
      </div>

      {formType === "signup" && (
        <div>
          <label htmlFor="email">Email: </label>
          <Input
            value={inputValues.email ?? ""}
            id="email"
            name="email"
            type="email"
            onChange={onChange}
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="password">Password: </label>
        <Input
          value={inputValues.password ?? ""}
          id="password"
          name="password"
          type="password"
          onChange={onChange}
          required
        />
      </div>

      <Button id="submitButton" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

SignUpLogInFormView.propTypes = propTypes;

export default SignUpLogInFormView;
