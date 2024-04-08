import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/headerImg/logo.png";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 760px;
  height: auto;
  margin: 0 auto;
  margin-top: 60px;
`;

const SignupBox = styled.div`
  border: 1px solid rgba(153, 153, 153, 0.5);
  width: 600px;
  height: auto;
  border-radius: 5px;
  padding: 0 60px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    img {
      width: 100%;
      height: 25px;
      margin-top: 56px;
      margin-bottom: 27px;
    }
  }
  p {
    margin-top: 40px;
    span {
      color: #fc1055;
    }
    color: #373a42;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  p {
    font-size: 15px;
    span {
      color: #fc1055;
    }
    color: #373a42;
  }
  input {
    border: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 5px;
  }

  input::placeholder {
    color: #999;
    font-size: 15px;
  }

  input[name="id"] {
    width: 300px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 30px 0 15px;
    margin-left: 60px;
  }
  input[type="button"] {
    width: 130px;
    height: 50px;
    margin-left: 10px;
    border: 1px solid #fc1055;
    border-radius: 5px;
    color: #fc1055;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  input[name="pw"] {
    width: 465px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 30px;
  }

  input[name="repw"] {
    width: 465px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 10px;
  }

  input[name="name"] {
    width: 465px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 60px;
  }

  input[name="phone"] {
    width: 465px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 40px;
  }

  input[name="email"] {
    width: 325px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 57px;
  }

  div[id="addr"] {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input[name="address"] {
    width: 329px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 70px;
  }

  input[name="detailAddress"] {
    width: 470px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 10px;
  }
  div[id="detailadd"] {
    margin-left: 105px;
  }

  input[type="submit"] {
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 5px;
    background-color: #fc1055;
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 50px;
    cursor: pointer;
  }
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px;
  span {
    color: #373a42;
    margin-right: 10px;
    width: 300px;
    font-size: 18px;
    line-height: 24.52px;
  }
  a {
    font-weight: 700;
    font-size: 18px;
    line-height: 24.52px;
    color: #373a42;
    text-decoration: none;
  }
  a:hover {
    color: #fc1055;
  }
`;

const SignupPage = () => {
  const [inputValue, setInputValue] = useState({
    id: "",
    pw: "",
    repw: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    detailAddress: "",
  });
  const [isDaumPostcodeOpen, setIsDaumPostcodeOpen] = useState(false);
  const [isIdCheck, setIsIdCheck] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleComplete = (data) => {
    const fullAddress = data.address;
    const extraAddress = data.addressType === "R" ? "" : data.bname;
    setInputValue({
      ...inputValue,
      address: fullAddress,
      detailAddress: extraAddress,
    });
    setIsDaumPostcodeOpen(false);
  };

  const openDaumPostcode = () => {
    setIsDaumPostcodeOpen(true);
  };

  const idCheckHandler = async () => {
    try {
      if (inputValue.id === "") {
        alert("아이디를 입력해주세요.");
      } else {
        const response = await axios.post(
          "http://localhost:8080/signup/idcheck",
          {
            id: inputValue.id,
          }
        );
        console.log(response);
        if (response.data === "이미 사용중인 아이디입니다.") {
          alert("이미 사용중인 아이디입니다.");
          setIsIdCheck(false);
          window.location.reload();
        } else if (response.status === 200) {
          alert("사용 가능한 아이디입니다.");
          setIsIdCheck(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailCheckHandler = async () => {
    try {
      if (inputValue.email === "") {
        alert("이메일을 입력해주세요.");
      } else {
        const response = await axios.post(
          "http://localhost:8080/signup/emailcheck",
          {
            email: inputValue.email,
          }
        );
        console.log(response);
        if (response.data === "이미 사용중인 이메일입니다.") {
          alert("이미 사용중인 이메일입니다.");
          setIsEmailCheck(false);
          window.location.reload();
        } else if (response.status === 200) {
          alert("사용 가능한 이메일입니다.");
          setIsEmailCheck(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const url = "http://localhost:8080/signup";

  const submit = async () => {
    try {
      const response = await axios.post(url, {
        id: inputValue.id,
        pw: inputValue.pw,
        repw: inputValue.repw,
        name: inputValue.name,
        phone: inputValue.phone,
        email: inputValue.email,
        address: inputValue.address,
        detailAddress: inputValue.detailAddress,
      });
      console.log(response);
      json.stringify(response);
      if (response.status === 200) {
        alert("회원가입 성공");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SignupBox>
        <Head>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <p>
            <span>*</span> 필수입력 정보입니다.
          </p>
        </Head>
        <Input>
          <div>
            <p>
              아이디 <span>*</span>
            </p>
            <input
              type="text"
              name="id"
              placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
              onChange={inputChangeHandler}
            />
            <input type="button" value="중복확인" onClick={idCheckHandler} />
          </div>
          <div>
            <p>
              비밀번호 <span>*</span>
            </p>
            <input
              type="password"
              name="pw"
              placeholder="비밀번호를 입력해주세요."
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <p>
              비밀번호 확인 <span>*</span>
            </p>
            <input
              type="password"
              name="repw"
              placeholder="비밀번호를 한번 더 입력해주세요."
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <p>
              이름 <span>*</span>
            </p>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <p>
              연락처 <span>*</span>
            </p>
            <input
              type="tel"
              name="phone"
              placeholder="숫자만 입력해주세요."
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <p>
              이메일 <span>*</span>
            </p>
            <input
              type="email"
              name="email"
              placeholder="예: example@email.com"
              onChange={inputChangeHandler}
            />
            <input type="button" value="중복확인" onClick={emailCheckHandler} />
          </div>
          <div id="addr">
            <div>
              <p>
                주소 <span>*</span>
              </p>
              <input
                type="text"
                name="address"
                placeholder="예: 서울시 강남구 연주로 508"
                value={inputValue.address}
                readOnly
                onChange={inputChangeHandler}
              />
              <input
                type="button"
                value="주소검색"
                onClick={openDaumPostcode}
              />
            </div>
            <div id="detailadd">
              <input
                type="text"
                name="detailAddress"
                placeholder="상세주소를 입력해주세요."
                value={inputValue.detailAddress}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <input type="submit" onClick={submit} value="회원가입" />
        </Input>
      </SignupBox>
      <Login>
        <p>
          <span>이미 회원이신가요?</span>
          <Link to="/login">로그인하기</Link>
        </p>
      </Login>
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
  );
};
export default SignupPage;
