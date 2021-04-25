import React, { useEffect } from "react";

import { useMutation } from "@apollo/client";
import { NEW_POST } from "../gql/mutation";
import { GET_POSTS } from "../gql//query";

import PostFromContainer from "../components/PostFormContainer";
import styled from "styled-components";

const Layout = styled.div`
  text-align: center;
  margin-top: 25px;
`;

const pageTitle = "New Post";

const NewPost = (props) => {

  useEffect(() => {
    document.title = pageTitle;
  });

  const [newPost] = useMutation(NEW_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      props.history.push("/");
    },
  });

  return (
    <Layout>
      <h1>{pageTitle}</h1>
      <PostFromContainer buttonText="Create Post" requestTrigger={newPost} />
    </Layout>
  );
};

export default NewPost;
