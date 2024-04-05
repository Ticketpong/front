import React from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/homeImg/searchIcon_p.png';

const StyledSearchBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 30px;
  padding: 10px 30px 10px 10px;
  border: 1px solid #FC1055;
  border-radius: 60px;
  outline: none;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 20px;
  background: transparent;
  color: #000;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color:#000;
    opacity: 0.7;
    font-size: 16px;
  }
`;

const SearchIcon = styled.img`
  width: 5%;
  height: auto;
  cursor: pointer;
`;

const SearchAllStyled = ({ placeholder, value, onChange, onKeyDown, onSubmit }) => {
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

export default SearchAllStyled;