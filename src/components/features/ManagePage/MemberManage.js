import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const ITEMS_PER_PAGE = 7;

const Container = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  width: 100%;
  border-top: 2px solid #373a42;
  border-bottom: 1px solid #373a42;
`;

const Header = styled.th`
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #373a42;
  background-color: #f6f8f7;
`;

const Cell = styled.td`
  padding: 10px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;

  &:last-child {
    border-right: none;
  }
`;


  const Button = styled.button`
  width: 70px;
  height: 36px;
  margin-right: 15px;
  background-color: white;
  color: #fc1055;
  border: 1px solid #fc1055;
  border-radius: 3px;
`;

const AddButton = styled.button`
  width: 120px;
  height: 51px;
  border-radius: 3px;
  background-color: #fc1055;
  color: white;
  border: none;
  position: absolute;
  right: 10%;
`;
const ButtonContainer = styled.div`
  align-items: center;
  text-align: center;

  button {
    text-align: center;
    background-color: white;
    border: 0;
    font-size: 20px;
    border-radius: 20px;

    &:active,
    &:hover {
      background-color: #fc1055;
    }
  }
`;



const MemberManage = ({ onAddClick, onEditClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manage/manageMain/memberList` // 유저 리스트 불러오는 백엔드 url
      );

      const newData = response.data.map((item, index) => ({
        ...item,
        number: (currentPage - 1) * 7 + index + 1,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  
   // 페이징 구현
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

  const goToStartPage = () => setCurrentPage(1);
  const goToPrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / ITEMS_PER_PAGE))
    );
  const goToEndPage = () =>
    setCurrentPage(Math.ceil(data.length / ITEMS_PER_PAGE));
  return (
    <>
      <Container>
        <thead>
          <tr>
            <Header>번호</Header>
            <Header>이름</Header>
            <Header>아이디</Header>
            <Header>연락처</Header>
            <Header>이메일</Header>
            <Header>예매횟수</Header>
          </tr>
        </thead>
        <tbody>
        {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={item.id}>
              <Cell>{item.number}</Cell>
              <Cell>{item.user_name}</Cell>
              <Cell>{item.user_id}</Cell>
              <Cell>{item.user_phone}</Cell>
              <Cell>{item.user_email}</Cell>
              <Cell>{item.res_count}</Cell>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Container>
        {/* 페이지네이션 버튼 */}
      <ButtonContainer>
        <button onClick={goToStartPage}>
          <MdKeyboardDoubleArrowLeft color="#999999" />
        </button>
        <button onClick={goToPrevPage}>
          <MdKeyboardArrowLeft color="#999999" />
        </button>
        {Array.from(
          { length: Math.ceil(data.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        <button onClick={goToNextPage}>
          <MdKeyboardArrowRight color="#999999" />
        </button>
        <button onClick={goToEndPage}>
          <MdKeyboardDoubleArrowRight color="#999999" />
        </button>
      </ButtonContainer>
    </>
  );
};
export default MemberManage;
