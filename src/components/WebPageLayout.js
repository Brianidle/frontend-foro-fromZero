import React from "react";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: #dae0e6;
  padding-top: 48px;
  min-height: calc(100vh - 48px);
`;

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <Main>{children}</Main>
    </div>
  );
};
export default Layout;
