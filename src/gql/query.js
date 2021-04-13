import { gql } from "@apollo/client";

const GET_POST = gql`
  query Post($idPost: ID!) {
    post(idPost: $idPost) {
      id
      title
      content
      urlImage
      createdAt
      author{
        username
      }
    }
  }
`;

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      urlImage
      createdAt
      author{
        username
      }
    }
  }
`;

const GET_AUTHOR_POSTS = gql`
  query {
    authorPosts {
      id
      title
      content
      urlImage
      createdAt
      author{
        username
      }
    }
  }
`;

const SIGN_IN = gql`
  query SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export { GET_POST, GET_POSTS, GET_AUTHOR_POSTS, SIGN_IN };
