import React, { useEffect } from "react";
import styled from "styled-components";

import PostList from "../components/PostList";

import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../gql/query";

const HomeLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
  padding: 20px 24px;
  height: auto;
  max-width: 100%;
  min-width: 370px;
`;

const AsideContainer = styled.aside`
  width: 312px;
  height: 400px;
  margin-left: 24px;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: white;

  @media (max-width: 960px) {
    display: none;
  }
`;

const PostsContainer = styled.div`
  width: 640px;
  height: auto;
  border-radius: 5px;
  @media (max-width: 960px){
    width: 100%;
  }
`;

const Home = () => {
  useEffect(() => {
    document.title = "Home Page";
  });

  const { loading, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;

  return (
    <HomeLayout>
      <PostsContainer>
        <PostList posts={data.posts} />
      </PostsContainer>
      <AsideContainer>
        <div>ABOUT PANEL</div>
      </AsideContainer>
    </HomeLayout>
  );
};

export default Home;
