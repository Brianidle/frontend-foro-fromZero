import React from "react";

import PostFormContainer from "../../../components/PostFormContainer";

import { render, fireEvent } from "@testing-library/react";

describe("React State", () => {
  it("When the user writes something in the inputs, the value of the inputs changues", () => {
    let buttonTextContent = "Test";

    let { getByTestId } = render(
      <PostFormContainer
        buttonText={buttonTextContent}
        requestTrigger={() => console.log("request sent to the server")}
      />
    );

    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "TitleTest" },
    });
    expect(getByTestId("inputTitle").value).toEqual("TitleTest");

    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "ContentTest" },
    });
    expect(getByTestId("inputContent").value).toEqual("ContentTest");

    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "UrlTest" },
    });
    expect(getByTestId("inputUrl").value).toEqual("UrlTest");
  });

  it("it is possible to call the onSubmit function WHEN the title input has a value AND the content input OR the urlImage input have a value", () => {
    let buttonTextContent = "Test";

    const newRequestFunction = jest.fn(() => {
      //"Request to create a new post sent"
    });

    let { getByTestId, getByText } = render(
      <PostFormContainer
        buttonText={buttonTextContent}
        requestTrigger={() => newRequestFunction()}
      />
    );

    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "TitleTest" },
    });
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "ContentTest" },
    });

    fireEvent.click(getByText(buttonTextContent));

    expect(newRequestFunction).toHaveBeenCalledTimes(1);

    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "UrlTest" },
    });

    fireEvent.click(getByText(buttonTextContent));

    expect(newRequestFunction).toHaveBeenCalledTimes(2);
  });

  it("it is not possible to call the onSubmit function WHEN the title input has not a value even if the input content or the input url have a value", () => {
    const newRequestFunction = jest.fn(() => {
      //"New post created"
    });

    let buttonTextContent = "Test";

    let { getByTestId, getByText } = render(
      <PostFormContainer
        buttonText={buttonTextContent}
        requestTrigger={() => newRequestFunction()}
      />
    );

    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "contentTest" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "" },
    });

    fireEvent.click(getByText(buttonTextContent));

    expect(newRequestFunction).toHaveBeenCalledTimes(0);
  });

  it("it is not possible to call the onSubmit function WHEN the title input has a value AND the content input AND the urlImage input doenst have a value", () => {
    const newRequestFunction = jest.fn(() => {
      //"New post created"
    });

    let buttonTextContent = "Test";

    let { getByTestId, getByText } = render(
      <PostFormContainer
        buttonText={buttonTextContent}
        requestTrigger={() => newRequestFunction()}
      />
    );

    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "titleTest" },
    });
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "" },
    });

    fireEvent.click(getByText(buttonTextContent));

    expect(newRequestFunction).toHaveBeenCalledTimes(0);
  });
});
