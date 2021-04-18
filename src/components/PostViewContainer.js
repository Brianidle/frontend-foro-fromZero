import React from 'react';

import PropTypes from "prop-types";

import PostView from './PostView';
import { getBrowserCookiesInJSON } from '../helpers/cookieHelper';

import { withRouter } from "react-router-dom";

const propTypes = {
    post: PropTypes.object.isRequired,
    belongsToThePostFeed: PropTypes.bool.isRequired
};

const PostViewContainer = ({ post,
    belongsToThePostFeed,
    windowLocationFunc, history }) => {

    let belongToTheUserAuthenticated;
    let browserCookies = getBrowserCookiesInJSON();

    if (browserCookies.username) {
        if (browserCookies.username == post.author.username) {
            belongToTheUserAuthenticated = true;
        } else {
            belongToTheUserAuthenticated = false;
        }
    }
    else {
        belongToTheUserAuthenticated = false;
    }

    return (<PostView post={post} belongsToThePostFeed={belongsToThePostFeed}
        windowLocationFunc={windowLocationFunc} history={history}
        belongToTheUserAuthenticated={belongToTheUserAuthenticated} />)
}

PostViewContainer.propTypes = propTypes;

export default withRouter(PostViewContainer);