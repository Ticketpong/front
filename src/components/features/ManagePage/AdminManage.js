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

const AdminManage = ({ onAddClick, onEditClick }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manage/manageMain/manageList`
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

  const url = "http://localhost:8080/manage/manageMain/delete";

  const idDelete = async (id) => {
    try {
      const response = await axios.delete(url, { data: { id } });
      console.log(response);
      fetchData();
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
            <Header>아이디</Header>
            <Header>이름</Header>
            <Header>휴대폰 번호</Header>
            <Header>권한</Header>
            <Header>직급</Header>
            <Header></Header>
          </tr>
        </thead>
        <tbody>
          {data
          .slice((page - 1) * 10, page * 10)
          .map((item) => (
            <tr key={item.id}>
              <Cell>{item.number}</Cell>
              <Cell>{item.manage_id}</Cell>
              <Cell>{item.manage_name}</Cell>
              <Cell>{item.manage_phone}</Cell>
              <Cell>{item.manage_auth}</Cell>
              <Cell>{item.manage_part}</Cell>
              <Cell>
                <Button onClick={() => onEditClick(item.manage_id)}>
                  {" "}
                  수정
                </Button>
                <Button onClick={() => idDelete(item.manage_id)}>삭제</Button>
              </Cell>
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
      <AddButton name="add" onClick={onAddClick}>
        + 추가하기
      </AddButton>
    </>
  );
};
export default AdminManage;
