import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import reviewJson from "../../dummy/reviews.json";
import showDetailJson from "../../dummy/show_detail.json";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const ITEMS_PER_PAGE = 2; // 페이지당 표시할 데이터의 개수

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 2px solid #373a42;
  hr {
    height: 1px;
  }
  ul {
    padding: 0;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start; /* 세로 정렬 시작점으로 설정 */
  border-bottom: 1px solid #999999;

  .imageContainer {
    margin-right: 20px; /* 이미지와 나머지 내용 사이 간격 조절 */
    min-width: 230px;
  }

  img {
    display: block;
    height: 270px;
    margin: 10px auto;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 나열하도록 설정 */

  span {
    color: #999999;
    font-size: 15px;
    padding: 10px 0;
  }

  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    text-align: left;
    padding: 10px 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  height: 30px;
  align-items: center;
  justify-content: center;

  button {
    text-align: center;
    background-color: white;
    border: none;
    padding: 0;
    margin: 0 6px;
    width: 24px;
    height: 30px;

    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const MoveBtn = styled.button`
  text-align: center;
  background-color: white;
  border: 0;
  font-size: 20px;
  border-radius: 20px;
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
  width: 100%;
  height: 320px;
`;

const MyReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //user0001일 때 가정
  const reviewData = reviewJson.filter((item) => item.user_id === "user0001");
  const showDetailData = showDetailJson;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, reviewData.length);

  const goToStartPage = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(reviewData?.length / ITEMS_PER_PAGE))
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
      <ul>
        {reviewData?.slice(startIndex, endIndex).map((item, index) => (
          <HrBox key={index}>
            <ListItem key={index}>
              <div className="imageContainer">
                <Link to={`/editmyreview/${item.pre_id}`}>
                  {showDetailData &&
                    showDetailData.find((data) => data.mt20id === item.mt20id)
                      ?.poster && (
                      <img
                        src={
                          showDetailData.find(
                            (data) => data.mt20id === item.mt20id
                          )?.poster
                        }
                        alt="포스터"
                      />
                    )}
                </Link>
              </div>
              <ContentContainer>
                {item.mt20id && (
                  <span>
                    &lt;
                    {showDetailData &&
                      showDetailData.find((data) => data.mt20id === item.mt20id)
                        ?.genrenm}
                    &gt;
                    {showDetailData &&
                      showDetailData.find((data) => data.mt20id === item.mt20id)
                        ?.prfnm}
                  </span>
                )}
                {item.pretitle && <p>{item.pretitle}</p>}
                {item.precontent && <span>{item.precontent}</span>}
              </ContentContainer>
            </ListItem>
          </HrBox>
        ))}
      </ul>
      <ButtonContainer>
        <MoveBtn onClick={goToStartPage}>
          <MdKeyboardDoubleArrowLeft color="#999999" />
        </MoveBtn>
        <MoveBtn onClick={goToPrevPage}>
          <MdKeyboardArrowLeft color="#999999" />
        </MoveBtn>
        {Array.from(
          {
            length: Math.ceil(reviewData?.length / ITEMS_PER_PAGE),
          },
          (_, i) => (
            <strong key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </strong>
          )
        )}

        <MoveBtn onClick={goToNextPage}>
          <MdKeyboardArrowRight color="#999999" />
        </MoveBtn>
        <MoveBtn onClick={goToEndPage}>
          {" "}
          <MdKeyboardDoubleArrowRight color="#999999" />
        </MoveBtn>
      </ButtonContainer>
      <Link to="/writereview">
        <WriteBtn>후기 작성</WriteBtn>
      </Link>
    </Container>
  );
};

export default MyReview;
