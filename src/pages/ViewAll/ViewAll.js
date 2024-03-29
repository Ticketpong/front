import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "../../dummy/data.json";
import data2 from "../../dummy/data2.json";
import { Link } from "react-router-dom";
import Img from "../../assets/ViewAllImg/Image20240328164620.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
  text-align: center;
  max-width: 100%;
`;

const BackgroudImg = styled.image`
  background-image: url(${Img});
  background-size: cover;
  background-size: 100% 380px;
  background-position: top;
  background-repeat: no-repeat;
  align-items: center;
  min-width: 100%;
  overflow: hidden;
`;

// ======================================================================================================================
// 상단 부분
const Upper = styled.div`
  margin-top: 100px;
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
  margin: 100px 0;
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
  min-width: 200px;
  height: 290px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 12px;
`;

const UpperP = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "24px" : "inherit")};
  overflow: hidden;
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
  font-size: 18px;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// const GeographyButton = styled.button`
//   min-width: 120px;
//   height: 50px;
//   background-color: #373a42;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   margin-top: 100px;
//   margin-bottom: 10px;
//   margin-right: 15px;
//   margin-left: 15px;
//   cursor: pointer;
//   border-radius: 24px;
//   font-size: 18px;

//   &:focus {
//     background-color: #fc1055;
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//   }
// `;

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
  margin-bottom: 80px;
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

// =============================================================================================== //
// 데이터 처리 부문

const ViewAll = ({ item, onClick }) => {
  // const [jsonData, setJsonData] = useState("");
  const URL = "https://www.kopis.or.kr/";
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

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
  const jsonData2 = data2;

  const getAllData = () => {
    return jsonData?.boxofs?.boxof || [];
  };
  const getAllData2 = () => {
    return jsonData2?.boxofs?.boxof || [];
  };

  const getDisplayedData = () => {
    if (startIndex === 0) {
      return getAllData();
    } else {
      return jsonData?.boxofs?.boxof?.slice(startIndex, startIndex + 4) || [];
    }
  };
  const getDisplayedData2 = () => {
    if (startIndex === 0) {
      return getAllData2();
    } else {
      return jsonData2?.boxofs?.boxof?.slice(startIndex, startIndex + 4) || [];
    }
  };

  const displayedData = getDisplayedData();
  const displayedData2 = getDisplayedData2();

  const handleCategoryChange = (start) => {
    setStartIndex(start);
  };

  // const GeographyChange =

  return (
    <>
      <Container>
        <BackgroudImg>
          <Upper>
            <All>공연 / 전시</All>
            <ShortHr />
            <UpperUL>
              {displayedData2.map((item, index) => {
                if (!showAll && index >= 5) return null;
                return (
                  <UpperLI key={index} onClick={() => onclick(item)}>
                    <Link to={`/ticketing/${item.id}`}>
                      <ImageContainer>
                        <UpperImage
                          src={URL + item.poster._text}
                          alt="포스터"
                        />
                        <Rank>{startIndex + index + 1}</Rank>
                      </ImageContainer>
                    </Link>
                    <UpperP over className="over">
                      이름: {item.prfnm._text}
                    </UpperP>
                    <UpperP>기간: {item.prfpd._text}</UpperP>
                  </UpperLI>
                );
              })}
            </UpperUL>
          </Upper>
        </BackgroudImg>
      </Container>

      <CategoryContainer>
        <Button onClick={() => setStartIndex(0)}>전체보기</Button>
        <Button onClick={() => handleCategoryChange(1)}>연극</Button>
        <Button onClick={() => handleCategoryChange(5)}>공연</Button>
        <Button onClick={() => handleCategoryChange(9)}>콘서트</Button>
        {/* <GeographyButton onClick={() => GeographyChange()}>
          위치기반
        </GeographyButton> */}
      </CategoryContainer>

      <Bottom>
        <StyledUL>
          {displayedData.map((item, index) => {
            if (!showAll && index >= 8) return null;
            return (
              <StyledLI key={index} onclick={() => onclick(item)}>
                <Link to={`/ticketing/${item.id}`}>
                  <StyledImage src={URL + item.poster._text} alt="포스터" />
                </Link>
                <StyledP>장르: {item.cate._text}</StyledP>
                <StyledP>지역: {item.area._text}</StyledP>
                <StyledP over className="over">
                  이름: {item.prfnm._text}
                </StyledP>
                <StyledP>기간: {item.prfpd._text}</StyledP>
              </StyledLI>
            );
          })}
        </StyledUL>
        {!showAll && <MoreButton onClick={handleShowAll}>더보기</MoreButton>}
      </Bottom>
    </>
  );
};

export default ViewAll;
