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
  margin-right: 105px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 27px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #373A42;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const NameLabel = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 16px;
  width: 70px;
  margin-right: 10px;
`;

const IdLabel = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 16px;
  width: 70px;
  margin-right: 10px;
`;

const EmailLabel = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 16px;
  width: 70px;
  margin-right: 10px;
`;
  

const NameInput = styled.input`
  width: 440px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  padding-left: 13px;
  &::placeholder {
    color: rgba(153, 153, 153);
    font-weight: 500;
    font-size: 16px;
  }
`;

const IdInput = styled.input`
  width: 440px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  padding-left: 13px;
  &::placeholder {
    color: rgba(153, 153, 153);
    font-weight: 500;
    font-size: 16px;
  }
`;

const EmailInput = styled.input`
  width: 440px;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  padding-left: 13px;
  &::placeholder {
    color: rgba(153, 153, 153);
    font-weight: 500;
    font-size: 16px;
  }
`;

const Button = styled.button`
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

const BottomArea = styled.div`
  display: flex;
  align-items: center;
`;

const VerticalLine = styled.div`
  height: 17px;
  width: 1px;
  background-color: #ccc;
  margin: 0 12px;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: #007bff;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: #373a42;

  &:hover {
    font-weight: 700;
    text-decoration: none;
  }
`;

const FindPw = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <TopArea>
          <LogoContainer to="/">
            <Logo src={logo} alt="Logo" />
          </LogoContainer>
          <VerticalLine />
          <Title>비밀번호 찾기</Title>
        </TopArea>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
              <NameLabel htmlFor="name">이름</NameLabel>
              <NameInput type="text" id="name" name="name" placeholder="이름을 입력해주세요" />
            </FormGroup>
            <FormGroup>
              <IdLabel htmlFor="email">아이디</IdLabel>
              <IdInput type="id" id="id" name="id" placeholder="아이디를 입력해주세요"  />
            </FormGroup>
            <FormGroup>
              <EmailLabel htmlFor="email">이메일</EmailLabel>
              <EmailInput type="email" id="email" name="email" placeholder="이메일을 입력해주세요"  />
            </FormGroup>
          <Button type="submit">확인</Button>
        </Form>
        <BottomArea>
          <Links to='/findId'>아이디 찾기</Links>
          <VerticalLine />
          <Links to='/login'>로그인 하기</Links>
        </BottomArea>
      </InnerContainer>
    </OuterContainer>
  );
};

export default FindPw;
