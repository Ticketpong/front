import styled from "styled-components";
import React, { useState } from "react";

const Container = styled.div`
  width: 900px;
  margin: 80px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
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
  padding: 5px;
`;

const GrayInput = styled.input`
  background-color: #f6f8f7;
  flex: 1;
  padding: 5px;
  border: 1px solid #999999;
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

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    detailedAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmailDuplicationCheck = () => {
    // 이메일 중복 확인 로직
  };

  const handleAddressSearch = () => {
    // 주소 검색 로직
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
              value={userInfo.id}
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
              value={userInfo.password}
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
              value={userInfo.confirmPassword}
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
              value={userInfo.name}
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
              value={userInfo.phoneNumber}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              이메일
              <Star />
            </InputLabel>
            <InputWithButtonContainer>
              <Input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="예:example@email.com"
              />
              <Button type="button" onClick={handleEmailDuplicationCheck}>
                중복 확인
              </Button>
            </InputWithButtonContainer>
          </InputContainer>
          <InputContainer>
            <InputLabel>
              주소
              <Star />
            </InputLabel>
            <InputWithButtonContainer>
              <Input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                placeholder="예: 서울특별시 강남구 연주로 508"
              />
              <Button type="button" onClick={handleAddressSearch}>
                주소 검색
              </Button>
            </InputWithButtonContainer>
          </InputContainer>
          <InputContainer>
            <InputLabel></InputLabel>
            <Input
              type="text"
              name="detailedAddress"
              value={userInfo.detailedAddress}
              onChange={handleChange}
              placeholder="상세 주소를 입력하세요."
            />
          </InputContainer>
          <HrDiv />
          <ButtonContainer>
            <EndButton type="submit">탈퇴하기</EndButton>
            <EndButton type="submit">회원 정보 수정</EndButton>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};

export default EditProfile;
