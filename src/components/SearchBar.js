// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import SearchBarHome from '../styles/SearchHomeStyled';
// import SearchBarAll from '../styles/SearchAllStyled';
// import posterImg from '../assets/searchResultImg/posterImg.jpg'

// const SearchBar = () => {
//   const navigate = useNavigate(); // 페이지 이동 기능 활성화
//   const location = useLocation();
//   const isHomepage = location.pathname === '/';

//   const [keyword, setKeyword] = useState('');

//   const handleChange = (event) => {
//     setKeyword(event.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       if (!keyword.trim()) return; // 검색어가 공백이면 검색하지 않음

//       // 페이지 이동
//       navigate('/searchresult', { state: { keyword, searchResults: dummyData } });
//     } catch (error) {
//       console.error('검색 요청 중 오류 발생:', error);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // 더미 데이터
//   const dummyData = [
//     { id: 1, name: 'Dummy Result 1', poster: posterImg },
//     { id: 2, name: 'Dummy Result 2', poster: posterImg },
//     { id: 3, name: 'Dummy Result 3', poster: posterImg }
//   ];

//   return (
//     <div>
//       {isHomepage ? (
//         <SearchBarHome
//           placeholder="공연 전시명을 입력해주세요."
//           value={keyword}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           onSubmit={handleSearch}
//         />
//       ) : (
//         <SearchBarAll
//           placeholder="공연 전시명을 입력해주세요."
//           value={keyword}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           onSubmit={handleSearch}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarHome from "../styles/SearchHomeStyled";
import SearchBarAll from "../styles/SearchAllStyled";

const SearchBar = ({ isHomepage }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/searchresult?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // isHomepage prop에 따라 적절한 스타일드 컴포넌트를 선택하여 렌더링
  const SearchBarStyled = isHomepage ? SearchBarHome : SearchBarAll;

  return (
    <div>
      <SearchBarStyled
        placeholder="공연 전시명을 입력해주세요."
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
