import React, { useEffect } from "react";

import { EDIT_POST } from "../gql/mutation";
import { useMutation } from "@apollo/client";

import PostFormContainer from "../components/PostFormContainer";
import styled from "styled-components";

const Layout = styled.div`
  text-align: center;
  margin-top: 25px;
`;

const pageTitle = "Edit Post";

const EditPost = (props) => {

  useEffect(() => {
    document.title = pageTitle;
  });

  let postString = sessionStorage.getItem("post");
  let post = JSON.parse(postString);

  const [editPost] = useMutation(EDIT_POST, {
    variables: { idPost: post.id },
    onCompleted: (data) => {
      if (data.editPost === "POST_EDITED") {
        props.history.push("/");
        //activate the "Post edited successfully" when the notification messages are implemented.
      }
    },
  });

  return (
    <Layout>
      <h1>{pageTitle}</h1>
      <PostFormContainer
        buttonText="Edit Post"
        requestTrigger={editPost}
        titleInputValue={post.title}
        contentInputValue={post.content}
        urlImageInputValue={post.urlImage}
      />
    </Layout>

  );
};

export default EditPost;
