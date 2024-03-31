import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jsonData from "../../dummy/data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 900px;
  margin: 80px auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;
const Textbox = styled.div`
  display: flex;
  justify-content: left;
`;

const P1 = styled.span`
  font-size: 34px;
  font-weight: bold;
`;

const P2 = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #999999;
  margin-left: 20px;
  vertical-align: baseline;
  margin-top: 24px;
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

const HrBox = styled.div`
  border: 1px solid #999999;
  margin-top: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 30px;
`;

const EditButton = styled.button`
  background-color: #ffffff;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 1px solid black;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: black;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 1px solid black;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: black;
`;

const ListButton = styled.button`
  background-color: #fc1055;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 0;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: #ffffff;
`;

const TextArea = styled.textarea`
  width: 800px;
  height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const OutputArea = styled.div`
  width: 800px;
  height: 300px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background-color: #fc1055;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 0;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: #ffffff;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 1px solid black;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: black;
`;

const EditMyReview = () => {
  const { prfnmText } = useParams();
  const [editMode, setEditMode] = useState(false); // 수정 모드 여부
  const [editedContent, setEditedContent] = useState(""); // 수정된 리뷰 내용을 저장

  const data = jsonData;

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

  return (
    <div>
      {data?.boxofs?.boxof && (
        <Container>
          <Textbox>
            <P1>마이페이지 | </P1>
            <P2>나의 관람후기</P2>
          </Textbox>
          <hr />
          {data.boxofs.boxof.map(
            (item, index) =>
              item.prfnm._text === prfnmText && (
                <Content key={index}>
                  <P3>{item.prfnm._text}</P3>
                  <P4>리뷰 제목</P4>
                  <span>
                    작성자: {item.prfplcnm._text} | 작성일 : {item.prfpd._text}
                    {"    "}| 평점 : ★★★★★{"    "}
                  </span>
                  <HrBox />
                  {editMode ? (
                    <TextArea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    <OutputArea>
                      리뷰 내용을 데이터베이스에서 연결해서 수정하고 다시
                      보내주기. 현재는 콘솔출력 기능만 수행중
                    </OutputArea>
                  )}
                </Content>
              )
          )}
          <hr />
          <ButtonContainer>
            {editMode ? (
              <>
                <SaveButton onClick={handleSaveButtonClick}>저장</SaveButton>
                <CancelButton onClick={() => setEditMode(false)}>
                  취소
                </CancelButton>
              </>
            ) : (
              // 수정 모드가 아닌 경우
              <EditButton onClick={handleEditButtonClick}>수정</EditButton>
            )}
            <DeleteButton>삭제</DeleteButton>
            <ListButton>
              <Link to="/mypage">목록</Link>
            </ListButton>
          </ButtonContainer>
        </Container>
      )}
    </div>
  );
};

export default EditMyReview;
