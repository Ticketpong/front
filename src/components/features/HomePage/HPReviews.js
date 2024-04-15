import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import LikeIconImg from "../../../assets/homeImg/free-icon-like-179655.png";
import { FcLike } from "react-icons/fc";

const Strong = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 42px;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: "Noto Sans Korean";
`;

const Container = styled.div`
  padding-left: 0;
  margin-bottom: 120px;
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

const HeadHr = styled.hr`
  background-color: black;
  height: 2px;
  min-width: 1540px;
  max-width: 1540px;
`;
const UlContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 수직 가운데 정렬 */
  margin: 0 auto;
  min-width: 1540px;
  max-width: 1540px;
  padding-left: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #999999;
  justify-content: space-between;
`;

const Img = styled.div`
  display: block;
  min-width: 270px;
  max-width: 270px;
  height: 340px;
  margin: 17px 35px 17px 120px;
  object-fit: cover;
  border-radius: 12px;
  img {
    min-height: 100%;
    max-height: 100%;
    min-width: 100%;
    max-width: 100%;
    border-radius: 12px;
  }
`;

const Text = styled.div`
  flex-grow: 1;
  margin-top: 50px;
  min-height: 320px;
  max-height: 320px;
  min-width: 1100px;
  max-width: 1100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 최대 줄 수 설정 */
  text-overflow: ellipsis;
  white-space: normal;
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

const LikeIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 12px;
`;

const LikeCount = styled.span`
  font-weight: bold;
  font-size: 21px;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

const HPReviews = () => {
  const URL = "http://localhost:8080/review/recommandList";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const newData = response.data.map((item) => ({
        ...item,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

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
        <HeadHr />
        <UlContainer>
          {data?.slice(0, 3).map((item, index) => (
            <Li key={index}>
              {item.poster && (
                <Img>
                  <img src={item.poster} alt="포스터" />
                </Img>
              )}
              <Text>
                {item.prfnm && <Work>{item.prfnm}</Work>}
                {item.pretitle && <Name>{item.pretitle}</Name>}
                {item.prestar && <p>{rankStar(item.prestar)}</p>}
                {item.precontent && <Content>{item.precontent}</Content>}
                <LikeBox>
                  {/* <LikeIcon src={LikeIconImg} alt="좋아요 아이콘" /> */}
                  <FcLike size="35" />
                  <LikeCount> {item.recommend}</LikeCount>
                </LikeBox>
              </Text>
            </Li>
          ))}
        </UlContainer>
        <BottomBtn>
          <Link to="/community">
            <StyledViewAllButton>후기 전체보기</StyledViewAllButton>
          </Link>
        </BottomBtn>
      </div>
    </Container>
  );
};

export default HPReviews;
