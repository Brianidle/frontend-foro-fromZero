import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PostFormView from "../components/PostFormView";

Enzyme.configure({ adapter: new Adapter() });

var useStateValue;

const setValue = (obj) => {
  useStateValue = obj;
};

const onChange = (event) => {
  setValue({ ...useStateValue, [event.target.name]: event.target.value });
};

describe("inputs rendering", () => {
  const expectToBeInputField = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.type.target).toEqual("input");
  };

  it("the component renders with the required arguments", () => {
    setValue({});
    //i use shallow cause the component does not require its children to be rendered, because the component does not have children
    const wrapper = shallow(
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
    setValue({});

    //ACT
    const wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //ASSERT
    expectToBeInputField(wrapper.find("#title").get(0));
    expectToBeInputField(wrapper.find("#content").get(0));
    expectToBeInputField(wrapper.find("#urlImage").get(0));
  });

  it("input elements values and simulated react state, changes when user write on the input elements", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ACT
    let wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //Simulation of the writing on the input elements
    wrapper.find("#title").simulate("change", {
      target: { value: "Jamie", name: "title" },
    });
    wrapper.find("#content").simulate("change", {
      target: { value: "New way to test-Content", name: "content" },
    });
    wrapper.find("#urlImage").simulate("change", {
      target: { value: "Post Url Image", name: "urlImage" },
    });

    //Simulation of a Re-Render cause the state changued
    wrapper.unmount();

    wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //ASSERT
    expect(wrapper.find("#title").get(0).props.value).toEqual("Jamie");
    expect(wrapper.find("#content").get(0).props.value).toEqual(
      "New way to test-Content"
    );
    expect(wrapper.find("#urlImage").get(0).props.value).toEqual(
      "Post Url Image"
    );
  });

  it("input elements start with the values specified by props", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    let wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
        contentInputValue="ContentTest"
        titleInputValue="TitleTest"
        urlImageInputValue="urlImageTest"
      />
    );

    //ASSERT
    expect(wrapper.find("#title").get(0).props.value).toEqual("TitleTest");
    expect(wrapper.find("#content").get(0).props.value).toEqual("ContentTest");
    expect(wrapper.find("#urlImage").get(0).props.value).toEqual(
      "urlImageTest"
    );
  });

  it.skip("it is possible to call the onSubmit function when the title input have a value", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});
    let functionToCall = () => console.log("Test");
    let mockFunctionToCall = jest.fn(functionToCall);

    //ARRANGE AND ACT
    let wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //Simulation of the writing on the input elements
    wrapper.find("#title").simulate("change", {
      target: { value: "Jamie", name: "title" },
    });
    wrapper.find("#content").simulate("change", {
      target: { value: "New way to test-Content", name: "content" },
    });
    wrapper.find("#urlImage").simulate("change", {
      target: { value: "Post Url Image", name: "urlImage" },
    });

    //Simulation of a Re-Render cause the state changued
    wrapper.unmount();

    wrapper = shallow(
      <PostFormView
        buttonText="Test"
        onSubmit={() => mockFunctionToCall()}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //Enzyme doenst give me a way to get the form from the simulated DOM and call the checkValidity() method of the object element.
  });

  it.skip("it is not possible to call the onSubmit function when the title input have not a value", () => {
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

    //Enzyme doenst give me a way to get the form from the simulated DOM and call the checkValidity() method of the object element.
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

    //ACT
    let wrapper = shallow(
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

    wrapper.find("#EditAndCreationFormPost").simulate("submit");

    expect(mockFunctionToCall).toHaveBeenCalled();
  });
});
