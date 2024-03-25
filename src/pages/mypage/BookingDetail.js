import React from "react";
import styled from "styled-components";

const Container = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const Header = styled.th`
  padding: 10px;
  text-align: center;
  border-bottom: 2px solid black;
  background-color: #f6f8f7;
`;

const Cell = styled.td`
  padding: 10px;
  text-align: center;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;

  &:last-child {
    border-right: none;
  }
`;

const LastRow = styled(Cell)`
  border-bottom: 2px solid black;
`;

const NoDataCell = styled(Cell)`
  text-align: center;
  padding: 100px 100px;
`;

const LabelContainer = styled.div`
  width: 150px;
  float: right;
  margin-bottom: 5px;

  #period {
    font-size: 18px;
    border-color: #666666;
  }
`;

const BookingDetail = () => {
  const data = [];
  return (
    <>
      <LabelContainer>
        <label for="perid"></label>
        <select id="period" name="period">
          <option value="옵션1">3개월</option>
          <option value="옵션2">6개월</option>
          <option value="옵션3">1년</option>
        </select>
      </LabelContainer>
      <Container>
        <thead>
          <tr>
            <Header>에매일</Header>
            <Header>공연명</Header>
            <Header>관람일</Header>
            <Header>가격</Header>
            <Header>매수</Header>
            <Header>처리상황</Header>
            <Header>후기상태</Header>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <NoDataCell colSpan="7">등록된 예매 내역이 없습니다.</NoDataCell>
            </tr>
          ) : (
            <tr>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <Cell></Cell>
              <LastRow></LastRow>
            </tr>
          )}
        </tbody>
      </Container>
    </>
  );
};

export default BookingDetail;
