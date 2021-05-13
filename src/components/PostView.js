import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";

import moment from "moment";

const propTypes = {
  post: PropTypes.object.isRequired,
  belongsToThePostFeed: PropTypes.bool.isRequired,
  belongToTheUserAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  upvotePost: PropTypes.func.isRequired,
  downvotePost: PropTypes.func.isRequired,
  foroPoints: PropTypes.number.isRequired
};

const PostInfoPanel = styled.div`
  width: auto;
  padding-top: 8px;
  flex-grow: 1;
`;

const ImagenSubForoContainer = styled.div`
  width: 30px;
  height: 100%;
`;

const UserAndSubForoNameContainer = styled.div`
  width: auto;
  background-color: white;
  margin: auto 0;
`;

const PostContentContainer = styled.div`
  margin-left: 8px;
`;

const SubForoName = styled.span`
  padding-left: 6px;
  text-decoration: none;
  font-weight: 600;
  color: black;

  // :hover {
  //   text-decoration: underline;
  // }
`;

const UserName = styled.span`
  text-decoration: none;
  color: #787c7e;

  // :hover {
  //   text-decoration: underline;
  // }
`;

const UserImage = styled.img`
  border-radius: 50%;
  height: 28px;
  width: 28px;
  margin: auto 0;
`;

const TitleContainer = styled.div`
  margin-left: 8px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: 500;
`;

const ArrowsAndPointsContainer = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const PointUpButton = styled.button`
  background: transparent;
  padding: 0;
  border: 0;
  color: white;
  cursor: pointer;
  border-radius: 20%;
  outline: none;

  :hover {
    background: white;
    color: orange;
  }
`;

const PointDownButton = styled.button`
  background: transparent;
  padding: 0;
  border: 0;
  color: white;
  cursor: pointer;
  border-radius: 20%;
  outline: none;

  :hover {
    background: white;
    color: orange;
  }
`;

const BottomPanelButtonContainer = styled.div`
  background: transparent;
  padding: 0px 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    background: #dae0e6;
  }
`;

const PostPanel = styled.div`
  margin-bottom: 20px;
  
  display: flex;
  flex-direction: row;
  background-color: white;
  font-size: 14px;

  ${(props) =>
    props.belongsToThePostFeed &&
    `cursor:pointer;
  border-radius: 5px;
  :hover {
    border:0.2px solid black;
  }`}
`;

const UpDownPointsPanel = styled.div`
  width: 40px;
  background-color: #ff1a1a;
  flex-shrink: 0;
  ${(props) =>
    props.belongsToThePostFeed &&
    `
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  `}
`;

const TopOfThePostPanel = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  margin-right: 8px;
  margin-left: 8px;

  ${(props) => props.belongsToThePostFeed && "border-top-right-radius: 5px"};
`;

const BottomOfThePostPanel = styled.div`
  height: 32px;
  display: flex;
  flex-direction: row;
  min-width: 100%;
  margin-left: 8px;
  margin-top: 4px;

  ${(props) => props.belongsToThePostFeed && "border-bottom-right-radius: 5px"};
`;

const PostImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 50%;
`;

const PostView = ({
  post,
  belongsToThePostFeed,
  belongToTheUserAuthenticated,
  deletePost,
  windowLocationFunc,
  history,
  upvotePost,
  downvotePost,
  foroPoints
}) => {
  if (!belongsToThePostFeed) {
    sessionStorage.setItem("post", JSON.stringify(post));
  }

  return (
    <PostPanel belongsToThePostFeed={belongsToThePostFeed}>
      <UpDownPointsPanel belongsToThePostFeed={belongsToThePostFeed}>
        <ArrowsAndPointsContainer>
          <PointUpButton onClick={upvotePost}>
            <KeyboardArrowUpIcon style={{ fontSize: 25 }} />
          </PointUpButton>
          <p style={{ fontWeight: 700, color: "white", marginTop: 5, marginBottom: 5 }}>{foroPoints}</p>
          <PointDownButton onClick={downvotePost}>
            <KeyboardArrowDownIcon style={{ fontSize: 25 }} />
          </PointDownButton>
        </ArrowsAndPointsContainer>
      </UpDownPointsPanel>

      <PostInfoPanel onClick={windowLocationFunc}>
        <TopOfThePostPanel belongsToThePostFeed={belongsToThePostFeed}>
          <ImagenSubForoContainer>
            <a href="https://www.google.com">
              <UserImage
                src="https://www.w3schools.com/howto/img_avatar2.png"
                alt="userImage"
              />
            </a>
          </ImagenSubForoContainer>
          <UserAndSubForoNameContainer>
            <SubForoName >f/tenis</SubForoName>
            <span style={{ color: "#787c7e" }}> . </span>
            <span style={{ color: "#787c7e" }}>Posted by </span>
            <UserName >
              u/{post.author.username}{" "}
            </UserName>
            <span style={{ color: "#787c7e" }}>
              {moment(post.createdAt, "YYYYMMDD").fromNow()}
            </span>
          </UserAndSubForoNameContainer>
        </TopOfThePostPanel>

        <TitleContainer>
          <span>{post.title}</span>
        </TitleContainer>

        <PostContentContainer>{post.content}</PostContentContainer>

        {post.urlImage && (<PostImage src={post.urlImage} alt="Post Image" />)}


        <BottomOfThePostPanel belongsToThePostFeed={belongsToThePostFeed}>
          <BottomPanelButtonContainer>
            <ModeCommentIcon style={{ paddingTop: 5, fontSize: 21 }} />
            <strong style={{ paddingLeft: 5 }}>Comments still not available</strong>
          </BottomPanelButtonContainer> 

          {!belongsToThePostFeed && belongToTheUserAuthenticated && (
            <BottomPanelButtonContainer
              onClick={() => history.push("/editpost")}
            >
              <EditIcon style={{ paddingTop: 5, fontSize: 21 }} />
              <strong style={{ paddingLeft: 5 }}>Edit</strong>
            </BottomPanelButtonContainer>
          )}

          {!belongsToThePostFeed && belongToTheUserAuthenticated && (
            <BottomPanelButtonContainer
              onClick={() => deletePost()}
            >
              <DeleteIcon style={{ paddingTop: 5, fontSize: 21 }} />
              <strong style={{ paddingLeft: 5 }}>Remove</strong>
            </BottomPanelButtonContainer>
          )}
        </BottomOfThePostPanel>
      </PostInfoPanel>
    </PostPanel>
  );
};

PostView.propTypes = propTypes;

export default PostView;
