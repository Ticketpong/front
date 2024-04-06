import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../../assets/ViewAllImg/Image20240328164620.jpg";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  text-align: center;
  max-width: 100%;
`;

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

// ======================================================================================================================
// 상단 부분
const Upper = styled.div`
  margin-top: 220px;
`;

const ShortHr = styled.hr`
  width: 50px;
  height: 1px;
  background-color: #ffffff;
  margin-top: 15px;
  border: 0;
`;
const All = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: center;
  align-items: center;
  margin: 10px auto;
  color: #ffffff;
`;

const UpperUL = styled.ul`
  display: inline-block;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  flex-wrap: wrap;
  min-width: 1500px;
`;

const UpperLI = styled.li`
  flex: 0 0 calc(20% - 20px);
  margin: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  min-width: 200px;
`;

const UpperImage = styled.img`
  display: block;
  min-width: 260px;
  height: 320px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const UpperP = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "24px" : "inherit")};
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "350px" : "inherit")};
`;

// 이미지 순위 처리
const ImageContainer = styled.div`
  position: relative;
`;

const Rank = styled.p`
  position: absolute;
  bottom: -50px;
  left: 5px;
  background-color: none;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  padding: 5px;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 48px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
`;

const Button = styled.button`
  min-width: 120px;
  height: 50px;
  background-color: #373a42;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 100px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  line-height: 8px;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const GeographyButton = styled.button`
  min-width: 120px;
  height: 50px;
  background-color: #373a42;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 100px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  line-height: 8px;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MoreButton = styled.button`
  min-width: 240px;
  height: 60px;
  background-color: #ffffff;
  color: #fc1055;
  border: 1px solid #fc1055;
  padding: 10px 20px;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  font-size: 24px;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
`;
const CategoryContainer = styled.div`
  display: flex;
  margin-bottom: 55px;
  align-items: center;
  justify-content: center;
`;

// =============================================================================================================
// 하단 부분

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 1780px;
  max-width: 1600px;
  margin: 80px auto;
`;

const StyledUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledLI = styled.li`
  align-items: center;
  justify-content: center;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 80px;
  margin-left: 40px;
  margin-right: 40px;
  min-width: 350px;
  min-height: 350px;
`;

const StyledImage = styled.img`
  display: block;
  min-width: 350px;
  height: 450px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const StyledP = styled.p`
  margin: 0;
  font-size: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  max-width: ${(props) => (props.over ? "350px" : "inherit")};
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

  useEffect(() => {
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

  const getDisplayedData = () => {
    let filteredData = [];

    if (geographyBased) {
      // 예시용 위도, 경도 데이터 => 서울 광화문
      // 나중에 현재 위치를 가져오는 함수를 넣어야할 수도 있음.
      const userLatitude = 37.572389;
      const userLongitude = 126.9769117;

      filteredData = allPerformances.filter((item) => {
        const distance = Math.sqrt(
          Math.pow(item.la - userLatitude, 2) +
            Math.pow(item.lo - userLongitude, 2)
        );
        // 숫자를 조정하면 위도, 경도의 범위가 바뀝니다.
        return distance <= 0.01;
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

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <>
      <Container>
        <BackgroudImg>
          <Upper>
            <All>공연 / 전시</All>
            <ShortHr />
            <UpperUL>
              {rankDisplayedData.map((item, index) => {
                if (!showAll && index >= 5) return null;
                return (
                  <UpperLI key={index}>
                    <Link to={`/ticketing/${item.mt20id}`}>
                      <ImageContainer>
                        <UpperImage src={item.poster} alt="포스터" />
                        <Rank>{startIndex + index + 1}</Rank>
                      </ImageContainer>
                    </Link>
                    <UpperP over className="over">
                      이름: {item.prfnm.slice(0, 13)}
                      {item.prfnm.length > 20 ? "..." : ""}
                    </UpperP>
                    <UpperP>
                      기간: {item.prfpdfrom}~{item.prfpdto}
                    </UpperP>
                  </UpperLI>
                );
              })}
            </UpperUL>
          </Upper>
        </BackgroudImg>
      </Container>

      <CategoryContainer>
        <Button onClick={() => handleCategoryChange("전체")}>전체보기</Button>
        <Button onClick={() => handleCategoryChange("연극")}>연극</Button>
        <Button onClick={() => handleCategoryChange("뮤지컬")}>뮤지컬</Button>
        <Button onClick={() => handleCategoryChange("대중음악")}>콘서트</Button>
        <Button onClick={() => handleCategoryChange("기타")}>기타</Button>
        <GeographyButton onClick={handleGeographyChange}>
          위치기반
        </GeographyButton>
      </CategoryContainer>

      <Bottom>
        <StyledUL>
          {displayedData2.map((item, index) => {
            if (!showAll && index >= 8) return null;
            return (
              <StyleLink to={`/ticketing/${item.mt20id}`}>
                <StyledLI key={index}>
                  <StyledImage src={item.poster} alt="포스터" />
                  <StyledP>장르: {item.genrenm}</StyledP>
                  <StyledP>
                    지역: {item.adres.slice(0, 10)}
                    {item.adres.length > 20 ? "..." : ""}
                  </StyledP>
                  <StyledP over className="over">
                    이름: {item.prfnm}
                  </StyledP>
                  <StyledP>
                    기간: {item.prfpdfrom}~{item.prfpdto}
                  </StyledP>
                </StyledLI>
              </StyleLink>
            );
          })}
        </StyledUL>
        {!showAll && <MoreButton onClick={handleLoadMore}>더보기</MoreButton>}
      </Bottom>
    </>
  );
};

export default Performance;
