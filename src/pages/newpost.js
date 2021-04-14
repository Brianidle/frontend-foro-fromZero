import React, { useEffect } from "react";

import { useMutation } from "@apollo/client";
import { NEW_POST } from "../gql/mutation";
import {GET_POSTS} from "../gql//query";

import PostFromContainer from "../components/PostFormContainer";

const NewPost = (props) => {
  const [newPost] = useMutation(NEW_POST, {
    refetchQueries:[{query:GET_POSTS}],
    onCompleted: () => {
      props.history.push("/");
    },
  });

  useEffect(() => {
    document.title = "New Post";
  });

  return (
    <PostFromContainer buttonText="Create Post" requestTrigger={newPost} />
  );
};

export default NewPost;
