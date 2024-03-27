import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "../../dummy/data.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
  text-align: center;
  align-items: center;
`;

const BackgroudImg = styled.image`
  background-image: url("/img/img1.jpg");
  background-size: cover;
  background-position: top;
  align-items: center;
  height: 15%;
  width: 100%;
  overflow: hidden;
`;

// ======================================================================================================================
// 상단 부분
const Upper = styled.div`
  margin-top: 100px;
`;

const ShortHr = styled.hr`
  width: 50px;
  height: 3px;
`;
const All = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: center;
  align-items: center;
  margin: 10px auto;
`;

const UpperUL = styled.ul`
  display: inline-block;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 100px 0;
  flex-wrap: wrap;
`;

const UpperLI = styled.li`
  flex: 0 0 calc(20% - 20px);
  margin: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
`;

const UpperImage = styled.img`
  display: block;
  width: 200px;
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

const Rank = styled.span`
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: none;
  color: white;
  padding: 5px;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 120px;
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

const MoreButton = styled.button`
  width: 240px;
  height: 60px;
  background-color: #ffffff;
  color: #fc1055;
  border: 1px solid #fc1055;
  padding: 10px 20px;
  margin-top: 100px;
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

// =============================================================================================================
// 하단 부분

const Bottom = styled.div`
  width: 60%;
`;

const StyledUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const StyledLI = styled.li`
  flex: 0 0 calc(20% - 20px);
  margin: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 40px;
  vertical-align: top;
  margin-right: 60px;
`;

const StyledImage = styled.img`
  display: block;
  width: 320px;
  height: 420px;
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
  max-width: ${(props) => (props.over ? "350px" : "inherit")};
`;

// =============================================================================================== //
// 데이터 처리 부문

const ViewAll = () => {
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

  const getAllData = () => {
    return jsonData?.boxofs?.boxof || [];
  };

  const getDisplayedData = () => {
    if (startIndex === 0) {
      return getAllData();
    } else {
      return jsonData?.boxofs?.boxof?.slice(startIndex, startIndex + 4) || [];
    }
  };

  const displayedData = getDisplayedData();

  const handleCategoryChange = (start) => {
    setStartIndex(start);
  };

  return (
    <Container>
      <BackgroudImg>
        <Upper>
          <All>공연 / 전시</All>
          <ShortHr />
          <UpperUL>
            {displayedData.map((item, index) => {
              if (!showAll && index >= 5) return null;
              return (
                <UpperLI key={index}>
                  <ImageContainer>
                    <UpperImage src={URL + item.poster._text} alt="포스터" />
                    <Rank>{startIndex + index + 1}</Rank>
                  </ImageContainer>
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

      <div>
        <Button onClick={() => setStartIndex(0)}>전체보기</Button>
        <Button onClick={() => handleCategoryChange(1)}>연극</Button>
        <Button onClick={() => handleCategoryChange(5)}>공연</Button>
        <Button onClick={() => handleCategoryChange(9)}>콘서트</Button>
      </div>

      <Bottom>
        <StyledUL>
          {displayedData.map((item, index) => {
            if (!showAll && index >= 12) return null;
            return (
              <StyledLI key={index}>
                <StyledImage src={URL + item.poster._text} alt="포스터" />
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
      </Bottom>
      {!showAll && <MoreButton onClick={handleShowAll}>더보기</MoreButton>}
    </Container>
  );
};

export default ViewAll;
