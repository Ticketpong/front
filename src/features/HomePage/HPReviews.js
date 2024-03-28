import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../../dummy/data.json";

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
  .head {
    border-width: 4px;
    width: 70%;
    color: black;
  }
  .normal {
    border-width: 3px;
    width: 60%;
    color: gray;
  }

  .container {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 수직 가운데 정렬 */
    overflow-x: auto;
    white-space: nowrap;
    margin: 0 auto;
    margin-bottom: 0px;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .image {
    display: block;
    width: 270px;
    height: 340px;
    margin-bottom: 10px;
    object-fit: cover;
    margin-right: 100px;
    border-radius: 12px;
  }

  .text p {
    margin: 0;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis; /* 텍스트가 범위를 넘으면 생략 (...) */
    white-space: nowrap;
    max-width: 1200px;
  }

  .name {
    font-weight: bold;
  }
`;

const CenterHr = styled.hr`
  color: gray;
  height: 1px;
  width: 99%;
`;

const StyledViewAllButton = styled.button`
  margin-top: 100px;
  width: 240px;
  height: 60px;
  border-radius: 50px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  text-align: center;
  font-size: 24px;
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

const HPReviews = () => {
  // const [jsonData, setJsonData] = useState("");
  const URL = "https://www.kopis.or.kr/";

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

  return (
    <Container>
      <div className="container">
        <Strong>베스트 관람 후기</Strong>
        <hr className="head" />
        <ul className="container">
          <li className="item">
            {jsonData?.boxofs?.boxof?.[0]?.poster && (
              <img
                src={URL + jsonData.boxofs.boxof[0].poster._text}
                alt="포스터"
                className="image" // 이미지 스타일 클래스 적용
              />
            )}
            <div className="text">
              {jsonData?.boxofs?.boxof?.[0]?.cate && (
                <p>장르: {jsonData.boxofs.boxof[0].cate._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.prfnm && (
                <p className="name">
                  이름: {jsonData.boxofs.boxof[0].prfnm._text}
                </p>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.area && (
                <p>지역: {jsonData.boxofs.boxof[0].area._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[0]?.prfpd && (
                <p>기간: {jsonData.boxofs.boxof[0].prfpd._text}</p>
              )}
            </div>
          </li>
          <CenterHr />
        </ul>
        <ul className="container">
          <li className="item">
            {jsonData?.boxofs?.boxof?.[1]?.poster && (
              <img
                src={URL + jsonData.boxofs.boxof[1].poster._text}
                alt="포스터"
                className="image" // 이미지 스타일 클래스 적용
              />
            )}
            <div className="text">
              {jsonData?.boxofs?.boxof?.[1]?.cate && (
                <p>장르: {jsonData.boxofs.boxof[1].cate._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.prfnm && (
                <p className="name">
                  이름: {jsonData.boxofs.boxof[1].prfnm._text}
                </p>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.area && (
                <p>지역: {jsonData.boxofs.boxof[1].area._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[1]?.prfpd && (
                <p>기간: {jsonData.boxofs.boxof[1].prfpd._text}</p>
              )}
            </div>
          </li>
          <CenterHr />
        </ul>
        <ul className="container">
          <li className="item">
            {jsonData?.boxofs?.boxof?.[2]?.poster && (
              <img
                src={URL + jsonData.boxofs.boxof[2].poster._text}
                alt="포스터"
                className="image" // 이미지 스타일 클래스 적용
              />
            )}
            <div className="text">
              {jsonData?.boxofs?.boxof?.[2]?.cate && (
                <p>장르: {jsonData.boxofs.boxof[2].cate._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.prfnm && (
                <p className="name">
                  이름: {jsonData.boxofs.boxof[2].prfnm._text}
                </p>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.area && (
                <p>지역: {jsonData.boxofs.boxof[2].area._text}</p>
              )}
              {jsonData?.boxofs?.boxof?.[2]?.prfpd && (
                <p>기간: {jsonData.boxofs.boxof[2].prfpd._text}</p>
              )}
            </div>
          </li>
        </ul>
        <BottomBtn>
          <Link to="/community?selectedItem=2">
            <StyledViewAllButton>후기 전체보기</StyledViewAllButton>
          </Link>
        </BottomBtn>
      </div>
    </Container>
  );
};

export default HPReviews;
