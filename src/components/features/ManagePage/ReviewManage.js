//후기관리

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewsTable from "./ReviewDetail";
import axios from "axios";
import axiosWithAuth from "../../../components/base/axiosWithAuth";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

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

const Button = styled.button`
  width: 70px;
  height: 36px;
  margin-right: 15px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  border-radius: 3px;
`;

const AddButton = styled.button`
  width: 120px;
  height: 51px;
  border-radius: 3px;
  background-color: #fc1055;
  color: white;
  border: none;
  position: absolute;
  right: 10%;
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
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLogined, setIsLogined] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axiosWithAuth().get(
          "http://localhost:8080/manage/profile"
        );
        const { id, isLogined } = response.data;
        if (isLogined) {
          setUserId(id);
          setIsLogined(true);
        }
      } catch (error) {
        console.error("로그인 상태를 확인하는 동안 오류 발생:", error);
      }
    };
    fetchLoginStatus();
  }, []);

  const openModal = (review) => {
    setIsOpen(true);
    setSelectedReview(review);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/review/recentList`
      );
      const newReviews = response.data.map((item) => ({
        ...item,
      }));
      setReviews(newReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const url = `http://localhost:8080/review/delete`;

  const handleDeleteReview = async (pre_id) => {
    try {
      const response = await axios.post(url, { pre_id: pre_id });
      if (response) {
        alert(`ID: ${pre_id} 리뷰를 삭제하시겠습니까?`);
        fetchData();
      } else {
        alert("리뷰 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 페이징 구현
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, reviews.length);

  const goToStartPage = () => setCurrentPage(1);
  const goToPrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(reviews.length / ITEMS_PER_PAGE))
    );
  const goToEndPage = () =>
    setCurrentPage(Math.ceil(reviews.length / ITEMS_PER_PAGE));

  return (
    <>
      <ReviewWrapper>
        {reviews.slice(startIndex, endIndex).map((review, index) => {
          return (
            <ReviewItem key={review.pre_id}>
              <ContentWrapper>
                <PosterWarpper onClick={() => openModal(review)}>
                  <PosterImage src={review.poster} alt={review.prfnm} />
                </PosterWarpper>
                <ReviewContent>
                  <p>
                    &lt;{review.genrenm}&gt;
                    {review.prfnm}
                    &lt;{review.genrenm}&gt;
                    {review.prfnm}
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
      {/* 페이지네이션 버튼 */}
      <ButtonContainer>
        <button onClick={goToStartPage}>
          <MdKeyboardDoubleArrowLeft color="#999999" />
        </button>
        <button onClick={goToPrevPage}>
          <MdKeyboardArrowLeft color="#999999" />
        </button>
        {Array.from(
          { length: Math.ceil(reviews.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        <button onClick={goToNextPage}>
          <MdKeyboardArrowRight color="#999999" />
        </button>
        <button onClick={goToEndPage}>
          <MdKeyboardDoubleArrowRight color="#999999" />
        </button>
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
