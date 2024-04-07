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

const PerformanceManage = ({ onAddClick, onEditClick }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/경로` // 공연 리스트 불러오는 백엔드 url
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

  const url = "http://localhost:8080/경로"; // 공연 삭제 백엔드 url

  const performanceDelete = async (id) => {
    try {
      const response = await axios.delete(url, { data: { id } });
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <thead>
          <tr>
            <Header>번호</Header>
            <Header>공연제목</Header>
            <Header>장르</Header>
            <Header>시작일</Header>
            <Header>종료일</Header>
            <Header>공연상태</Header>
            <Header>게시여부</Header>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <Cell>{item.performance.num}</Cell>
              <Cell>{item.prfnm}</Cell>
              <Cell>{item.genrenm}</Cell>
              <Cell>{item.prfpdfrom}</Cell>
              <Cell>{item.prfpdto}</Cell>
              <Cell>{item.prfstate}</Cell>
              <Cell>{item.post}</Cell> 
              <Cell>
                <Button onClick={() => onEditClick(item.id)}>
                  {" "}
                  수정
                </Button>
                <Button onClick={() => performanceDelete(item.id)}>삭제</Button>
              </Cell>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Container>
      <AddButton name="add" onClick={onAddClick}>
        공연추가하기
      </AddButton>
    </>
  );
};
export default PerformanceManage;
