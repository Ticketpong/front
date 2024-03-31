import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 40px;
  margin-right: 100px;
`;

const InputLabel = styled.label`
  width: 130px;
  margin-right: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  display: flex;
`;

const GrayInput = styled.input`
  background-color: white;
  width: 100%;
  height: 50px;
  flex: 1;
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

const RadioList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Labels = styled.label`
  margin-right: 20px;
`;

const ManageAdd = () => {
  const [manageInfo, setManageInfo] = useState({
    id: "",
    password: "",
    repassword: "",
    name: "",
    phone: "",
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
  const Star = () => {
    return <span style={{ color: "#fc1055", fontSize: "1.2em" }}>*</span>;
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
              placeholder="아이디를 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              비밀번호
              <Star />
            </InputLabel>
            <GrayInput
              type="password"
              name="password"
              value={manageInfo.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              비밀번호 확인
              <Star />
            </InputLabel>
            <GrayInput
              type="password"
              name="repassword"
              value={manageInfo.repassword}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
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
              placeholder="이름을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              연락처
              <Star />
            </InputLabel>
            <GrayInput
              type="tel"
              name="phone"
              value={manageInfo.phone}
              onChange={handleChange}
              placeholder="전화번호를 입력해주세요."
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
          <EndButton type="submit">취소</EndButton>
          <EndButton type="submit">완료</EndButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default ManageAdd;
