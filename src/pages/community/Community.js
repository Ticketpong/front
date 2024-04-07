import React, { useState } from "react";
import CommuReview from "../../components/features/Community/CommuReview.js";
import CommunityBoard from "../../components/features/Community/CommunityBoard.js";
import CommunityRules from "../../components/features/Community/CommunityRules.js";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 120px auto;
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
  width: 1580px;
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

const Community = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const handleItemClick = (num) => {
    setSelectedItem(num);
  };

  return (
    <Container>
      <Sidebar>
        <Head>커뮤니티</Head>
        <MenuItemWrapper
          selected={selectedItem === 1}
          onClick={() => handleItemClick(1)}
        >
          <MenuItem>공지사항</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
        <MenuItemWrapper
          selected={selectedItem === 2}
          onClick={() => handleItemClick(2)}
        >
          <MenuItem>관람 후기</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
        <MenuItemWrapper
          selected={selectedItem === 3}
          onClick={() => handleItemClick(3)}
        >
          <MenuItem>이용 안내</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
      </Sidebar>
      <Content>
        <Title>
          {selectedItem === 1 && "공지 사항"}
          {selectedItem === 2 && "관람 후기"}
          {selectedItem === 3 && "이용안내"}
        </Title>
        {selectedItem === 1 && <CommunityBoard />}
        {selectedItem === 2 && <CommuReview />}
        {selectedItem === 3 && <CommunityRules />}
      </Content>
    </Container>
  );
};

export default Community;
