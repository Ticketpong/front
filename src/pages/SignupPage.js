import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/headerImg/logo.png";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 740px;
  height: auto;
  margin: 0 auto;
`;

const SignupBox = styled.div`
  border: 1px solid rgba(153, 153, 153, 0.5);
  width: 600px;
  height: 930px;
  border-radius: 5px;
  padding: 0 76px 0 76px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    img {
      width: 192px;
      height: 25px;
      margin-top: 56px;
      margin-bottom: 27px;
    }
  }
  p {
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
    span {
      color: #fc1055;
    }
    color: #373a42;
  }
  input {
    border: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 5px;
  }
  input:placeholder {
    color: rgba(153, 153, 153, 0.5);
  }
  input[name="id"] {
    width: 330px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
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
    width: 323px;
    height: 50px;
    padding: 0;
    text-align: left;
    padding: 0 10px;
    margin-left: 50px;
  }

  div[id="addr"] {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input[name="address"] {
    width: 325px;
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
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #fc1055;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
  }
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  span {
    color: #373a42;
    margin-right: 10px;
    width: 300;
    font-size: 18px;
    line-height: 24.52px;
    font-family: "Noto sans";
  }
  a {
    color: #373a42;
    text-decoration: none;
    width: 700;
    font-size: 18px;
    line-height: 24.52px;
  }
  a:hover {
    color: blue;
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

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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
            <input type="button" value="중복확인" />
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
              비밀번호 확인<span>*</span>
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
            <input type="button" value="중복확인" />
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
                onChange={inputChangeHandler} // 주소 API 연결
              />
              <input type="button" value="주소검색" />
            </div>
            <div id="detailadd">
              <input
                type="text"
                name="detailAddress"
                placeholder="상세주소를 입력해주세요."
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
    </Container>
  );
};
export default SignupPage;
