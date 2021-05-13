import React, { useEffect } from "react";
import styled from "styled-components";

import PostList from "../components/PostList";
import { GET_AUTHOR_POSTS } from "../gql/query";
import { useQuery } from "@apollo/client";

const PostLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const PostsContainer = styled.div`
  cursor: default;
  width : 640px;
  min-width: 370px;
`;

const PageTitle=styled.h1`
  text-align:center;
`;

const PageLayout=styled.div`
  padding: 0px 25px;
`;

const pageTitle = "My Posts";

const MyPosts = () => {
  useEffect(() => {
    document.title = pageTitle;
  });

  const { loading, data } = useQuery(GET_AUTHOR_POSTS);

  if (loading) return <p>Loading...</p>;

  return (
    <PageLayout>
    <PageTitle>{pageTitle}</PageTitle>
    <PostLayout>
      <PostsContainer>
        <PostList posts={data.authorPosts} />
      </PostsContainer>
    </PostLayout>
    </PageLayout>
  );
};

export default MyPosts;
