import React, { useState } from 'react';

import PropTypes from "prop-types";

import PostView from './PostView';

import { withRouter } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { DELETE_POST } from '../gql/mutation';
import { UPVOTE_POST } from '../gql/mutation';
import { DOWNVOTE_POST } from '../gql/mutation';
import { GET_POSTS } from '../gql/query';

import { connect } from 'react-redux';

const propTypes = {
    post: PropTypes.object.isRequired,
    belongsToThePostFeed: PropTypes.bool.isRequired,
    userAuthenticated: PropTypes.any.isRequired
};

const PostViewContainer = ({ post,
    belongsToThePostFeed,
    windowLocationFunc, userAuthenticated, history }) => {

    const [foroPoints, setForoPoints] = useState(post.foroPoints);

    var upvotePost;
    var downvotePost;

    if (userAuthenticated) {
        [upvotePost] = useMutation(UPVOTE_POST, {
            variables: { idPost: post.id },
            onCompleted: (data) => {
                if (data.upvotePost) {
                    let foroPointsPlusOne = foroPoints + 1;
                    setForoPoints(foroPointsPlusOne);
                }
            }
        });

        [downvotePost] = useMutation(DOWNVOTE_POST, {
            variables: { idPost: post.id },
            onCompleted: (data) => {
                if (data.downvotePost) {
                    let foroPointsMinusOne = foroPoints - 1;
                    setForoPoints(foroPointsMinusOne);
                }
            }
        });
    } else {
        upvotePost = () => {
            history.push("/signin");
        };
        downvotePost = () => {
            history.push("/signin");
        };
    }

    let [deletePost] = useMutation(DELETE_POST, {
        variables: { idPost: post.id },
        refetchQueries: [{ query: GET_POSTS }],
        onCompleted: (data) => {
            // if (data.deletePost === true) {
            //     //activate the "Post deleted successfully" after 2 sec when the notification messages are implemented.
            // } else {
            //     //activate the "Error trying to delete the Post" after 2 sec
            // }

            history.push("/");
        }
    });

    return (<PostView post={post} belongsToThePostFeed={belongsToThePostFeed}
        windowLocationFunc={windowLocationFunc} history={history}
        belongToTheUserAuthenticated={post.belongsToTheAuthenticatedUser ?? false} deletePost={deletePost}
        upvotePost={upvotePost} downvotePost={downvotePost} foroPoints={foroPoints}
    />)

}

PostViewContainer.propTypes = propTypes;

const mapStateToProps = (state) => {

    return {
        userAuthenticated: state.tokenState
    }
}

export default connect(mapStateToProps)(withRouter(PostViewContainer));