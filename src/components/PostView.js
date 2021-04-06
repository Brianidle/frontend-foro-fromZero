import React from "react";

import PropTypes from "prop-types";

import styled from "styled-components";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EditIcon from "@material-ui/icons/Edit";

import { withRouter } from "react-router-dom";

import moment from "moment";

const propTypes = {
  post: PropTypes.object.isRequired,
};

const PostInfoPanel = styled.div`
  width: 640px;
  padding-top: 8px;
`;

const ImagenSubForoContainer = styled.div`
  width: 30px;
  height: 100%;
`;

const UserAndSubForoNameContainer = styled.div`
  width: 500px;
  background-color: white;
  margin: auto 0;
`;

const PostContentContainer = styled.div`
  margin-left: 8px;
`;

const SubForoName = styled.a`
  padding-left: 6px;
  text-decoration: none;
  font-weight: 600;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

const UserName = styled.a`
  text-decoration: none;
  color: #787c7e;

  :hover {
    text-decoration: underline;
  }
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
  min-width: 640px;
  max-width: 640px;
  width: 640px;
  display: flex;
  flex-direction: row;
  background-color: white;
  margin-bottom: 20px;
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

const PostView = ({
  post,
  belongsToThePostFeed,
  windowLocationFunc,
  history,
}) => {
  if (!belongsToThePostFeed) {
    sessionStorage.setItem("post", JSON.stringify(post));
  }

  return (
    <PostPanel belongsToThePostFeed={belongsToThePostFeed}>
      <UpDownPointsPanel belongsToThePostFeed={belongsToThePostFeed}>
        <ArrowsAndPointsContainer>
          <PointUpButton>
            <KeyboardArrowUpIcon style={{ fontSize: 25 }} />
          </PointUpButton>
          <span style={{ fontWeight: 650, color: "white" }}>154</span>
          <PointDownButton>
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
            <SubForoName href="https://www.youtube.com">f/tenis</SubForoName>
            <span style={{ color: "#787c7e" }}> . </span>
            <span style={{ color: "#787c7e" }}>Posted by </span>
            <UserName href="https://www.reddit.com">
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

        <BottomOfThePostPanel belongsToThePostFeed={belongsToThePostFeed}>
          <BottomPanelButtonContainer>
            <ModeCommentIcon style={{ paddingTop: 5, fontSize: 21 }} />
            <strong style={{ paddingLeft: 5 }}>46 Comments</strong>
          </BottomPanelButtonContainer>
          {!belongsToThePostFeed && (
            <BottomPanelButtonContainer
              onClick={() => history.push("/editpost")}
            >
              <EditIcon style={{ paddingTop: 5, fontSize: 21 }} />
              <strong style={{ paddingLeft: 5 }}>Edit</strong>
            </BottomPanelButtonContainer>
          )}
        </BottomOfThePostPanel>
      </PostInfoPanel>
    </PostPanel>
  );
};

PostView.propTypes = propTypes;

export default withRouter(PostView);
