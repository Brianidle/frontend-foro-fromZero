import React from "react";

import NewPost from "../../../pages/newpost";

import { render, fireEvent } from "@testing-library/react";

import { MockedProvider } from "@apollo/client/testing";
import { NEW_POST } from "../../../gql/mutation";

//Each mock object defines a request field (indicating the shape
//and variables of the operation to match against) and a result
//field (indicating the shape of the response to return for that operation)

const SignInRequestMock = {
  request: {
    query: NEW_POST,
    variables: {
      title: "titleTest",
      content: "contentTest",
      urlImage: "urlImageTest",
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
    console.log("Response received from the server");
    let newPost = {
      id: "6048d31a87862f0b9073283f",
      author: "60455291a49ce421c8f40f95",
      title: "titleTest",
      content: "contentTest",
      urlImage: "urlImageTest",
    };

    return newPost;
  },
};

const mocks = [SignInRequestMock];

describe("newpost page testing", () => {
  it("when the user succesfully submit the form to create a post, a request is sends and when the response arrives the webpage will go to the '/' Home Page", async () => {
    let buttonText = "Create Post";

    const mockedProps = { history: { push: jest.fn() } };

    let { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewPost {...mockedProps} />
      </MockedProvider>
    );

    fireEvent.change(getByTestId("inputTitle"), {
      target: { value: "titleTest" },
    });
    fireEvent.change(getByTestId("inputContent"), {
      target: { value: "contentTest" },
    });
    fireEvent.change(getByTestId("inputUrl"), {
      target: { value: "urlImageTest" },
    });

    fireEvent.click(getByText(buttonText));

    //To test how your component is rendered after its query completes, you can await
    //a zero-millisecond timeout before performing your checks. This delays the checks
    //until the next "tick" of the event loop, which gives MockedProvider an opportunity to populate the mocked result

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockedProps.history.push).toBeCalledWith("/");
  });
});
