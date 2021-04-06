import React from "react";

import PropTypes from "prop-types";

import PostView from "./PostView";

const propTypes = {
  posts: PropTypes.array.isRequired,
};

const PostList = ({ posts }) => {
  return posts.map((post) => (
    <PostView
      post={post}
      key={post.id}
      belongsToThePostFeed={true}
      windowLocationFunc={() => (window.location.href = `post/${post.id}`)}
    />
  ));
};

PostList.propTypes = propTypes;

export default PostList;
