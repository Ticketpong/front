/**공연관리 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import testData from "../../../dummy/show_detail.json";
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

const Previous = styled.span`
  color: rebeccapurple;
  width: 50px; /* 사이즈 */
  height: 50px; /* 사이즈 */
  border-top: 5px solid #000; /* 선 두께 */
  border-right: 5px solid #000; /* 선 두께 */
  transform: rotate(225deg); /* 각도 */
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
        `http://localhost:8080/manage/manageMain/performance` // 공연 리스트 불러오는 백엔드 url
      );

      const newData = response.data.map((item, index) => ({
        ...item,
        number: (page - 1) * 7 + index + 1,
      }));
      setData(newData);
      // setPage(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const url = `http://localhost:8080/manage/manageMain/performanceDelete`; // 공연 삭제 백엔드 url

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
            <Header></Header>
            <Header></Header>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.mt20id}>
              <Cell>{item.number}</Cell>
              <Cell>{item.prfnm}</Cell>
              <Cell>{item.genrenm}</Cell>
              <Cell>{item.prfpdfrom}</Cell>
              <Cell>{item.prfpdto}</Cell>
              <Cell>{item.prfstate}</Cell>
              <Cell>{item.post ? "y" : "n"}</Cell>
              {/*수정 삭제 버튼*/}
              <Cell>
                <Button onClick={() => onEditClick(item.mt20id)}> 수정</Button>
                <Button onClick={() => performanceDelete(item.mt20id)}>
                  삭제
                </Button>
              </Cell>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Container>
      <Previous></Previous>
      <AddButton name="add" onClick={onAddClick}>
        공연추가하기
      </AddButton>
    </>
  );
};
export default PerformanceManage;
