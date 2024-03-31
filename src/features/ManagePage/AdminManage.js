import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const AdminManage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
          {data.map((item) => (
            <tr key={item.id}>
              <Cell>{item.number}</Cell>
              <Cell>{item.manage_id}</Cell>
              <Cell>{item.manage_name}</Cell>
              <Cell>{item.manage_phone}</Cell>
              <Cell>{item.manage_auth}</Cell>
              <Cell>{item.manage_part}</Cell>
              <Cell>
                <Button
                  onClick={() => {
                    navigate(`/manage/manageMain/manageDetail`);
                  }}
                >
                  {" "}
                  수정
                </Button>
                <Button onClick={() => idDelete(item.id)}>삭제</Button>
              </Cell>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Container>
    </>
  );
};
export default AdminManage;
