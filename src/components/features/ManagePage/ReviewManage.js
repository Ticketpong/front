import React, { useState } from "react";
import styled from "styled-components";
import reviewData from "../../../dummy/reviews.json";
import showData from "../../../dummy/show_detail.json";
import ReviewsTable from "./ReviewDetail";

const ITEMS_PER_PAGE = 2;

const ReviewWrapper = styled.div`
  padding: 20px 0;
  border-top: 2px solid #373a42;
  width: 100%;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 40px 0;
  position: relative;
`;

const PosterWarpper = styled.div`
  flex: 1;
  position: relative;
  max-width: 180px;
  height: 100%;
  margin-right: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover::after {
    content: "후기상세";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    opacity: 1;
  }

  &:hover img {
    filter: brightness(0.5);
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  border-radius: 12px;
`;

const ReviewContent = styled.div`
  flex: 3;
  p {
    color: #999999;
    font-size: 15px;
    font-weight: 500;
  }
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 3px;
  color: #ffffff;
  background-color: #fc1055;
  border: none;
  font-size: 15px;
  float: right;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
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

function ReviewsManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = (review) => {
    setIsOpen(true);
    setSelectedReview(review);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReview(null);
  };

  const reviews = reviewData;
  const shows = showData;

  const getShowInfo = (mt20id) => {
    return shows.find((show) => show.mt20id === mt20id) || {};
  };

  const handleDeleteReview = (pre_id) => {
    alert(`ID: ${pre_id} 리뷰를 삭제하시겠습니까?`);
  };

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ReviewWrapper>
        {paginatedReviews.map((review) => {
          const showInfo = getShowInfo(review.mt20id);
          return (
            <ReviewItem key={review.pre_id}>
              <ContentWrapper>
                <PosterWarpper onClick={() => openModal(review)}>
                  <PosterImage src={showInfo.poster} alt={showInfo.prfnm} />
                </PosterWarpper>
                <ReviewContent>
                  <p>
                    &lt;{showInfo.genrenm}&gt;
                    {showInfo.prfnm}
                  </p>
                  <h3>{review.pretitle}</h3>
                  <p>{review.precontent}</p>
                </ReviewContent>
              </ContentWrapper>
              <DeleteButton onClick={() => handleDeleteReview(review.pre_id)}>
                삭제
              </DeleteButton>
            </ReviewItem>
          );
        })}
      </ReviewWrapper>
      <ButtonContainer>
        <button onClick={() => goToPage(1)}>{"<<"}</button>
        <button onClick={() => goToPage(currentPage - 1)}>{"<"}</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)}>{">"}</button>
        <button onClick={() => goToPage(totalPages)}>{">>"}</button>
      </ButtonContainer>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <ModalContent>
            <ReviewsTable review={selectedReview} />
            <DeleteButton onClick={closeModal}>닫기</DeleteButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ReviewsManagement;
