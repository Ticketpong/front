import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Modal from "./BookingDetailModal";

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
  cursor: pointer; /* 추가: 클릭 가능한 커서 스타일 */
  &:last-child {
    border-right: none;
  }
`;

const NoDataCell = styled(Cell)`
  text-align: center;
  padding: 100px 100px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  float: right;
  margin-bottom: 5px;

  select {
    width: 100px;
    height: 28px;
    font-size: 16px;
    margin-right: 20px;
    border-radius: 2px;
    text-align: center;
    border: 1px solid #99999980;
  }

  label {
    font-size: 14px;
    color: #999999;
  }
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

const ReviewStatus = styled.button`
  width: 70px;
  height: 28px;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 14px;
  margin: 0 auto;
  background-color: ${({ status }) => {
    switch (status) {
      case false:
        return "#fc1055";
      case true:
        return "#999999";
      default:
        return "#999999";
    }
  }};
  cursor: ${({ status }) => (status === false ? "pointer" : "default")};
`;

// 항목 수
const ITEMS_PER_PAGE = 7;

const BookingDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("3");
  const [showModal, setShowModal] = useState(false); // 모달 제어 상태 추가
  const [selectedData, setSelectedData] = useState(null); // 선택된 데이터 상태 추가
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      imp_uid: "imp_uid01", //예매 ID
      user_id: "user_id01", //ID
      manage_id: "manage_id01", //ID
      mt10id: "공연시설01", //공연시설
      prfnm: "공연01", //공연명
      res_date: new Date("2023-11-01"), //예매일
      paid_amount: 120000, //결제금액
      success: true, //결제상태
      watchstate: true, //관람상태
      prestate: false, //후기상태
      selectdate: new Date("2023-11-01"), //선택날짜
      selecttime: "14:00", //선택시간
      selectseat: "VIP01, VIP02", //좌석
      people: 2, //인원
      pay_method: "card",
    },
    {
      imp_uid: "imp_uid02", //예매 ID
      user_id: "user_id01", //ID
      manage_id: "manage_id02", //ID
      mt10id: "공연시설02", //공연시설
      prfnm: "공연02", //공연명
      res_date: new Date("2023-12-15"), //예매일
      paid_amount: 120000, //결제금액
      success: true, //결제상태
      watchstate: true, //관람상태
      prestate: true, //후기상태
      selectdate: new Date("2024-03-05"), //선택날짜
      selecttime: "17:00", //선택시간
      selectseat: "S01, S02", //좌석
      people: 2, //인원
      pay_method: "card",
    },
  ]);

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
      (item) => item.selectdate >= startDate && item.selectdate <= today
    );
    setFilteredData(filtered);
  }, [data, selectedPeriod]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const Data = filteredData.slice(startIndex, endIndex);

  const goToStartPage = () => setCurrentPage(1);
  const goToPrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / ITEMS_PER_PAGE))
    );
  const goToEndPage = () =>
    setCurrentPage(Math.ceil(filteredData.length / ITEMS_PER_PAGE));

  const handlePeriodChange = (event) => setSelectedPeriod(event.target.value);

  const handleCellClick = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  return (
    <>
      <LabelContainer>
        <label htmlFor="period">
          최대 지난 1년의 예매 내역을 확인할 수 있습니다.
        </label>
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
            <Header>예매일</Header>
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
            Data.map((filtered) => (
              <tr
                key={filtered.imp_uid}
                onClick={() => handleCellClick(filtered)}
              >
                <Cell>{filtered.res_date.toLocaleDateString()}</Cell>
                <Cell>{filtered.prfnm}</Cell>
                <Cell>
                  {filtered.selectdate.toLocaleDateString()}{" "}
                  {filtered.selecttime}
                </Cell>
                <Cell>{filtered.paid_amount}</Cell>
                <Cell>{filtered.people}</Cell>
                <Cell>
                  {filtered.success === true ? "결제완료" : "결제취소"}
                </Cell>
                <Cell>
                  <ReviewStatus
                    status={filtered.prestate}
                    onClick={
                      filtered.prestate === false
                        ? () => navigate("/writereview")
                        : undefined
                    }
                  >
                    {filtered.prestate === true ? "작성완료" : "작성하기"}
                  </ReviewStatus>
                </Cell>
              </tr>
            ))
          )}
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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={selectedData}
      />
    </>
  );
};

export default BookingDetail;
