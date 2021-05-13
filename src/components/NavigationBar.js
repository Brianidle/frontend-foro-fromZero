import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";

//import SearchBar from "./SearchBar";
import UserDropDown from "./UserDropDown";

import { connect } from "react-redux";
import { doChangueToken } from "../actions/actionCreators";

import { BACKEND_EXPRESS_API_URI } from '../constantVariables';

const HeaderBar = styled.header`
  background-color: red;
  height: 50px;
  display: inline-flex;
  width: 100%;
  position: fixed;
`;

// const HomeButton = styled.button`
//   height: 40px;
//   width: 40px;
//   border-radius: 5px;
//   padding: 0px;
//   cursor: pointer;
//   outline: none;
//   background-color: #4e9eed;
// `;

const NavigationBarButton = styled.button`
  min-height: 32px;
  width: 75px;
  margin-right: 10px;
  padding:10px;
  border-radius: 15px;
  cursor: pointer;
  outline: none;

  @media (max-width: 616px) {
      display: none;
  }
`;

const LogoTitleContainer = styled.a`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const InputElement = styled.input`
  width: 100%;
  height: 32px;
  border: 0px;
  padding-left: 20px;
`;

// const LogoTitle = styled.div`
//   background-color: #4e9eed;
//   font-weight: bold;
//   font-size: 18px;
//   margin-left: 5px;
//   padding: 2px;
//   border-radius: 5px;
//   text-decoration: none; 
  
//   @media (max-width: 1070px) {
//     display: none;
//   }
// `;

const LogoTitleSearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
`;

const ButtonsDropDownContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 0;
`;

const HeaderBarContentContainer = styled.div`
  padding: 0px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  margin: 0 16px;
  padding-right: 20px;
`;

const NavigationBar = (props) => {

  const logOut = () => {
    fetch(BACKEND_EXPRESS_API_URI + "/logout", {
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      credentials: "include", // omit, include
    }).then(response => { props.deleteTokenFromState(); });
  }

  return (
    <HeaderBar>
      <HeaderBarContentContainer>
        <LogoTitleSearchBarContainer>
          <LogoTitleContainer href="/">
            <FormatPaintIcon
              style={{ color: "white", fontSize: 30, textAlign: "center", marginRight:5 }}
            ></FormatPaintIcon>
            <svg className="logoTitle" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.000000 178.000000"
 preserveAspectRatio="xMidYMid meet" style={{width:60}}>

<g transform="translate(0.000000,178.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M550 1453 c0 -5 -200 -949 -230 -1086 l-8 -38 111 3 110 3 18 80 c9
44 31 149 49 232 l33 153 210 2 211 3 17 80 c10 44 18 83 18 88 1 4 -94 7
-210 7 -196 0 -210 1 -205 18 5 16 56 260 56 268 0 2 114 4 254 4 l255 0 16
78 c9 42 19 85 22 95 4 16 -18 17 -361 17 -201 0 -366 -3 -366 -7z"/>
<path d="M1620 1167 c-252 -59 -434 -316 -399 -563 11 -78 57 -172 103 -211
183 -155 515 -75 667 160 94 145 111 324 44 457 -29 56 -92 115 -153 142 -57
26 -186 33 -262 15z m159 -195 c57 -42 66 -66 66 -170 0 -82 -4 -104 -23 -140
-71 -134 -209 -200 -303 -146 -107 61 -105 266 2 388 79 90 190 119 258 68z"/>
<path d="M3245 1167 c-89 -23 -167 -69 -241 -142 -138 -136 -191 -319 -141
-487 80 -267 452 -305 686 -69 218 219 206 559 -24 675 -45 23 -71 29 -143 32
-50 2 -108 -2 -137 -9z m165 -195 c95 -69 92 -266 -5 -380 -85 -98 -211 -125
-282 -60 -58 54 -70 206 -24 296 72 140 221 210 311 144z"/>
<path d="M2277 758 c-48 -227 -87 -416 -87 -420 0 -5 47 -8 104 -8 91 0 105 2
110 18 3 9 26 116 51 237 25 121 51 233 57 248 25 64 136 128 247 143 28 4 51
12 51 18 0 6 9 49 19 95 l19 83 -56 -4 c-77 -6 -125 -31 -199 -103 -68 -65
-70 -64 -48 30 8 33 15 63 15 68 0 4 -44 7 -98 7 l-98 0 -87 -412z"/>
</g>
</svg>
          </LogoTitleContainer>
          <SearchBarContainer>
            <InputContainer>
              <InputElement />
            </InputContainer>
          </SearchBarContainer>
        </LogoTitleSearchBarContainer>
        <ButtonsDropDownContainer>
          {!props.token && (
            <React.Fragment>
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
            </React.Fragment>
          )}

          <UserDropDown
            isAuthenticated={props.token}
            logout={logOut}
          />
        </ButtonsDropDownContainer>
      </HeaderBarContentContainer>
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
