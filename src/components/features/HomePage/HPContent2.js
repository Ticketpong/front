import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

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
  margin-bottom: 80px;
`;

// const CategoryBtn = styled.div`
//   display: flex;
//   margin-bottom: 80px;
// `;

// const CategoryButton = styled.button`
//   width: 120px;
//   height: 50px;
//   font-size: 24px;
//   background-color: #373a42;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   margin-right: 15px;
//   margin-left: 15px;
//   cursor: pointer;
//   border-radius: 24px;
//   line-height: 10px;

//   &:focus,
//   :hover {
//     background-color: #fc1055;
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//     color: #ffffff;
//   }
//   &:active {
//     color: #ffffff;
//     background-color: #fc1055;
//   }
// `;
const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const UlContainer = styled.div`
  min-width: 1570px;
  max-width: 1720px;
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

// 이미지 순위 처리
const ImageContainer = styled.div`
  position: relative;
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

const TextOver = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
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
  const URL = "http://localhost:8080/homepage/ranking";
  const [startIndex, setStartIndex] = useState(0);
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

  const getDisplayedData = () => {
    const totalDataLength = data.length;

    if (totalDataLength <= 4) {
      return data.slice(startIndex);
    } else {
      return data.slice(startIndex, startIndex + 4) || [];
    }
  };

  const displayedData = getDisplayedData();

  const handleNext = () => {
    const totalDataLength = data.length || 0;
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
      {/* <CategoryBtn>
        <CategoryButton>전체</CategoryButton>
      </CategoryBtn> */}

      <SliderContainer>
        <PrevSlideButton direction="left" onClick={handlePrev}>
          {"<"}
        </PrevSlideButton>
        <UlContainer>
          {displayedData.map((item, index) => (
            <StyleLink to={`/ticketing/${item.mt20id}`}>
              <ListItem key={index}>
                <ImageContainer>
                  <Image>
                    <img src={item.poster} alt="포스터" />
                  </Image>
                  <Rank>{startIndex + index + 1}</Rank>
                </ImageContainer>
                <TextOver>
                  {item.genrenm} &nbsp; &lt;{item.prfnm.slice(0, 13)}&gt;
                  {item.prfnm.length > 20 ? "..." : ""}
                </TextOver>
                <Text>{item.fcltynm}</Text>
                <Text>
                  {item.prfpdfrom} ~ {item.prfpdto}
                </Text>
              </ListItem>
            </StyleLink>
          ))}
        </UlContainer>
        <NextSlideButton direction="right" onClick={handleNext}>
          {">"}
        </NextSlideButton>
      </SliderContainer>
      <Link to="/viewall">
        <StyledViewAllButton>티켓 전체보기</StyledViewAllButton>
      </Link>
    </Container>
  );
};

export default HPContent2;
