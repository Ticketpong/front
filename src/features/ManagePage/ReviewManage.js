import React, { useState } from "react";
import styled from "styled-components";
import reviewData from "../../dummy/reviews.json";
import showData from "../../dummy/show_detail.json";
import ReviewsTable from "./ReviewDetail";

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

function ReviewsManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openModal = (review) => {
    setIsOpen(true);
    setSelectedReview(review);
    console.log(review);
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

  return (
    <>
      <ReviewWrapper>
        {reviews.map((review) => {
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
