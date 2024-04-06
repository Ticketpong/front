import React, { useState, useEffect } from "react";
import styled from "styled-components";

import reviewData from "../../../dummy/reviews.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewList = styled.ul`
  margin-top: 23px;
  list-style: none;
`;
const ReviewItem = styled.li`
  position: relative;
  border-bottom: 1px solid #ccc;
  padding: 24px 100px 27px 0;

  .stars {
    margin-bottom: 10px;
    position: relative;
    width: 100px;
    height: 14px;
    font-size: 14px;
  }
  .commentTitle {
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    color: #242428;
  }
  .comment {
    font-size: 15px;
    line-height: 22px;
    color: #242428;
  }
`;
const CommentInfo = styled.div`
  margin-top: 14px;
  font-size: 14px;

  .commentId {
    display: inline-block;
    font-weight: 600;
    line-height: 22px;
    color: #666666;
  }
  .commentDate {
    position: relative;
    padding-left: 10px;
  }
`;

const TicketingReview = ({ mt20id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // mt20id에 해당하는 리뷰만 필터링
    const filteredReviews = reviewData.filter(
      (review) => review.mt20id === mt20id
    );
    setReviews(filteredReviews);
  }, [mt20id]);

  const renderStars = (starCount) => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <h2>관람 후기</h2>
      <hr />
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>
            <div className="stars">{renderStars(review.prestar)}</div>
            <p className="commentTitle">{review.pretitle}</p>
            <p className="comment">{review.precontent}</p>
            <CommentInfo>
              <span className="commentId">{review.user_id}</span>
              <span className="commentDate">{formatDate(review.predate)}</span>
            </CommentInfo>
          </ReviewItem>
        ))}
      </ReviewList>
    </>
  );
};

export default TicketingReview;
