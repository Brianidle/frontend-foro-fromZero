import React, { useEffect } from "react";
import styled from "styled-components";
import PostViewContainer from "../components/PostViewContainer";

import { useQuery } from "@apollo/client";
import { GET_POST } from "../gql/query";

const PostLayout = styled.div`
  padding-top: 25px;
  padding-right: 25px;
  padding-left: 25px;
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  cursor: default;
  width : 640px;
  min-width: 370px;
`;

const AsideContainer = styled.aside`
  margin-left: 30px;
  border-radius: 5px;
`;

const AboutLinksContainer = styled.div`
  width: 310px;
  height: 400px;
  border-radius: 5px;
  background-color: white;
`;

const pageTitle = "Post";

const Post = (props) => {

  useEffect(() => {
    document.title = pageTitle;
  });

  let idPost = props.match.params.id;

  const { data, loading } = useQuery(GET_POST, { variables: { idPost } });

  if (loading) return <p>LOADING..</p>;

  let post = data.post;

  return (
    <PostLayout>
      <PostContainer>
        <PostViewContainer post={post} belongsToThePostFeed={false} />
      </PostContainer>
    </PostLayout>
  );
};

export default Post;
