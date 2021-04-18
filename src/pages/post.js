import React from "react";
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
  height: 100vh;
`;

const PostContainer = styled.main`
  cursor: default;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
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

const Post = (props) => {
  let idPost = props.match.params.id;

  const { data, loading } = useQuery(GET_POST, { variables: { idPost } });

  if (loading) return <p>LOADING..</p>;

  let post = data.post;

  return (
    <PostLayout>
      <PostContainer>
        <PostViewContainer post={post} belongsToThePostFeed={false} />
      </PostContainer>
      <AsideContainer>
        <AboutLinksContainer>ABOUT LINKS</AboutLinksContainer>
      </AsideContainer>
    </PostLayout>
  );
};

export default Post;
