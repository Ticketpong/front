import React, { useState, useEffect } from "react";
import * as S from "../../styles/PerformanceStyled";
import styled from "styled-components";
import axios from "axios";
import Img from "../../assets/ViewAllImg/Image20240328164620.jpg";
import { Link } from "react-router-dom";
import SearchBar from "../../components/base/SearchBar";

const BackgroudImg = styled.image`
  background-image: url(${Img});
  background-size: cover;
  background-size: 100% 400px;
  background-position: top;
  background-repeat: no-repeat;
  align-items: center;
  min-width: 100%;
  overflow: hidden;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// =============================================================================================== //
// 데이터 처리 부문

const Performance = () => {
  const URL = "http://localhost:8080/viewall";
  const rankURL = "http://localhost:8080/viewall/ranking";
  const [startIndex, setStartIndex] = useState(0);
  const [allPerformances, setAllPerformances] = useState([]); // 전체 공연 데이터
  const [rankedPerformances, setRankedPerformances] = useState([]); // 순위 데이터
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [geographyBased, setGeographyBased] = useState(false); // 위치 기반 필터링 여부 상태
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
    error: null,
  });
  const [sortBy, setSortBy] = useState("prfnm");

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const onSuccess = (location) => {
    setLocation((prevState) => ({
      ...prevState,
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
      error: null,
    }));
  };

  const onError = (error) => {
    setLocation((prevState) => ({
      ...prevState,
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    fetchData();
    fetchRankData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setAllPerformances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRankData = async () => {
    try {
      const response = await axios.get(rankURL);
      setRankedPerformances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRankDisplayedData = () => {
    return rankedPerformances.slice(startIndex, startIndex + 5) || [];
  };

  const getAllData2 = () => {
    return allPerformances || [];
  };

  const rankDisplayedData = getRankDisplayedData();

  if (!location.loaded) {
    return null;
  }

  if (location.error) {
    alert(`Error: ${location.error.message}`);
    return null;
  }

  const { lat, long } = location.coordinates;

  const getDisplayedData = () => {
    let filteredData = [];

    if (geographyBased) {
      filteredData = allPerformances.filter((item) => {
        const distance = Math.sqrt(
          Math.pow(item.la - lat, 2) + Math.pow(item.lo - long, 2)
        );
        // 0.1당 대략 반경 11km 이내
        console.log(lat, long);
        return distance <= 0.1;
      });
    } else if (selectedCategory === "전체") {
      if (startIndex === 0) {
        filteredData = getAllData2();
      } else {
        filteredData = allPerformances.slice(startIndex, startIndex + 8);
      }
    } else {
      if (selectedCategory === "기타") {
        filteredData = allPerformances.filter(
          (item) =>
            item.genrenm === "무용" || item.genrenm === "서양음악(클래식)"
        );
      } else {
        filteredData = allPerformances.filter(
          (item) => item.genrenm === selectedCategory
        );
      }
    }

    return filteredData || [];
  };

  const displayedData2 = getDisplayedData();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setStartIndex(0);
    setGeographyBased(false);
  };

  const handleGeographyChange = () => {
    setGeographyBased(true);
    setSelectedCategory("전체"); // 위치 기반 필터링 시 선택된 장르를 '전체'로 변경
  };

  const sortedData = [...displayedData2].sort((a, b) => {
    if (sortBy === "prfnm") {
      return a.prfnm.localeCompare(b.prfnm); // Sort alphabetically by prfnm
    } else if (sortBy === "prfpdfrom") {
      return new Date(a.prfpdfrom) - new Date(b.prfpdfrom); // Sort by prfpdfrom
    } else {
      return new Date(a.prfpdto) - new Date(b.prfpdto); // Sort by prfpdto
    }
  });

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <>
      <S.Container>
        <BackgroudImg>
          <S.Upper>
            <S.All>공연 / 전시</S.All>
            <S.ShortHr />
            <S.UpperUL>
              {rankDisplayedData.map((item, index) => {
                if (!showAll && index >= 5) return null;
                return (
                  <S.UpperLI key={index}>
                    <StyleLink to={`/ticketing/${item.mt20id}`}>
                      <S.ImageContainer>
                        <S.UpperImage>
                          <img src={item.poster} alt="포스터" />
                          <S.Rank>{startIndex + index + 1}</S.Rank>
                        </S.UpperImage>
                      </S.ImageContainer>
                    </StyleLink>
                    <S.UpperOver>
                      {item.prfnm.slice(0, 17)}
                      {item.prfnm.length > 20 ? "..." : ""}
                    </S.UpperOver>
                    <S.UpperP>
                      {item.prfpdfrom}~{item.prfpdto}
                    </S.UpperP>
                  </S.UpperLI>
                );
              })}
            </S.UpperUL>
          </S.Upper>
        </BackgroudImg>
      </S.Container>

      <SearchBar isHomepage={false} />

      <S.CategoryContainer>
        <S.Button onClick={() => handleCategoryChange("전체")}>
          전체보기
        </S.Button>
        <S.Button onClick={() => handleCategoryChange("연극")}>연극</S.Button>
        <S.Button onClick={() => handleCategoryChange("뮤지컬")}>
          뮤지컬
        </S.Button>
        <S.Button onClick={() => handleCategoryChange("대중음악")}>
          콘서트
        </S.Button>
        <S.Button onClick={() => handleCategoryChange("기타")}>기타</S.Button>
        <S.GeographyButton onClick={handleGeographyChange}>
          위치기반
        </S.GeographyButton>
      </S.CategoryContainer>

      <S.LabelContainer>
        <select id="sortBy" value={sortBy} onChange={handleSortBy}>
          <option value="prfnm">가나다순</option>
          <option value="prfpdfrom">최근 등록순</option>
          <option value="prfpdto">종료일 늦은순</option>
        </select>
      </S.LabelContainer>

      <S.Bottom>
        <S.StyledUL>
          {sortedData.map((item, index) => {
            if (!showAll && index >= 8) return null;
            return (
              <StyleLink to={`/ticketing/${item.mt20id}`}>
                <S.StyledLI key={index}>
                  <S.StyledImage>
                    <img src={item.poster} alt="포스터" />
                  </S.StyledImage>
                  <S.StyledOver>
                    {item.genrenm} &nbsp;
                    {item.prfnm.length > 9 ? (
                      <>&lt;{item.prfnm.slice(0, 9)}...</>
                    ) : (
                      <>&lt;{item.prfnm}&gt;</>
                    )}
                  </S.StyledOver>
                  <S.StyledP>{item.fcltynm}</S.StyledP>
                  <S.StyledP>
                    {item.prfpdfrom}~{item.prfpdto}
                  </S.StyledP>
                </S.StyledLI>
              </StyleLink>
            );
          })}
        </S.StyledUL>
        {!showAll && (
          <S.MoreButton onClick={handleLoadMore}>더보기</S.MoreButton>
        )}
      </S.Bottom>
    </>
  );
};

export default Performance;
