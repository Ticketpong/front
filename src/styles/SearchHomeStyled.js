// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/homeImg/searchIcon_w.png';

const StyledSearchBar = styled.div`
  position: absolute;
  top: 83%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 30px;
  padding: 10px 30px 10px 10px;
  border: 1px solid #999;
  border-radius: 60px;
  outline: none;
  color: #fff;
  background-color: rgba(95, 90, 90, 0.4);
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 20px;
  background: transparent;
  color: #fff;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: #fff;
    opacity: 0.7;
    font-size: 16px;
  }
`;

const SearchIcon = styled.img`
  width: 6%;
  height: auto;
  cursor: pointer;
`;

const SearchHomeStyled = ({ placeholder, value, onChange, onKeyDown, onSubmit }) => {
  return (
    <StyledSearchBar>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
      />
      <SearchIcon src={searchIcon} alt="Search Icon" onClick={onSubmit} />
    </StyledSearchBar>
  );
};

export default SearchHomeStyled;