import React, { useState } from "react";
import styled from "styled-components";
import BookingDetail from "../../components/features/MyPage/BookingDetail";
import MyReview from "../../components/features/MyPage/MyReview";
import EditProfile from "../../components/features/MyPage/EditProfile";
import PwCheck from "../../components/features/MyPage/PwCheck";
import { MdKeyboardArrowRight } from "react-icons/md";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 120px auto;
  max-width: 1500px;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 20px;
  margin-top: 50px;
  margin-right: 30px;
`;

const Head = styled.h1`
  font-size: 32px;
  color: #373a42;
  margin-bottom: 30px;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-bottom: 1px solid #999999;
  background-color: ${(props) => (props.selected ? "#99999930" : "#fff")};
  cursor: pointer;

  div {
    color: ${(props) => (props.selected ? "#FC1055" : "#373A42")};
  }
`;

const MenuItem = styled.div`
  font-size: 16px;
  font-weight: 700;
  padding: 15px 20px;
  border-radius: 5px;
`;

const ArrowIconWrapper = styled.div`
  margin-left: auto;
  margin-right: 20px;
  transition: color 0.3s ease;
  font-size: 26px;
`;

const Content = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 20px;
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #373a42;
  margin-bottom: 20px;
`;

const MyPage = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [showPwCheck, setShowPwCheck] = useState(false); // 비밀번호 확인 모달

  const handleItemClick = (num) => {
    setSelectedItem(num);
  };

  return (
    <Container>
      <Sidebar>
        <Head>마이페이지</Head>
        <MenuItemWrapper
          selected={selectedItem === 1}
          onClick={() => handleItemClick(1)}
        >
          <MenuItem>예매 내역</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
        <MenuItemWrapper
          selected={selectedItem === 2}
          onClick={() => handleItemClick(2)}
        >
          <MenuItem>나의 관람 후기</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
        <MenuItemWrapper
          selected={selectedItem === 3 || selectedItem === 4}
          onClick={() => handleItemClick(3)}
        >
          <MenuItem>회원 정보 수정</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
      </Sidebar>
      <Content>
        <Title>
          {selectedItem === 1 && "예매 내역"}
          {selectedItem === 2 && "나의 관람 후기"}
          {selectedItem === 3 && "비밀번호 확인"}
          {selectedItem === 4 && "회원 정보 수정"}
        </Title>
        {selectedItem === 1 && <BookingDetail />}
        {selectedItem === 2 && <MyReview />}
        {selectedItem === 3 && <PwCheck />}
        {selectedItem === 4 && <EditProfile />}
      </Content>
    </Container>
  );
};

export default MyPage;
