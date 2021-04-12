import React from "react";

import EditPost from "../../../pages/editpost";

import { render, fireEvent } from "@testing-library/react";

import { MockedProvider } from "@apollo/client/testing";
import { EDIT_POST } from "../../../gql/mutation";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

const SignInRequestMockAllData = {
  request: {
    query: EDIT_POST,
    variables: {
      idPost: "6043ef57d670a425cc6198e2",
      title: "titleTest Edition",
      content: "contentTest Edition",
      urlImage: "urlImageTest Edition",
    },
  },
  //Alternatively, the result field can be a function that returns a mocked response after performing arbitrary logic
  //result: () => {
  // ...arbitrary logic...
  //   return {
  //     data: {
  //      ...
  //     },
  //   }
  // }
  result: () => {
    console.log("EDIT POST Response received from the server");

    return { data: { editPost: "EDIT_SUCESS" } };
  },
};

const SignInRequestMockIdPostTitleContent = {
  request: {
    query: EDIT_POST,
    variables: {
      idPost: "6043ef57d670a425cc6198e2",
      title: "titleTest Edition",
      content: "contentTest Edition",
    },
  },
  result: () => {
    return { data: { editPost: "EDIT_SUCESS" } };
  },
};

const SignInRequestMockIdPostTitleUrlImage = {
  request: {
    query: EDIT_POST,
    variables: {
      idPost: "6043ef57d670a425cc6198e2",
      title: "titleTest Edition",
      urlImage: "urlImageTest Edition",
    },
  },
  result: () => {
    return { data: { editPost: "EDIT_SUCESS" } };
  },
};

const mocks = [
  SignInRequestMockAllData,
  SignInRequestMockIdPostTitleContent,
  SignInRequestMockIdPostTitleUrlImage,
];

describe("editPost page retrieve the information of the post previously selected, from the session storage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("When title, content and urlImage data is retrieved from the session storage and the form is submmited then a request is sent to the gql server and when the server respond with success the webpage will go the the '/' Home Page", async () => {
    //ARRANGE
    let buttonText = "Edit Post";

    window.sessionStorage.setItem(
      "post",
      JSON.stringify({
        id: "6043ef57d670a425cc6198e2",
        title: "titleTest Edition",
        content: "contentTest Edition",
        urlImage: "urlImageTest Edition",
      })
    );

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditPost {...mockedProps} />
      </MockedProvider>
    );

    //ACT
    fireEvent.click(getByText(buttonText));

    //To test how your component is rendered after its query completes, you can await
    //a zero-millisecond timeout before performing your checks. This delays the checks
    //until the next "tick" of the event loop, which gives MockedProvider an opportunity to populate the mocked result

    await new Promise((resolve) => setTimeout(resolve, 100));

    //ASSERT
    expect(mockedProps.history.push).toBeCalledWith("/");
  });

  it("When the title and the content data is retrieved from the session storage and the form is submmited then a request is sent to the gql server and when the server respond with success the webpage will go the the '/' Home Page", async () => {
    //ARRANGE
    let buttonText = "Edit Post";

    window.sessionStorage.setItem(
      "post",
      JSON.stringify({
        id: "6043ef57d670a425cc6198e2",
        title: "titleTest Edition",
        content: "contentTest Edition",
      })
    );

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditPost {...mockedProps} />
      </MockedProvider>
    );

    //ACT
    fireEvent.click(getByText(buttonText));

    await new Promise((resolve) => setTimeout(resolve, 100));

    //ASSERT
    expect(mockedProps.history.push).toBeCalledWith("/");
  });

  it("When title and the urlImage data is retrieved from the session storage and the form is submmited then a request is sent to the gql server and when the server respond with success the webpage will go the the '/' Home Page", async () => {
    //ARRANGE
    let buttonText = "Edit Post";

    window.sessionStorage.setItem(
      "post",
      JSON.stringify({
        id: "6043ef57d670a425cc6198e2",
        title: "titleTest Edition",
        urlImage: "urlImageTest Edition",
      })
    );

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditPost {...mockedProps} />
      </MockedProvider>
    );

    //ACT
    fireEvent.click(getByText(buttonText));

    await new Promise((resolve) => setTimeout(resolve, 100));

    //ASSERT
    expect(mockedProps.history.push).toBeCalledWith("/");
  });

  it("When only the title data is retrieved from the session storage, it is not possible to submit the form", async () => {
    //ARRANGE
    let buttonText = "Edit Post";

    window.sessionStorage.setItem(
      "post",
      JSON.stringify({
        id: "6043ef57d670a425cc6198e2",
        title: "titleTest Edition",
      })
    );

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditPost {...mockedProps} />
      </MockedProvider>
    );

    //ACT
    fireEvent.click(getByText(buttonText));

    await new Promise((resolve) => setTimeout(resolve, 100));

    //ASSERT
    expect(mockedProps.history.push).not.toBeCalled();
  });

  it("When only the content or the urlImage data is retrieved from the session storage, it is not possible to submit the form", async () => {
    //ARRANGE
    let buttonText = "Edit Post";

    window.sessionStorage.setItem(
      "post",
      JSON.stringify({
        id: "6043ef57d670a425cc6198e2",
        content: "contentTest Edition",
        urlImage: "urlImageTest Edition",
      })
    );

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditPost {...mockedProps} />
      </MockedProvider>
    );

    //ACT
    fireEvent.click(getByText(buttonText));

    await new Promise((resolve) => setTimeout(resolve, 100));

    //ASSERT
    expect(mockedProps.history.push).not.toBeCalled();
  });
});
