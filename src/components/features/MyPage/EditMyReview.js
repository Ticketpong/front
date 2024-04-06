import React, { useState } from "react";
import { useParams } from "react-router-dom";
import reviewJsonData from "../../dummy/reviews.json";
import showDetailJson from "../../dummy/show_detail.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 1100px;
  margin: 80px auto;
  padding: 100px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  border-top: 2px solid #373a42;
  padding-top: 15px;
`;
const Textbox = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const P1 = styled.span`
  font-size: 34px;
  font-weight: bold;
`;

const P2 = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #373a42;
  margin-left: 20px;
  vertical-align: baseline;
  margin-top: 24px;
  border-left: 2px solid #373a42;
  padding-left: 10px;
`;

const P3 = styled.span`
  color: #999999;
  font-size: 18px;
  margin-bottom: 10px;
`;

const P4 = styled.span`
  font-size: 34px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 30px;
`;
const Defaultbutton = styled.button`
  width: 90px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #999999;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: black;

  &.PButton {
    background-color: #fc1055;
    border: 0;
    color: #ffffff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const OutputArea = styled.div`
  width: 100%;
  margin: 30px 0;
  border: 1px solid #999999;
  border-width: 1px 0;
  padding: 50px 0;
`;

const ReviewInfo = styled.div`
  width: 100%;
  span {
    padding: 0 15px;
    border-left: 1px solid #373a42;

    &:first-child {
      padding-left: 0;
      border: none;
    }
  }
`;

const EditMyReview = () => {
  const { prfnmText } = useParams();
  const [editMode, setEditMode] = useState(false); // 수정 모드 여부
  const [editedContent, setEditedContent] = useState(""); // 수정된 리뷰 내용을 저장

  //user0001일 때 가정
  const reviewData = reviewJsonData.filter(
    (item) => item.user_id === "user0001"
  );
  const showDetailData = showDetailJson;

  // 수정 버튼 클릭 시
  const handleEditButtonClick = () => {
    setEditMode(true);
    setEditedContent("수정할 내용 입력");
  };

  // 저장 버튼 클릭 시
  const handleSaveButtonClick = () => {
    console.log("수정된 리뷰 내용:", editedContent);
    setEditMode(false);
  };

  const renderStars = (starCount) => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    // "yyyymmddhhmmss"에서 "yy.mm.dd" 형식으로 변환
    const formattedDate =
      dateString.substring(2, 4) +
      "." +
      dateString.substring(4, 6) +
      "." +
      dateString.substring(6, 8);
    return formattedDate;
  };

  const encryptUserId = (userId) => {
    const encrypted = userId.slice(0, -3) + "***";
    return encrypted;
  };

  return (
    <div>
      {reviewData && (
        <Container>
          <Textbox>
            <P1>마이페이지</P1>
            <P2>나의 관람 후기</P2>
          </Textbox>

          {reviewData.map(
            (item, index) =>
              item.pre_id === prfnmText && (
                <Content key={index}>
                  <P3>
                    {item.mt20id && (
                      <span>
                        &lt;
                        {showDetailData &&
                          showDetailData.find(
                            (data) => data.mt20id === item.mt20id
                          )?.genrenm}
                        &gt;
                        {showDetailData &&
                          showDetailData.find(
                            (data) => data.mt20id === item.mt20id
                          )?.prfnm}
                      </span>
                    )}
                  </P3>
                  <P4>{item.pretitle}</P4>
                  <ReviewInfo>
                    <span>작성자 {encryptUserId(item.user_id)}</span>
                    <span>작성일 {formatDate(item.predate)}</span>
                    <span>평점 {renderStars(item.prestar)}</span>
                  </ReviewInfo>

                  {editMode ? (
                    <TextArea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    <OutputArea>{item.precontent}</OutputArea>
                  )}
                </Content>
              )
          )}

          <ButtonContainer>
            {editMode ? (
              <>
                <Defaultbutton
                  className="PButton"
                  onClick={handleSaveButtonClick}
                >
                  저장
                </Defaultbutton>
                <Defaultbutton onClick={() => setEditMode(false)}>
                  취소
                </Defaultbutton>
              </>
            ) : (
              // 수정 모드가 아닌 경우
              <Defaultbutton onClick={handleEditButtonClick}>
                수정
              </Defaultbutton>
            )}
            <Defaultbutton>삭제</Defaultbutton>
            <Defaultbutton className="PButton">
              <Link
                to="/mypage"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                목록
              </Link>
            </Defaultbutton>
          </ButtonContainer>
        </Container>
      )}
    </div>
  );
};

export default EditMyReview;
