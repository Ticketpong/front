import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

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

const DeleteButton = styled.button`
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

const EditProfile = (props) => {
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
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isDaumPostcodeOpen, setIsDaumPostcodeOpen] = useState(false);

  useEffect(() => {
    // 회원 정보 가져오기 로직
    fetchUserInfo();
  }, [isLogined]);

  const fetchUserInfo = async () => {
    const response = await axios.post("http://localhost:8080/main/member", {
      id: props.Id,
    });

    const newData = response.data;
    setUserInfo((prevState) => ({
      ...prevState,
      id: newData.user_id,
      name: newData.user_name,
      phoneNumber: newData.user_phone,
      email: newData.user_email,
      address: newData.address,
      detailedAddress: newData.detailAddress,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmailDuplicationCheck = async () => {
    // 이메일 중복 확인 로직
    const response = await axios.get(
      "http://localhost:8080/signup/emailcheck",
      {
        email: userInfo.email,
      }
    );
    if (response.status === 200) {
      alert("사용 가능한 이메일입니다.");
      setIsEmailCheck(true);
    } else {
      alert("이미 사용 중인 이메일입니다.");
      setIsEmailCheck(false);
      userInfo.email = userInfo.email;
    }
  };

  const deletMember = async () => {
    // 회원 탈퇴 로직
    const response = await axios.delete("http://localhost:8080/main/delete", {
      id: userId,
    });
    if (response.status === 200) {
      alert("회원 탈퇴가 완료되었습니다.");
      setIsLogined(false);
      localStorage.removeItem("token");
    } else {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  const openDaumPostcode = () => {
    // 우편 검색 API 로직 (다음 우편번호 API)
    setIsDaumPostcodeOpen(true);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = data.addressType === "R" ? "" : data.bname;

    setUserInfo((prevState) => ({
      ...prevState,
      address: fullAddress,
    }));
    setIsDaumPostcodeOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원 정보 수정 처리 로직
    if (userInfo.password !== userInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (!isEmailCheck) {
      alert("이메일 중복 확인을 해주세요.");
    } else {
      const response = await axios.put("http://localhost:8080/main/edit", {
        id: userId,
        pw: userInfo.password,
        repw: userInfo.confirmPassword,
        email: userInfo.email,
        address: userInfo.address,
        detailAddress: userInfo.detailedAddress,
      });
      if (response.status === 200) {
        alert("회원 정보 수정이 완료되었습니다.");
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

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel>아이디</InputLabel>
            <GrayInput type="text" name="id" value={userInfo.id} readOnly />
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
            <InputLabel>이름</InputLabel>
            <GrayInput type="text" name="name" value={userInfo.name} readOnly />
          </InputContainer>
          <InputContainer>
            <InputLabel>연락처</InputLabel>
            <GrayInput
              type="text"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              readOnly
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
                readOnly
              />
              <Button type="button" onClick={openDaumPostcode}>
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
            <DeleteButton type="button" onClick={deletMember}>
              탈퇴하기
            </DeleteButton>
            <EndButton type="submit">회원 정보 수정</EndButton>
          </ButtonContainer>
        </Form>
        {/* 다음 우편번호 API */}
        {isDaumPostcodeOpen && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #000",
              width: "600px",
              height: "430px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() => setIsDaumPostcodeOpen(false)}
                style={{
                  float: "right",
                  marginRight: "10px",
                  padding: "0",
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "0",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                X
              </button>

              <DaumPostcode onComplete={handleComplete} autoClose />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default EditProfile;
