import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SearchBarHome from '../styles/SearchHomeStyled';
import SearchBarAll from '../styles/SearchAllStyled';

const SearchBar = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [searchResults, setSearchResults] = useState([]);

  const onSubmit = async () => {
    try {
      // 검색 API 호출 수정 필요
      const response = await axios.get();
      setSearchResults(response.data);
    } catch (error) {
      console.error('검색 요청 중 오류 발생:', error);
    }
  };

  return (
    <div>
      {isHomepage ? (
        <SearchBarHome
          placeholder="검색어를 입력하세요."
          onSubmit={onSubmit}
        />
      ) : (
        <SearchBarAll
          placeholder="검색어를 입력하세요."
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default SearchBar;