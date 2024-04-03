import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
import data from "../../dummy/data.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
  min-width: 1358px;
  height: 780px;
`;

const Strong = styled.strong`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin-bottom: 80px;
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
  border-radius: 25px;
  line-height: 10px;

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

const UlContainer = styled.div`
  min-width: 1300px;
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
  top: 45%;
  width: 70px;
  height: 70px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 40px;
  color: #fc1055;
  cursor: pointer;
  border-radius: 50%;
  z-index: 999;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}

  &:focus {
    background-color: #fc1055;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 40px;
  margin-left: 40px;
  vertical-align: top;
`;

const Image = styled.img`
  display: block;
  min-width: 350px;
  height: 450px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "24px" : "inherit")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "350px" : "none")};
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HPContent1 = () => {
  // const [jsonData, setJsonData] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const URL = "https://www.kopis.or.kr/";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/data/data.json");
  //       setJsonData(response.data);
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
      <Strong>New 신규오픈!</Strong>
      <CategoryContainer>
        <CategoryButton onClick={() => handleCategoryChange(0)}>
          연극
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(4)}>
          공연
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(8)}>
          콘서트
        </CategoryButton>
      </CategoryContainer>
      <SliderContainer>
        <SlideButton
          className="prevButton"
          onClick={handlePrev}
          direction="left"
        >
          {"<"}
        </SlideButton>
        <UlContainer>
          {displayedData.map((item, index) => (
            <StyleLink to={`/ticketing/${item.mt20id._text}`}>
              <ListItem key={index}>
                <Image src={URL + item.poster._text} alt="포스터" />
                <Text>장르: {item.cate._text}</Text>
                <Text>지역: {item.area._text}</Text>
                <Text over className="over">
                  이름: {item.prfnm._text}
                </Text>
                <Text>기간: {item.prfpd._text}</Text>
              </ListItem>
            </StyleLink>
          ))}
        </UlContainer>
        <SlideButton className="nextButton" onClick={handleNext}>
          {">"}
        </SlideButton>
      </SliderContainer>
    </Container>
  );
};

export default HPContent1;
