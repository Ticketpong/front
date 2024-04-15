import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  width: 100%;
`;

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}

function ReviewsTable({ review }) {
  const formattedDate = formatDate(review.predate);
  return (
    <>
      <Table>
        <tbody>
          <Tr>
            <Th>리뷰 ID</Th>
            <Td>{review.pre_id}</Td>
            <Th>작성일</Th>
            <Td>{formattedDate}</Td>
            <Th>별점</Th>
            <Td>{review.prestar}</Td>
            <Th>추천 수</Th>
            <Td>{review.recommend}</Td>
          </Tr>
        </tbody>
      </Table>
      <Table>
        <tbody>
          <Tr>
            <Th>결제 ID</Th>
            <Td>{review.imp_uid}</Td>
            <Th>공연 ID</Th>
            <Td>{review.mt20id}</Td>
          </Tr>
        </tbody>
      </Table>
      <Table>
        <Tr>
          <Th>후기 제목</Th>
          <Td>{review.pretitle}</Td>
        </Tr>
        <Tr>
          <Th>후기 내용</Th>
          <Td>{review.precontent}</Td>
        </Tr>
      </Table>
    </>
  );
}

export default ReviewsTable;
