import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Head = styled.span`
  font-size: 34px;
  font-weight: 500;
`;

const FormContainer = styled.div`
  width: 800px;
  height: 700px;
  margin: 100px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const PerformanceBox = styled.div`
  width: 100%;
  height: 25px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Star = styled.span`
  font-size: 20px;
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
  cursor: pointer;
`;

const Hr = styled.hr`
  margin-bottom: 40px;
`;

const CancelBtn = styled.button`
  width: 250px;
  height: 70px;
  font-size: 24px;
  padding: 10px 20px;
  background-color: #666666;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 50px;
  margin-right: 50px;
`;

const RegisterBtn = styled.button`
  width: 250px;
  height: 70px;
  font-size: 24px;
  padding: 10px 20px;
  background-color: #fc1055;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 50px;
  margin-right: 50px;
`;
const WriteReview = () => {
  // const { imp_uid } = useParams(); // 예매 id
  const [performance, setPerformance] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const bookingData = useLocation();
  const data = bookingData.state[0];
  // console.log(data);
  const [review, setReview] = useState({
    performance: "",
    rating: 0,
    title: "",
    comment: "",
  });

  const handleRatingChange = (value) => {
    setRating(value);
  };

  // 입력한 후기 데이터 저장하는 부분
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      performance: data.showName,
      rating,
      title,
      comment,
    });

    // 제출 후 상태 초기화
    setPerformance("");
    setRating(0);
    setTitle("");
    setComment("");
  };

  return (
    <FormContainer>
      <Head>후기 작성</Head>
      <hr />
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label html="performance">공연명</Label>
          <PerformanceBox>{data.showName}</PerformanceBox>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rating">평점</Label>
          <RatingContainer>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                filled={index < rating}
                onClick={() => handleRatingChange(index + 1)}
              >
                ★
              </Star>
            ))}
          </RatingContainer>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="comment">한줄평</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </FormGroup>
        <Hr />
        <Link to="/mypage">
          <CancelBtn>작성 취소</CancelBtn>
        </Link>
        <RegisterBtn type="submit">후기 작성</RegisterBtn>
      </form>
    </FormContainer>
  );
};

export default WriteReview;
