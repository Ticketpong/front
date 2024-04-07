import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../../../dummy/ReviewData.json";

const ITEMS_PER_PAGE = 2; // 페이지당 표시할 데이터의 개수

const Container = styled.div`
  hr {
    height: 1px;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;

  .imageContainer {
    margin-right: 40px;
  }

  .contentContainer {
    display: flex;
    flex-direction: column;
  }

  img {
    display: block;
    width: 230px;
    height: 270px;
    margin-bottom: 20px;
    object-fit: cover;
    border-radius: 12px;
  }

  p {
    font-size: 24px;
    margin: 0;
    align-items: center;
    padding-top: 16px;
  }
`;

const Ul = styled.div`
  margin-top: 20px;
  padding-left: 0;
`;

const ButtonContainer = styled.div`
  align-items: center;
  text-align: center;

  button {
    text-align: center;
    background-color: white;
    border: 0;
    font-size: 20px;
    border-radius: 20px;

    &:active,
    &:hover {
      background-color: #fc1055;
    }
  }
`;

const WriteBtn = styled.button`
  float: right;
  width: 120px;
  height: 50px;
  border-radius: 3px;
  color: #ffffff;
  background-color: #fc1055;
  border: none;
  font-size: 18px;
`;

const HrBox = styled.div`
  position: relative;
  width: 1580px;
  height: 320px;
`;

const Name = styled.span`
  margin-top: 15px;
  color: #999999;
  font-size: 18px;
  margin-bottom: 4px;
`;

const ReviewName = styled.span`
  color: black;
  font-size: 24px;
`;
const Rank = styled.span`
  color: #ffd700;
`;

const ReviewContent = styled.span`
  margin-top: 10px;
  color: #999999;
  font-size: 18px;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const CommuReview = ({ isLoggedIn }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const URL = "https://www.kopis.or.kr/";

  const jsonData = data;

  const rankStar = (num) => {
    const stars = [];

    for (let i = 0; i < num; i++) {
      stars.push(<Rank key={i}>★</Rank>);
    }

    return stars;
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    jsonData?.boxofs?.boxof?.length
  );

  const goToStartPage = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(jsonData?.boxofs?.boxof?.length / ITEMS_PER_PAGE)
      )
    );
  };

  const goToEndPage = () => {
    const totalPages = Math.ceil(
      jsonData?.boxofs?.boxof?.length / ITEMS_PER_PAGE
    );
    setCurrentPage(totalPages);
  };

  return (
    <Container>
      <hr style={{ border: "0", borderTop: "2px solid black" }} />
      <Ul>
        {jsonData?.boxofs?.boxof
          ?.slice(startIndex, endIndex)
          .map((item, index) => (
            <StyleLink to={`/reviewdetail/${item.prfnm._text}`}>
              <HrBox key={index}>
                <ListItem key={index}>
                  <div className="imageContainer">
                    {item.poster && (
                      <img src={URL + item.poster._text} alt="포스터" />
                    )}
                  </div>
                  <div className="contentContainer">
                    {item.prfnm && <Name>{item.prfnm._text}</Name>}
                    {item.prfnm && (
                      <ReviewName>{item.reviewname._text}</ReviewName>
                    )}
                    {item.rank && <p>{rankStar(item.rank._num)}</p>}
                    {item.review && (
                      <ReviewContent>내용: {item.review._text}</ReviewContent>
                    )}
                  </div>
                </ListItem>
                {index <= endIndex - 1 && <hr />}
              </HrBox>
            </StyleLink>
          ))}
      </Ul>
      <ButtonContainer>
        <button onClick={goToStartPage}>{"<<"}</button>
        <button onClick={goToPrevPage}>{"<"}</button>
        {Array.from(
          {
            length: Math.ceil(jsonData?.boxofs?.boxof?.length / ITEMS_PER_PAGE),
          },
          (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          )
        )}

        <button onClick={goToNextPage}>{">"}</button>
        <button onClick={goToEndPage}>{">>"}</button>
      </ButtonContainer>
      {isLoggedIn ? (
        <>
          <Link to="/writereview">
            <WriteBtn>후기 작성</WriteBtn>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <WriteBtn>후기 작성</WriteBtn>
        </Link>
      )}
    </Container>
  );
};

export default CommuReview;
