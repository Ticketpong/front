import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  min-width: 1570px;
  max-width: 1720px;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const PrevSlideButton = styled.button`
  position: absolute;
  top: 45%;
  width: 70px;
  height: 70px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 40px;
  color: #fc1055;
  box-shadow: 1px 1px 1px #666;
  cursor: pointer;
  border-radius: 50%;
  z-index: 999;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22);
  }
`;

const NextSlideButton = styled.button`
  position: absolute;
  top: 45%;
  width: 70px;
  height: 70px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 40px;
  color: #fc1055;
  box-shadow: 1px 1px 1px #666;
  cursor: pointer;
  border-radius: 50%;
  z-index: 999;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 9px;")}

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22);
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 40px;
  margin-left: 40px;
  vertical-align: top;
`;

const Image = styled.div`
  display: block;
  min-width: 310px;
  max-width: 310px;
  height: 390px;
  margin-bottom: 10px;
  object-fit: cover;
  img {
    min-height: 100%;
    max-height: 100%;
    min-width: 100%;
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.22);
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "350px" : "none")};
`;

const TextOver = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
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
  const [startIndex, setStartIndex] = useState(0);
  const URL = "http://localhost:8080/homepage/recent";
  const [category, setCategory] = useState("연극");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
    setStartIndex(0);
  };

  const getDisplayedData = () => {
    let filteredData;
    if (category === "기타") {
      filteredData = data.filter(
        (item) => item.genrenm === "무용" || item.genrenm === "서양음악(클래식)"
      );
    } else {
      filteredData = data.filter((item) => item.genrenm === category) || [];
    }

    const totalDataLength = filteredData.length;

    if (totalDataLength <= 4) {
      return filteredData.slice(startIndex);
    } else {
      return filteredData.slice(startIndex, startIndex + 4) || [];
    }
  };

  const displayedData = getDisplayedData();

  const handleNext = () => {
    const totalDataLength = data.filter(
      (item) =>
        item.genrenm === category ||
        (category === "기타" &&
          (item.genrenm === "무용" || item.genrenm === "서양음악(클래식)"))
    ).length;
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
      <Strong>New 신규오픈!</Strong>
      <CategoryContainer>
        <CategoryButton onClick={() => handleCategoryChange("연극")}>
          연극
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange("뮤지컬")}>
          뮤지컬
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange("대중음악")}>
          콘서트
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryChange("기타")}>
          기타
        </CategoryButton>
      </CategoryContainer>
      <SliderContainer>
        <PrevSlideButton onClick={handlePrev} direction="left">
          {"<"}
        </PrevSlideButton>
        <UlContainer>
          {displayedData.map((item, index) => (
            <StyleLink to={`/ticketing/${item.mt20id}`}>
              <ListItem key={index}>
                <Image>
                  <img src={item.poster} alt="포스터" />
                </Image>
                <TextOver>
                  {item.genrenm} &nbsp;
                  {item.prfnm.length > 8 ? (
                    <>&lt;{item.prfnm.slice(0, 8)}...</>
                  ) : (
                    <>&lt;{item.prfnm}&gt;</>
                  )}
                </TextOver>
                <Text>{item.fcltynm}</Text>
                <Text>
                  {item.prfpdfrom} ~ {item.prfpdto}
                </Text>
              </ListItem>
            </StyleLink>
          ))}
        </UlContainer>
        <NextSlideButton onClick={handleNext}>{">"}</NextSlideButton>
      </SliderContainer>
    </Container>
  );
};

export default HPContent1;
