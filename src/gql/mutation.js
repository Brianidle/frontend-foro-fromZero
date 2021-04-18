import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

const NEW_POST = gql`
  mutation newPost(
    $title: String!
    $content: String
    $urlImage: String
  ) {
    newPost(
      title: $title
      content: $content
      urlImage: $urlImage
    ) {
      title
      content
      urlImage
    }
  }
`;

const EDIT_POST = gql`
  mutation EditPost(
    $idPost: ID!
    $title: String
    $content: String
    $urlImage: String
  ) {
    editPost(
      idPost: $idPost
      title: $title
      content: $content
      urlImage: $urlImage
    )
  }
`;

const DELETE_POST = gql`
  mutation DeletePost(
   $idPost: ID!
  ) {
   deletePost(
     idPost: $idPost
    )
  }
`;

export { SIGN_UP, NEW_POST, EDIT_POST, DELETE_POST };
