import React from "react";

import PropTypes from "prop-types";

import PostViewContainer from './PostViewContainer';

const propTypes = {
  posts: PropTypes.array.isRequired,
};

const PostList = ({ posts }) => {
  return posts.map((post) => (
    <PostViewContainer post={post}
      key={post.id}
      belongsToThePostFeed={true}
      windowLocationFunc={() => (window.location.href = `post/${post.id}`)} />
  ));
};

PostList.propTypes = propTypes;

export default PostList;
