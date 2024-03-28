import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "../../dummy/data.json";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
`;

const Strong = styled.strong`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoryBtn = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const CategoryButton = styled.button`
  width: 120px;
  height: 50px;
  font-size: 24px;
  background-color: #373a42;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;

  &:focus,
  :hover {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
  &:active {
    color: #ffffff;
    background-color: #fc1055;
  }
`;
const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 50px;
  cursor: pointer;
  border-radius: 50%;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}

  &:focus {
    background-color: #fc1055;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 60px;
  vertical-align: top;
`;

// 이미지 순위 처리
const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 320px;
  height: 420px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const Rank = styled.span`
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: none;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 48px;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "24px" : "inherit")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "350px" : "none")};
`;

const HPContent2 = ({ item, onClick }) => {
  // const [jsonData, setJsonData] = useState("");
  const URL = "https://www.kopis.or.kr/";
  const [startIndex, setStartIndex] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/data/data.json");
  //       const jsonData = await response.json();
  //       setJsonData(jsonData);
  //     } catch (error) {
  //       console.error("JSON 데이터를 가져오는 중 오류가 발생했습니다.", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const jsonData = data;

  const handleCategoryChange = (start) => {
    setStartIndex(start);
  };

  const getDisplayedData = () => {
    return jsonData?.boxofs?.boxof?.slice(startIndex, startIndex + 4) || [];
  };

  const displayedData = getDisplayedData();

  const handleNext = () => {
    if (startIndex + 4 < jsonData?.boxofs?.boxof?.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const handlePrev = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(startIndex - 4);
    }
  };

  return (
    <Container>
      <Strong>오늘의 인기티켓</Strong>
      <CategoryBtn>
        <CategoryButton onClick={() => handleCategoryChange(0)}>
          연극
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(5)}>
          공연
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(10)}>
          콘서트
        </CategoryButton>
      </CategoryBtn>

      <SliderContainer>
        <SlideButton
          className="prevButton"
          direction="left"
          onClick={handlePrev}
        >
          {"<"}
        </SlideButton>
        <ul>
          {displayedData.map((item, index) => (
            <ListItem key={index} onClick={() => onClick(item)}>
              <Link to={`/ticketing/${item.id}`}>
                <ImageContainer>
                  <Image src={URL + item.poster._text} alt="포스터" />
                  <Rank>{startIndex + index + 1}</Rank>
                </ImageContainer>
              </Link>
              <Text>장르: {item.cate._text}</Text>
              <Text>지역: {item.area._text}</Text>
              <Text over className="over">
                이름: {item.prfnm._text}
              </Text>
              <Text>기간: {item.prfpd._text}</Text>
            </ListItem>
          ))}
        </ul>
        <SlideButton
          className="nextButton"
          direction="right"
          onClick={handleNext}
        >
          {">"}
        </SlideButton>
      </SliderContainer>
    </Container>
  );
};

export default HPContent2;
