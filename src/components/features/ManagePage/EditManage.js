import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 80px auto;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 100px;
  margin-right: 100px;
`;

const InputLabel = styled.label`
  width: 130px;
  margin-right: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  padding-left: 10px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  border-radius: 3px;
`;

const GrayInput = styled.input`
  background-color: #f6f8f7;
  flex: 1;
  height: 40px;
  padding-left: 10px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  border-radius: 3px;
`;
const InputWithButtonContainer = styled.div`
  display: flex;
  flex: 1;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  width: 130px;
  height: 60px;
  border-radius: 3px;
  background-color: #ffffff;
  color: #fc1055;
  border: 1px #fc1055 solid;
  font-size: 18px;
`;
const HrDiv = styled.div`
  border: 1px solid #999999;
  width: 100%;
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const EndButton = styled.button`
  background-color: #fc1055;
  color: #fff;
  width: 250px;
  height: 70px;
  border-radius: 3px;
  border: 0;
  font-size: 24px;
  margin-left: 50px;
  margin-right: 50px;
`;

const CancelButton = styled.button`
  background-color: #999999;
  color: #fff;
  width: 250px;
  height: 70px;
  border-radius: 3px;
  border: 0;
  font-size: 24px;
  margin-left: 50px;
  margin-right: 50px;
`;

const RadioList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Labels = styled.label`
  margin-right: 20px;
`;

const EditManage = ({ manage_id }) => {
  const [manageInfo, setManageInfo] = useState({
    id: manage_id,
    password: "",
    repassword: "",
    name: "",
    phoneNumber: "",
    auth: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManageInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원 정보 수정 처리 로직
  };

  const deleteClick = () => {
    // 회원 탈퇴 처리 로직
  };

  const submitUrl = "http://localhost:8080/manage/manageMain/manageEdit";

  const Star = () => {
    return <span style={{ color: "#fc1055", fontSize: "1.2em" }}>*</span>;
  };

  const navigate = useNavigate();

  const onClickCancel = () => {
    navigate(0);
  };

  return (
    <>
      <hr />
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel>
              아이디
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              name="id"
              value={manageInfo.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              비밀번호
              <Star />
            </InputLabel>
            <Input
              type="password"
              name="password"
              value={manageInfo.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              비밀번호 확인
              <Star />
            </InputLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={manageInfo.repassword}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              이름
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              name="name"
              value={manageInfo.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              연락처
              <Star />
            </InputLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={manageInfo.phoneNumber}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              권한
              <Star />
            </InputLabel>
            <RadioList>
              <Input
                type="radio"
                name="auth"
                value={manageInfo.auth}
                id="mainAdmin"
              />
              <Labels for="mainAdmin">주관리자</Labels>
            </RadioList>
            <RadioList>
              <Input
                type="radio"
                name="auth"
                value={manageInfo.auth}
                id="secondAdmin"
              />
              <Labels for="secondAdmin">부관리자</Labels>
            </RadioList>
            <RadioList>
              <Input
                type="radio"
                name="auth"
                value={manageInfo.auth}
                id="admin"
              />
              <Labels for="admin">일반관리자</Labels>
            </RadioList>
          </InputContainer>
          <InputContainer>
            <InputLabel>
              직급
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              name="role"
              value={manageInfo.role}
              onChange={handleChange}
              placeholder="직급을 입력해주세요."
            />
          </InputContainer>
        </Form>
        <HrDiv />
        <ButtonContainer>
          <CancelButton type="submit" onClick={onClickCancel}>
            취소
          </CancelButton>
          <EndButton type="submit">회원 정보 수정</EndButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default EditManage;
