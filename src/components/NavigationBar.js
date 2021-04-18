import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";

import SearchBar from "./SearchBar";
import UserDropDown from "./UserDropDown";

import { connect } from "react-redux";
import { doChangueToken } from "../actions/actionCreators";

import auth from "../pages/auth";

const HeaderBar = styled.header`
  background-color: #ff1a1a;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  position: fixed;
`;

const HomeButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding: 0px;
  cursor: pointer;
  outline: none;
  background-color: #1976d2;
`;

const NavigationBarButton = styled.button`
  width: 64px;
  min-width: 58px;
  height: 100%;
  margin-right: 10px;
  border-radius: 15px;
  cursor: pointer;
  outline: none;
`;

const LogoContainer = styled.div`
  width: 10%;
  margin-left: 25px;
`;

const SearchBarContainer = styled.div`
  width: 65%;
`;

const SignInSignUpButtonContainer = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
`;

const NavigationBar = (props) => {
  return (
    <HeaderBar>
      <LogoContainer>
        <HomeButton
          onClick={() => {
            props.history.push("/");
          }}
        >
          <FormatPaintIcon
            style={{ color: "white", fontSize: 30, textAlign: "center" }}
          ></FormatPaintIcon>
        </HomeButton>
      </LogoContainer>

      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      {!props.token && (
        <SignInSignUpButtonContainer>
          <NavigationBarButton
            onClick={() => {
              props.history.push("/signin");
            }}
          >
            Sign In
          </NavigationBarButton>
          <NavigationBarButton
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            Sign Up
          </NavigationBarButton>
        </SignInSignUpButtonContainer>
      )}

      <UserDropDown
        isAuthenticated={props.token}
        logout={auth.logOut}
        deleteTokenFromState={props.deleteTokenFromState}
      />
    </HeaderBar>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.tokenState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTokenFromState: () => {
      dispatch(doChangueToken(""));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationBar));
