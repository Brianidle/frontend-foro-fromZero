import React, { useState } from "react";
import SignUpLogInFormView from "./SignUpLogInFormView";

const GeneralForm = ({ buttonText, requestTrigger, formType }) => {
  const [inputValues, setValue] = useState({});

  const onChange = (event) => {
    setValue({ ...inputValues, [event.target.name]: event.target.value });
  };

  return (
    <SignUpLogInFormView
      buttonText={buttonText}
      requestTrigger={requestTrigger}
      onChange={onChange}
      formType={formType}
      inputValues={inputValues}
    />
  );
};

export default GeneralForm;
