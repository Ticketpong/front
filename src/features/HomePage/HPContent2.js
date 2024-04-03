import React, { useState } from "react";
import styled from "styled-components";
import data from "../../dummy/data.json";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
  min-width: 1358px;
  height: 910px;
`;

const Strong = styled.strong`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CategoryBtn = styled.div`
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
  border-radius: 24px;
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
const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const UlContainer = styled.div`
  min-width: 1300px;
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

// 이미지 순위 처리
const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  display: block;
  min-width: 350px;
  height: 450px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const Rank = styled.span`
  position: absolute;
  bottom: -10px;
  left: 5px;
  background-color: none;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  padding: 5px;
  border-radius: 5px;
  font-size: 48px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
`;

const Text = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "24px" : "inherit")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "350px" : "none")};
`;

const StyledViewAllButton = styled.button`
  margin-top: 70px;
  width: 240px;
  height: 60px;
  border-radius: 50px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HPContent2 = () => {
  const URL = "https://www.kopis.or.kr/";
  const [startIndex, setStartIndex] = useState(0);
  const [category, setCategory] = useState("연극");

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
    setStartIndex(0);
  };

  const getDisplayedData = () => {
    const filteredData =
      data?.boxofs?.boxof?.filter((item) => item.cate._text === category) || [];

    const totalDataLength = filteredData.length;

    if (totalDataLength <= 4) {
      return filteredData.slice(startIndex);
    } else {
      return filteredData.slice(startIndex, startIndex + 4) || [];
    }
  };

  const displayedData = getDisplayedData();

  const handleNext = () => {
    const totalDataLength =
      data?.boxofs?.boxof?.filter((item) => item.cate._text === category)
        .length || 0;
    const maxIndex = Math.ceil(totalDataLength / 4) - 1;

    if (startIndex + 4 < totalDataLength) {
      setStartIndex(startIndex + 4);
    } else if (
      startIndex + 4 >= totalDataLength &&
      startIndex !== maxIndex * 4
    ) {
      setStartIndex(maxIndex * 4);
    } else if (totalDataLength <= 4) {
      setStartIndex(startIndex);
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
        <CategoryButton onClick={() => handleCategoryChange("연극")}>
          연극
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange("공연")}>
          공연
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange("콘서트")}>
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
        <UlContainer>
          {displayedData.map((item, index) => (
            <StyleLink to={`/ticketing/${item.mt20id._text}`}>
              <ListItem key={index}>
                <ImageContainer>
                  <Image src={URL + item.poster._text} alt="포스터" />
                  <Rank>{startIndex + index + 1}</Rank>
                </ImageContainer>
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
        <SlideButton
          className="nextButton"
          direction="right"
          onClick={handleNext}
        >
          {">"}
        </SlideButton>
      </SliderContainer>
      <Link to="/viewall">
        <StyledViewAllButton>티켓 전체보기</StyledViewAllButton>
      </Link>
    </Container>
  );
};

export default HPContent2;
