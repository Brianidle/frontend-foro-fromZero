import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

import PostFormView from "../components/PostFormView";

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

describe("inputs rendering", () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (idForm) => container.querySelector(`form[id="${idForm}"]`);

  const field = (nameOfTheElement) =>
    form("EditAndCreationFormPost").elements[nameOfTheElement];

  const expectToBeInputField = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
  };

  it("the component renders with the required arguments", () => {
    setValue({});

    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );
  });

  it("the input elements renders", () => {
    //ARRANGE
    //Reset of the simulated react state value
    setValue("");

    //ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //ASSERT
    expectToBeInputField(field("title"));
    expectToBeInputField(field("content"));
    expectToBeInputField(field("urlImage"));
  });

  it("input elements values and simulated react state, changes when user write on the input elements", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("title"), {
      target: { value: "Jamie", name: "title" },
    });
    ReactTestUtils.Simulate.change(field("content"), {
      target: { value: "New way to test-Content", name: "content" },
    });
    ReactTestUtils.Simulate.change(field("urlImage"), {
      target: { value: "Post Url Image", name: "urlImage" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //ASSERT
    expect(field("title").value).toEqual("Jamie");
    expect(field("content").value).toEqual("New way to test-Content");
    expect(field("urlImage").value).toEqual("Post Url Image");
  });

  it("input elements start with the values specified by props", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
        contentInputValue="ContentTest"
        titleInputValue="TitleTest"
        urlImageInputValue="urlImageTest"
      />
    );

    //ASSERT
    expect(field("title").value).toEqual("TitleTest");
    expect(field("content").value).toEqual("ContentTest");
    expect(field("urlImage").value).toEqual("urlImageTest");
  });

  it("it is possible to call the onSubmit function when the title input have a value", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("title"), {
      target: { value: "TitleTest", name: "title" },
    });
    ReactTestUtils.Simulate.change(field("content"), {
      target: { value: "contentTest", name: "content" },
    });
    ReactTestUtils.Simulate.change(field("urlImage"), {
      target: { value: "", name: "urlImage" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    expect(form("EditAndCreationFormPost").checkValidity()).toBe(true);
  });

  it("it is not possible to call the onSubmit function when the title input have not a value", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    ReactTestUtils.Simulate.change(field("title"), {
      target: { value: "", name: "title" },
    });
    ReactTestUtils.Simulate.change(field("content"), {
      target: { value: "contentTest", name: "content" },
    });
    ReactTestUtils.Simulate.change(field("urlImage"), {
      target: { value: "urlImage", name: "urlImage" },
    });

    //Simulation of a Re-Render cause the state changued
    ReactDOM.unmountComponentAtNode(container);

    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    expect(form("EditAndCreationFormPost").checkValidity()).toBe(false);
    //There are two problems when you want to click the submit button of your form
    //so the onSubmit funcion execute or not depending if the require input fields have a value
    //First: ReactTestUtils.Simulate.click(formButton) never call the onSubmit function of the form
    //Second: ReactTestUtils.Simulate.submit(formButton) always execute the onSubmit function of the form no matter if the require input fields have a value
    //One day i hope its possible to solve this

    //ReactTestUtils.Simulate.submit(field("submitButton"));
  });

  it("onSubmit function called when submit button is pressed", () => {
    expect.hasAssertions();
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    const functionToCall = () => {
      console.log("submitFunction was executed");
    };

    const mockFunctionToCall = jest.fn(functionToCall);

    //ARRANGE AND ACT
    render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => mockFunctionToCall()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
        contentInputValue="ContentTest"
        titleInputValue="TitleTest"
        urlImageInputValue="urlImageTest"
      />
    );

    ReactTestUtils.Simulate.submit(field("submitButton"));

    expect(mockFunctionToCall).toHaveBeenCalled();
  });
});
