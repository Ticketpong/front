import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../../dummy/ReviewData.json";

const Strong = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 42px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 45px;
  font-family: "Noto Sans Korean";
`;

const Container = styled.div`
  padding-left: 0;
  .head {
    border-width: 3px;
    min-width: 1530px;
    max-width: 1530px;
    color: black;
    padding-left: 100px;
    margin-bottom: 10px;
  }
  .normal {
    border-width: 3px;
    width: 60%;
    color: gray;
  }

  .name {
    font-weight: bold;
  }
`;

const UlContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 수직 가운데 정렬 */
  margin: 0 auto;
  width: 1580px;
  padding-left: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  display: block;
  min-width: 270px;
  height: 340px;
  margin: 17px 35px 17px 180px;
  object-fit: cover;
  border-radius: 12px;
`;

const Text = styled.div`
  max-width: 1200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 최대 줄 수 설정 */
  text-overflow: ellipsis;
  white-space: normal;
`;

const CenterHr = styled.hr`
  color: gray;
  height: 1px;
  min-width: 1580px;
  max-width: 1580px;
`;

const StyledViewAllButton = styled.button`
  margin-top: 100px;
  min-width: 240px;
  height: 60px;
  border-radius: 50px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 30px auto 30px;
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

const BottomBtn = styled.div`
  align-items: center;
  text-align: center;
  margin: 40px auto;
`;

const Work = styled.span`
  font-size: 24px;
  color: #999999;
`;

const Name = styled.span`
  font-size: 32px;
  font-weight: bold;
`;

const Content = styled.span`
  font-size: 24px;
  color: #999999;
`;

const Rank = styled.span`
  color: #ffd700;
  font-size: 24px;
`;

const HPReviews = () => {
  const URL = "https://www.kopis.or.kr/";
  const jsonData = data;

  const rankStar = (num) => {
    const stars = [];

    for (let i = 0; i < num; i++) {
      stars.push(<Rank key={i}>★</Rank>);
    }

    return stars;
  };

  return (
    <Container>
      <div className="container">
        <Strong>베스트 관람 후기</Strong>
        <hr className="head" />
        <UlContainer>
          <Li>
            {jsonData?.boxofs?.boxof?.[0]?.poster && (
              <Img
                src={URL + jsonData.boxofs.boxof[0].poster._text}
                alt="포스터"
                className="image"
              />
            )}
            <Text>
              {jsonData?.boxofs?.boxof?.[0]?.prfnm && (
                <Work>{jsonData.boxofs.boxof[0].prfnm._text}</Work>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.reviewname && (
                <Name>{jsonData.boxofs.boxof[0].reviewname._text}</Name>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.rank && (
                <p>{rankStar(jsonData.boxofs.boxof[0].rank._num)}</p>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.review && (
                <Content> {jsonData.boxofs.boxof[0].review._text}</Content>
              )}
            </Text>
          </Li>
          <CenterHr />
        </UlContainer>
        <UlContainer>
          <Li>
            {jsonData?.boxofs?.boxof?.[1]?.poster && (
              <Img
                src={URL + jsonData.boxofs.boxof[1].poster._text}
                alt="포스터"
                className="image"
              />
            )}
            <Text>
              {jsonData?.boxofs?.boxof?.[1]?.prfnm && (
                <Work>{jsonData.boxofs.boxof[1].prfnm._text}</Work>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.reviewname && (
                <Name className="name">
                  {jsonData.boxofs.boxof[1].reviewname._text}
                </Name>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.rank && (
                <p>{rankStar(jsonData.boxofs.boxof[1].rank._num)}</p>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.review && (
                <Content> {jsonData.boxofs.boxof[1].review._text}</Content>
              )}
            </Text>
          </Li>
          <CenterHr />
        </UlContainer>
        <UlContainer>
          <Li>
            {jsonData?.boxofs?.boxof?.[2]?.poster && (
              <Img
                src={URL + jsonData.boxofs.boxof[2].poster._text}
                alt="포스터"
                className="image"
              />
            )}
            <Text>
              {jsonData?.boxofs?.boxof?.[2]?.prfnm && (
                <Work>{jsonData.boxofs.boxof[2].prfnm._text}</Work>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.reviewname && (
                <Name>{jsonData.boxofs.boxof[2].reviewname._text}</Name>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.rank && (
                <p>{rankStar(jsonData.boxofs.boxof[2].rank._num)}</p>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.review && (
                <Content> {jsonData.boxofs.boxof[2].review._text}</Content>
              )}
            </Text>
          </Li>
        </UlContainer>
        <BottomBtn>
          <Link to="/community?selectedItem=3">
            <StyledViewAllButton>후기 전체보기</StyledViewAllButton>
          </Link>
        </BottomBtn>
      </div>
    </Container>
  );
};

export default HPReviews;
