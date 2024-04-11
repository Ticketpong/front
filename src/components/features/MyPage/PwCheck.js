import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axiosWithAuth from "../../base/axiosWithAuth";
import axios from "axios";
import EditProfile from "./EditProfile";

const Container = styled.div`
  width: 900px;
  margin: 80px auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PwCheck = () => {
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [password, setPassword] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false); //수정페이지 보여주기

  //useId,isLogined 가져오기
  useEffect(() => {
    fetchStatusLogin();
  }, []);

  const fetchStatusLogin = async () => {
    const response = await axiosWithAuth().get(
      "http://localhost:8080/login/profile"
    ); //로그인 상태 확인
    const { id, isLogined } = response.data;
    if (isLogined) {
      setUserId(id);
      setIsLogined(isLogined);
    } else {
      console.log("로그인 상태가 아닙니다.");
    }
  };

  //handleChange
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const editConfirm = async () => {
    // 비밀번호 확인 로직
    const response = await axios.post("http://localhost:8080/main/pwCheck", {
      id: userId,
      pw: password,
    });

    const result = response.data;

    console.log(result);

    if (result === true) {
      alert("비밀번호가 확인되었습니다.");
      setShowEditProfile(true); //수정페이지 보여주기
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      window.location.reload();
    }
  };
  return (
    <>
      <hr />
      <Container>
        {!showEditProfile ? (
          <>
            <InputContainer>
              <InputLabel>비밀번호</InputLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요."
              />
            </InputContainer>
            <ButtonContainer>
              <Button type="submit" onClick={editConfirm}>
                확인
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <EditProfile Id={userId} />
        )}
      </Container>
    </>
  );
};

export default PwCheck;
