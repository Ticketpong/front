import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminManage from "../../components/features/ManagePage/AdminManage";
import EditManage from "../../components/features/ManagePage/EditManage";
import ManageAdd from "../../components/features/ManagePage/ManageAdd";
import MemberManage from "../../components/features/ManagePage/MemberManage";
import PerformanceReg from "../../components/features/ManagePage/PerformanceReg";
import PerformanceManageChg from "../../components/features/ManagePage/PerformanceChg";
import PerformanceManage from "../../components/features/ManagePage/PerformanceManage";
import ReviewsManagement from "../../components/features/ManagePage/ReviewManage";
import { MdKeyboardArrowRight } from "react-icons/md";
import axiosWithAuth from "../../components/base/axiosWithAuth";


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

const ManagePage = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedManageId, setSelectedManageId] = useState(null);
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLogined, setIsLogined] = useState(false);

  const handleItemClick = (num) => {
    setSelectedItem(num);
  };

  const handlePerformanceAddClick = () => {
    setSelectedItem(7);
  };

  const handlePerformanceEditClick = (performanceId) => {
    setSelectedItem(8);
    setSelectedPerformanceId(performanceId);
  };

  const handleAddClick = () => {
    setSelectedItem(5);
  };

  const handleEditClick = (manageId) => {
    setSelectedItem(6);
    setSelectedManageId(manageId);
  };
  
  useEffect(() => {
    const fetchStatusLogin = async () => {
      try {
        const response = await axiosWithAuth().get("http://localhost:8080/manage/profile");
        const { id, isLogined } = response.data;
        if (isLogined) {
          setUserId(id);
          setIsLogined(isLogined);
        } else {
          console.log("로그인 상태가 아닙니다.");
          // 사용자가 로그인하지 않은 경우, 로그인 페이지로 이동
          window.location.href = '/manage'; // 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류가 발생했습니다.", error);
      }
    };
  
    fetchStatusLogin();
  }, []);
  
  return (
    <Container>
      <Sidebar>
        <Head>사이트 관리</Head>
        <MenuItemWrapper
          selected={selectedItem === 1}
          onClick={() => handleItemClick(1)}
        >
          <MenuItem>회원 관리</MenuItem>
          <ArrowIconWrapper>
            <MdKeyboardArrowRight />
          </ArrowIconWrapper>
        </MenuItemWrapper>
        {/* 나머지 메뉴 아이템들... */}
      </Sidebar>
      <Content>
        <Title>
          {selectedItem === 1 && "회원 관리"}
          {selectedItem === 2 && "공연 관리"}
          {selectedItem === 3 && "후기 관리"}
          {selectedItem === 4 && "관리자 관리"}
          {selectedItem === 5 && "관리자 추가"}
          {selectedItem === 6 && "관리자 수정"}
        </Title>
        {/* 나머지 컨텐츠... */}
      </Content>
    </Container>
  );
};

export default ManagePage;
