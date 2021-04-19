import React from "react";

import { EDIT_POST } from "../gql/mutation";
import { useMutation } from "@apollo/client";

import PostFormContainer from "../components/PostFormContainer";

const EditPost = (props) => {
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
    <PostFormContainer
      buttonText="Edit Post"
      requestTrigger={editPost}
      titleInputValue={post.title}
      contentInputValue={post.content}
      urlImageInputValue={post.urlImage}
    />
  );
};

export default EditPost;
