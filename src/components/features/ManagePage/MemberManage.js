import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

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
  border: 1px solid #999999;
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

const Pagination = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PageButton = styled(Button)`
  width: 40px;
  height: 36px;
`;

const MemberManage = ({ onAddClick, onEditClick }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manage/manageMain/memberList` // 유저 리스트 불러오는 백엔드 url
      );

      const newData = response.data.map((item, index) => ({
        ...item,
        number: (page - 1) * 7 + index + 1,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  
   // 페이징 구현
   const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / 10))
    );
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  const renderPageButtons = () => {
    const totalPageCount = Math.ceil(data.length / 10);
    const pageButtons = [];

    for (let i = 1; i <= totalPageCount; i++) {
      pageButtons.push(
        <PageButton
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={page === i}
        >
          {i}
        </PageButton>
      );
    }
 
    return pageButtons;
  };

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
          {data
          .slice((page - 1) * 10, page * 10)
          .map((item) => (
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
        <Pagination>
        <Button onClick={handlePreviousPage}>
          <MdKeyboardArrowLeft />
        </Button>
        {renderPageButtons()}
        <Button onClick={handleNextPage}>
          <MdKeyboardArrowRight />
        </Button>
      </Pagination>
    </>
  );
};
export default MemberManage;
