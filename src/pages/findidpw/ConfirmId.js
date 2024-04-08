import React from 'react';
import styled from 'styled-components';
import logo from "../../assets/headerImg/logo.png";
import { Link } from 'react-router-dom';

const OuterContainer = styled.div`
  width: 100%;
  margin: 200px auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  align-items: center;
  padding: 50px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  border-radius: 5px;
`;

const TopArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const LogoContainer = styled(Link)`
  margin-right: 85px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #373A42;
`;

const InfoText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #373A42;
  text-align: left;
  margin-bottom: 25px;
`;

const UserData = styled.div`
  width: 437px;
  height: 88px;
  border: 1px solid #dadada;
  border-radius: 5px;
  margin-bottom: 5px;
  justify-content: center;
  text-align: center;
`;

const IdValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-right: 5px;
  margin-bottom: 0;
  color: #373A42;
`;

const DateValue = styled.span`
  font-size: 13px;  
  font-weight: 500;
  color: #373A42;
`;

const DateLabel = styled.span`
  font-size: 13px;
  margin-right: 5px;
  color: #373A42;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const PwButton = styled.button`
    width: 440px;
    height: 60px;
    border: 1px solid #fc1055;
    border-radius: 5px;
    background-color: #fff;
    color: #fc1055;
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;
    margin-top: 15px;
    cursor: pointer;
`;

const LoginButton = styled.button`
    width: 440px;
    height: 60px;
    border: none;
    border-radius: 5px;
    background-color: #fc1055;
    color: white;
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;
    margin-top: 15px;
    cursor: pointer;
`;


const VerticalLine = styled.div`
  height: 17px;
  width: 1px;
  background-color: #ccc;
  margin: 0 12px;
`;


const ConfirmId = () => {
  // 임의 데이터
  const userId = "member1";
  const joinDate = "2024.04.07";

  return (
    <OuterContainer>
      <InnerContainer>
        <TopArea>
          <LogoContainer to="/">
            <Logo src={logo} alt="Logo" />
          </LogoContainer>
          <VerticalLine />
          <Title>아이디 찾기 완료</Title>
        </TopArea>
        <InfoText>고객님의 정보와 일치하는 아이디입니다.</InfoText>
        <UserData>
          <IdValue>{userId}</IdValue>
          <DateLabel>가입일:</DateLabel>
          <DateValue>{joinDate}</DateValue>
        </UserData>
        <Form>
          <Link to='/findPw'><PwButton>비밀번호 찾기</PwButton></Link>
          <Link to='/login'><LoginButton>로그인하기</LoginButton></Link>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
};

export default ConfirmId;
