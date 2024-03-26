import React, { useState, useEffect } from "react";
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
// 리뷰 상태 박스
const ReviewStatus = styled.div`
  width: 72px;
  height: 30px;
  border-radius: 3px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  margin: 0 auto;
  ${({ status }) => {
    switch (status) {
      case "작성하기":
        return `
                background-color: #fc1055;
              `;
      case "완료":
        return `
                background-color: #999999;
              `;
      case "불가":
        return `
                background-color: #99999;
              `;
      default:
        return `
                background-color: #999999;
              `;
    }
  }}
`;

// 항목 수
const ITEMS_PER_PAGE = 7;

const BookingDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("3");

  const [data, setData] = useState([
    {
      id: 1,
      performance: "공연1",
      date: new Date("2023-12-01"),
      // 실제 데이터를 가져올 때는 문자열을 Date 객체로 전환해야함
      price: 50000,
      quantity: 2,
      status: "결제완료",
      reviewStatus: "작성하기",
    },
    {
      id: 2,
      performance: "공연2",
      date: new Date("2024-03-05"),
      price: 60000,
      quantity: 1,
      status: "결제취소",
      reviewStatus: "작성완료",
    },
  ]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today);

    switch (selectedPeriod) {
      case "3":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "6":
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "12":
        startDate.setMonth(startDate.getMonth() - 12);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 3); // 기본값
    }

    const filtered = data.filter(
      (item) => item.date >= startDate && item.date <= today
    );
    setFilteredData(filtered);
  }, [data, selectedPeriod]);

  const Data = filteredData.slice(startIndex, endIndex);

  // Pagination
  const goToStartPage = () => {
    setCurrentPage(1);
  };
  // 이전 페이지로 이동
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / ITEMS_PER_PAGE))
    );
  };

  const goToEndPage = () => {
    setCurrentPage(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <>
      <LabelContainer>
        <label for="period">기간 선택&nbsp;&nbsp;&nbsp;</label>
        <select
          id="period"
          name="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value="3">3개월</option>
          <option value="6">6개월</option>
          <option value="12">1년</option>
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
          {Data.length === 0 ? (
            <tr>
              <NoDataCell colSpan="7">등록된 예매 내역이 없습니다.</NoDataCell>
            </tr>
          ) : (
            Data.map((item) => (
              <tr key={item.id}>
                <Cell>{item.id}</Cell>
                <Cell>{item.performance}</Cell>
                <Cell>{item.date.toLocaleDateString()}</Cell>
                <Cell>{item.price}</Cell>
                <Cell>{item.quantity}</Cell>
                <Cell>{item.status}</Cell>
                <Cell>
                  <ReviewStatus status={item.reviewStatus}>
                    {item.reviewStatus}
                  </ReviewStatus>
                </Cell>
              </tr>
            ))
          )}
        </tbody>
      </Container>
      <hr />
      <ButtonContainer>
        <button onClick={goToStartPage}>{"<<"}</button>
        <button onClick={goToPrevPage}>{"<"}</button>
        {Array.from(
          {
            length: Math.ceil(data.length / ITEMS_PER_PAGE),
          },
          (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          )
        )}

        <button onClick={goToNextPage}>{">"}</button>
        <button onClick={goToEndPage}>{">>"}</button>
      </ButtonContainer>
    </>
  );
};

export default BookingDetail;
