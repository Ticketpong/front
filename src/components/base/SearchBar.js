import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarHome from "../../styles/SearchHomeStyled";
import SearchBarAll from "../../styles/SearchAllStyled";

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