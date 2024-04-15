import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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

const EditManage = ({ manageId }) => {
  const [manageInfo, setManageInfo] = useState({
    id: "",
    password: "",
    repassword: "",
    name: "",
    phoneNumber: "",
    auth: "",
    role: "",
  });

  useEffect(() => {
    getManageInfo();
  }, []);

  const getManageInfo = async () => {
    const response = await axios.post(
      "http://localhost:8080/manage/manageMain/manageProfile",
      {
        id: manageId,
      }
    );
    const newData = response.data[0];

    setManageInfo({
      id: newData.manage_id,
      name: newData.manage_name,
      phoneNumber: newData.manage_phone,
      auth: newData.manage_auth,
      role: newData.manage_part,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManageInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUrl = "http://localhost:8080/manage/manageMain/manageEdit";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원 정보 수정 처리 로직
    if (manageInfo.password !== manageInfo.repassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      const response = await axios.put(submitUrl, {
        id: manageInfo.id,
        pw: manageInfo.password,
        repw: manageInfo.repassword,
        name: manageInfo.name,
        phone: manageInfo.phoneNumber,
        auth: manageInfo.auth,
        part: manageInfo.role,
      });
      if (response.status === 200) {
        alert("회원 정보가 수정되었습니다.");
        window.location.reload();
      } else {
        alert("회원 정보 수정에 실패했습니다.");
        window.location.reload();
      }
    }
  };

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
        <Form>
          <InputContainer>
            <InputLabel>
              아이디
              <Star />
            </InputLabel>
            <GrayInput type="text" name="id" value={manageInfo.id} readOnly />
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
              placeholder="이름을 입력하세요."
              readOnly
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
                value="주관리자"
                checked={manageInfo.auth === "주관리자"}
                id="mainAdmin"
                onChange={handleChange}
              />
              <Labels for="mainAdmin">주관리자</Labels>
            </RadioList>
            <RadioList>
              <Input
                type="radio"
                name="auth"
                value="부관리자"
                checked={manageInfo.auth === "부관리자"}
                id="secondAdmin"
                onChange={handleChange}
              />
              <Labels for="secondAdmin">부관리자</Labels>
            </RadioList>
            <RadioList>
              <Input
                type="radio"
                name="auth"
                value="일반관리자"
                checked={manageInfo.auth === "일반관리자"}
                id="admin"
                onChange={handleChange}
              />
              <Labels for="admin">일반관리자</Labels>
            </RadioList>
          </InputContainer>
          <InputContainer>
            <InputLabel>
              직급
              <Star />
            </InputLabel>
            <Input
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
          <CancelButton type="button" onClick={onClickCancel}>
            취소
          </CancelButton>
          <EndButton type="submit" onClick={handleSubmit}>
            회원 정보 수정
          </EndButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default EditManage;
