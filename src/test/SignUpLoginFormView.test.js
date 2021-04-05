import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

import SignUpLogInFormView from "../components/SignUpLogInFormView";

var useStateValue;

const createContainer = () => {
  const container = document.createElement("div");
  return {
    render: (component) => ReactDOM.render(component, container),
    container,
  };
};

const setValue = (obj) => {
  useStateValue = obj;
};

const onChange = (event) => {
  setValue({ ...useStateValue, [event.target.name]: event.target.value });
};

describe("input elements rendering", () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (idForm) => container.querySelector(`form[id="${idForm}"]`);

  const field = (nameOfTheElement) => {
    return form("SignUpLogInForm").elements[nameOfTheElement];
  };

  const expectToBeInputField = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
  };

  const expectToBeInputFieldAndType = (formElement, inputType) => {
    expectToBeInputField(formElement);
    expect(formElement.type).toEqual(inputType);
  };

  it("the component renders with the required arguments", () => {
    setValue({});

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={onChange}
        inputValues={useStateValue}
        buttonText="Log In"
      />
    );
  });

  it("all the input elements renders as needed", () => {
    //ARRANGE
    //Reset of the simulated react state value
    setValue({});

    //ARRANGE and ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={onChange}
        inputValues={useStateValue}
        buttonText="Log In"
        formType="signup"
      />
    );

    //ASSERT
    expectToBeInputFieldAndType(field("username"), "text");
    expectToBeInputFieldAndType(field("email"), "email");
    expectToBeInputFieldAndType(field("password"), "password");
  });

  it("only the email input element does not render if the component does not receive the formType argument", () => {
    //ARRANGE
    //Reset of the simulated react state value
    setValue({});

    //ARRANGE and ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={onChange}
        inputValues={useStateValue}
        buttonText="Log In"
      />
    );

    //ASSERT
    expectToBeInputFieldAndType(field("username"), "text");
    expectToBeInputFieldAndType(field("password"), "password");
    expect(field("email")).toBeUndefined();
  });

  it("input elements values and simulated react state, changes when user write on the input elements", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Log In"
        formType="signup"
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("username"), {
      target: { value: "Jamie", name: "username" },
    });

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "email@email.com", name: "email" },
    });

    ReactTestUtils.Simulate.change(field("password"), {
      target: { value: "passwordTest", name: "password" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Log In"
        formType="signup"
      />
    );

    //ASSERT
    expect(field("username").value).toEqual("Jamie");
    expect(field("password").value).toEqual("passwordTest");
    expect(field("email").value).toEqual("email@email.com");
  });

  it("onSubmit function is not possible to be called if the value of the username is undefined", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("username"), {
      target: { value: "", name: "username" },
    });

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "email@email.com", name: "email" },
    });

    ReactTestUtils.Simulate.change(field("password"), {
      target: { value: "passwordTest", name: "password" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    //There are two problems when you want to click the submit button of your form
    //so the onSubmit funcion execute or not depending if the require input fields have a value
    //First: ReactTestUtils.Simulate.click(formButton) never call the onSubmit function of the form
    //Second: ReactTestUtils.Simulate.submit(formButton) always execute the onSubmit function of the form no matter if the require input fields have a value
    //One day i hope its possible to solve this
    
    expect(form("SignUpLogInForm").checkValidity()).toBe(false);
  });

  it("onSubmit function is not possible to be called if the value of the password is undefined", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("username"), {
      target: { value: "Jamie", name: "username" },
    });

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "email@email.com", name: "email" },
    });

    ReactTestUtils.Simulate.change(field("password"), {
      target: { value: "", name: "password" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    expect(form("SignUpLogInForm").checkValidity()).toBe(false);
  });

  it("onSubmit function is not possible to be called if the value of the email is undefined or doesnt have the structure of an email", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("username"), {
      target: { value: "Jamie", name: "username" },
    });

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "", name: "email" },
    });

    ReactTestUtils.Simulate.change(field("password"), {
      target: { value: "passwordTest", name: "password" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    expect(form("SignUpLogInForm").checkValidity()).toBe(false);

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "email@", name: "email" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Sign Up"
        formType="signup"
      />
    );

    expect(form("SignUpLogInForm").checkValidity()).toBe(false);
  });

  it("it is possible call the onSubmit function if the input of the form pass their own validations", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Log In"
        formType="signup"
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("username"), {
      target: { value: "Jamie", name: "username" },
    });

    ReactTestUtils.Simulate.change(field("email"), {
      target: { value: "email@email.com", name: "email" },
    });

    ReactTestUtils.Simulate.change(field("password"), {
      target: { value: "passwordTest", name: "password" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <SignUpLogInFormView
        requestTrigger={() => console.log("test")}
        onChange={(e) => onChange(e)}
        inputValues={useStateValue}
        buttonText="Log In"
        formType="signup"
      />
    );

    expect(form("SignUpLogInForm").checkValidity()).toBe(true)
  });
});
