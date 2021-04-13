import React, { useEffect } from "react";
import styled from "styled-components";

import PostList from "../components/PostList";
import { GET_AUTHOR_POSTS } from "../gql/query";
import { useQuery } from "@apollo/client";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const MyPosts = () => {
  useEffect(() => {
    document.title = "My Posts Page";
  });

  const { loading, data } = useQuery(GET_AUTHOR_POSTS);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <PostList posts={data.authorPosts} />
    </Layout>
  );
};

export default MyPosts;
