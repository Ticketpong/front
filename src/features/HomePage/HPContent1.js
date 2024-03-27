import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
import data from "../../dummy/data.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px 10px;
`;

const Strong = styled.strong`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoryBtn = styled.div`
  display: flex;
  margin-bottom: 40px;
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

const StyledViewAllButton = styled.button`
  margin-top: 40px;
  width: 240px;
  height: 60px;
  border-radius: 50px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  text-align: center;
  font-size: 24px;
  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 60px;
  vertical-align: top;
`;

const Image = styled.img`
  display: block;
  width: 320px;
  height: 420px;
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

const HPContent1 = ({ item, onClick }) => {
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
      <CategoryBtn>
        <CategoryButton onClick={() => handleCategoryChange(0)}>
          연극
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(4)}>
          공연
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange(8)}>
          콘서트
        </CategoryButton>
      </CategoryBtn>

      <div style={{ position: "relative" }}>
        <SlideButton
          className="prevButton"
          onClick={handlePrev}
          direction="left"
        >
          {"<"}
        </SlideButton>
        <ul>
          {displayedData.map((item, index) => (
            <ListItem key={index} onClick={() => onclick(item)}>
              <Link to={`/ticketing/${item.id}`}>
                <Image src={URL + item.poster._text} alt="포스터" />
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
          onClick={handleNext}
          // direction="right"
        >
          {">"}
        </SlideButton>
      </div>
      <Link to="/viewall">
        <StyledViewAllButton>티켓 전체보기</StyledViewAllButton>
      </Link>
    </Container>
  );
};

export default HPContent1;
