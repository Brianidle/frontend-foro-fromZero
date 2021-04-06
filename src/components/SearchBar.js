import React from "react";
import styled from "styled-components";

const SearchBarStyled = styled.input`
  height: 34px;
  border: 0px;
  padding: 0px 10px;
  background-color: #f6f7f8;
  border-radius: 5px;
  width: 50%;
  display: block;
  margin: auto;
  outline: none;

  :hover {
    border-width: 1px;
    border-style: solid;
    border-color: #0079d3;
  }
`;

const SearchBar = () => {
  return <SearchBarStyled placeholder="Search" />;
};

export default SearchBar;
