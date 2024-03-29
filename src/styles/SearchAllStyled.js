import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from '../assets/homeImg/searchIcon_p.png';

const StyledSearchBar = styled.div`
  width: 480px;
  height: 30px;
  padding: 10px 30px 10px 10px;
  border: 1px solid #FC1055;
  border-radius: 60px;
  outline: none;
  color: #000;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 18px 20px 20px 20px;
  background: transparent;
  color: #000;
  outline: none;
  font-size: 18px;
  &::placeholder {
    color: #000;
    opacity: 0.7;
    font-size: 18px;
  }
`;

const SearchIcon = styled.img`
  width: 6%;
  height: auto;
  cursor: pointer;
`;

const SearchAllStyled = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 새로고침 시 input창 초기화
    localStorage.removeItem('searchInputValue');
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSubmit();
  };

  return (
    <StyledSearchBar>
      <SearchInput
        placeholder="공연 전시명을 입력해주세요."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <SearchIcon src={searchIcon} alt="Search Icon" onClick={handleSearch} />
    </StyledSearchBar>
  );
};

export default SearchAllStyled;