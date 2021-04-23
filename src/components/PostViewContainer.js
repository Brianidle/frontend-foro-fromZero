import React from 'react';

import PropTypes from "prop-types";

import PostView from './PostView';
import { getBrowserCookiesInJSON } from '../helpers/cookieHelper';

import { withRouter } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { DELETE_POST } from '../gql/mutation';

const propTypes = {
    post: PropTypes.object.isRequired,
    belongsToThePostFeed: PropTypes.bool.isRequired
};

const PostViewContainer = ({ post,
    belongsToThePostFeed,
    windowLocationFunc, history }) => {

    let belongToTheUserAuthenticated;
    let browserCookies = getBrowserCookiesInJSON();

    let [deletePost] = useMutation(DELETE_POST, {
        variables: { idPost: post.id },
        onCompleted: (data) => {
            if (data.deletePost === true) {
                //activate the "Post deleted successfully" after 2 sec when the notification messages are implemented.
            } else {
                //activate the "Error trying to delete the Post" after 2 sec
            }

            history.push("/");
        }
    })

    return (<PostView post={post} belongsToThePostFeed={belongsToThePostFeed}
        windowLocationFunc={windowLocationFunc} history={history}
        belongToTheUserAuthenticated={post.belongsToTheAuthenticatedUser??false} deletePost={deletePost} />)
}

PostViewContainer.propTypes = propTypes;

export default withRouter(PostViewContainer);