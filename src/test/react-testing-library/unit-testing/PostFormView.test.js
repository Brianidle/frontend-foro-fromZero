import React from "react";

import PostFormView from "../../../components/PostFormView";

import { render, fireEvent } from "@testing-library/react";

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
    let { getByTestId } = render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={onChange}
      />
    );

    //ASSERT
    expectToBeInputField(getByTestId("inputTitle"));
    expectToBeInputField(getByTestId("inputContent"));
    expectToBeInputField(getByTestId("inputUrl"));
  });

  it("input elements values and simulated react state, changes when user write on the input elements", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ACT
    let { getByTestId, rerender, unmount } = render(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "Jamie" },
    });
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "New way to test-Content" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "Post Url Image" },
    });

    //Simulation of a Re-Render cause the state changued
    unmount();

    rerender(
      <PostFormView
        buttonText="Test"
        onSubmit={() => console.log("test")}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //ASSERT
    expect(getByTestId("inputTitle").value).toEqual("Jamie");
    expect(getByTestId("inputContent").value).toEqual(
      "New way to test-Content"
    );
    expect(getByTestId("inputUrl").value).toEqual("Post Url Image");
  });

  it("input elements start with the values specified by props", () => {
    //ARRANGE

    //Reset of the simulated react state value
    setValue({});

    //ARRANGE AND ACT
    let { getByTestId } = render(
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
    expect(getByTestId("inputTitle").value).toEqual("TitleTest");
    expect(getByTestId("inputContent").value).toEqual("ContentTest");
    expect(getByTestId("inputUrl").value).toEqual("urlImageTest");
  });

  it("it is possible to call the onSubmit function WHEN the title input has a value AND the content input OR the urlImage input have a value", () => {
    //ARRANGE

    const newPostFunction = jest.fn(() => {
      //"New post created"
    });

    const validationRuleToCreateAPost = () => {
      if (
        useStateValue.title &&
        (useStateValue.content || useStateValue.urlImage)
      ) {
        newPostFunction();
      } else {
        //"Error notification shown"
      }
    };

    //Reset of the simulated react state value
    setValue({});
    let buttonTextContent = "Test";

    //ARRANGE AND ACT
    let { getByTestId, getByText, unmount, rerender } = render(
      <PostFormView
        buttonText={buttonTextContent}
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "TitleTest" },
    });
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "ContentTest" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "" },
    });

    //Simulation of a Re-Render cause the state changued
    unmount();

    rerender(
      <PostFormView
        buttonText={buttonTextContent}
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    fireEvent.click(getByText(buttonTextContent));

    expect(newPostFunction).toHaveBeenCalledTimes(1);

    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "UrlTest" },
    });

    fireEvent.click(getByText(buttonTextContent));
    //There are two problems when you want to click the submit button of your form
    //so the onSubmit funcion execute or not depending if the require input fields have a value
    //First: ReactTestUtils.Simulate.click(formButton) never call the onSubmit function of the form
    //Second: ReactTestUtils.Simulate.submit(formButton) always execute the onSubmit function of the form no matter if the require input fields have a value
    //One day i hope its possible to solve this

    //UPDATE: now with react-testing-library it is possible to call the onSubmit function of the form clicking the submit button of the form

    expect(newPostFunction).toHaveBeenCalledTimes(2);
  });

  it("it is not possible to call the onSubmit function when the title input has not a value", () => {
    //ARRANGE
    const newPostFunction = jest.fn(() => {
      //"New post created"
    });

    const validationRuleToCreateAPost = () => {
      if (
        useStateValue.title &&
        (useStateValue.content || useStateValue.urlImage)
      ) {
        newPostFunction();
      } else {
        //"Error notification shown"
      }
    };

    //Reset of the simulated react state value
    setValue({});
    let buttonTextContent = "Test";

    //ARRANGE AND ACT
    let { getByTestId, getByText, unmount, rerender } = render(
      <PostFormView
        buttonText={buttonTextContent}
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "contentTest" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "" },
    });

    //Simulation of a Re-Render cause the state changued
    unmount();

    rerender(
      <PostFormView
        buttonText="Test"
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    fireEvent.click(getByText(buttonTextContent));

    expect(newPostFunction).toHaveBeenCalledTimes(0);
  });

  it("it is not possible to call the onSubmit function WHEN the title input has a value AND the content input AND the urlImage input doenst have a value", () => {
    //ARRANGE

    const newPostFunction = jest.fn(() => {
      //"New post created"
    });

    const validationRuleToCreateAPost = () => {
      if (
        useStateValue.title &&
        (useStateValue.content || useStateValue.urlImage)
      ) {
        newPostFunction();
      } else {
        //"Error notification shown"
      }
    };

    //Reset of the simulated react state value
    setValue({});
    let buttonTextContent = "Test";

    //ARRANGE AND ACT
    let { getByTestId, getByText, unmount, rerender } = render(
      <PostFormView
        buttonText={buttonTextContent}
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    //Simulation of the writing on the input elements
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "" },
    });

    //Simulation of a Re-Render cause the state changued
    unmount();

    rerender(
      <PostFormView
        buttonText={buttonTextContent}
        onSubmit={() => validationRuleToCreateAPost()}
        inputValues={useStateValue}
        onChange={(e) => onChange(e)}
      />
    );

    fireEvent.click(getByText(buttonTextContent));

    expect(newPostFunction).toHaveBeenCalledTimes(0);
  });
});
