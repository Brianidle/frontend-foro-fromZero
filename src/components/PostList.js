import React from "react";

import PropTypes from "prop-types";

import PostViewContainer from './PostViewContainer';

import { withRouter } from "react-router-dom";

const propTypes = {
  posts: PropTypes.array.isRequired,
};

const PostList = ({ posts, history }) => {
  return posts.map((post) => (
    <PostViewContainer post={post}
      key={post.id}
      belongsToThePostFeed={true}
      windowLocationFunc={() => (history.push(`post/${post.id}`))} />
  ));
};

PostList.propTypes = propTypes;

export default withRouter(PostList);
