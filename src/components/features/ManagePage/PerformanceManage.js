import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";

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
  display: flex;
  text-align: center;
  height: 30px;
  align-items: center;
  justify-content: center;

  button {
    text-align: center;
    background-color: white;
    border: none;
    padding: 0;
    margin: 0 6px;
    width: 24px;
    height: 30px;

    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  strong {
  }
`;

const PerformanceManage = ({ onAddClick, onEditClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manage/manageMain/performance`
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

  const url = `http://localhost:8080/manage/manageMain/performanceDelete`;

  const performanceDelete = async (mt20id) => {
    try {
      const response = await axios.delete(url, { data: { mt20id } });
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

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
            <Header>공연ID</Header>
            <Header>공연제목</Header>
            <Header>장르</Header>
            <Header>시작일</Header>
            <Header>종료일</Header>
            <Header>공연상태</Header>
            <Header>게시여부</Header>
            <Header></Header>
            <Header></Header>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={index}>
              <Cell>{item.number}</Cell>
              <Cell>{item.mt20id}</Cell>
              <Cell>{item.prfnm}</Cell>
              <Cell>{item.genrenm}</Cell>
              <Cell>{item.prfpdfrom}</Cell>
              <Cell>{item.prfpdto}</Cell>
              <Cell>{item.prfstate}</Cell>
              <Cell>{item.post ? "y" : "n"}</Cell>
              <Cell>
                <Button onClick={() => onEditClick(item.mt20id)}>수정</Button>
                <Button onClick={() => performanceDelete(item.mt20id)}>삭제</Button>
              </Cell>
            </tr>
          ))}
        </tbody>
      </Container>
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
            <strong key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </strong>
          )
        )}
        <button onClick={goToNextPage}>
          <MdKeyboardArrowRight color="#999999" />
        </button>
        <button onClick={goToEndPage}>
          <MdKeyboardDoubleArrowRight color="#999999" />
        </button>
      </ButtonContainer>
      <AddButton name="add" onClick={onAddClick}>
        공연추가하기
      </AddButton>
    </>
  );
};

export default PerformanceManage;
