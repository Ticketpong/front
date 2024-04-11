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
import axiosWithAuth from "../../../components/base/axiosWithAuth";
import axios from "axios";

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
  cursor: pointer;
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
      case 0:
        return "#fc1055";
      case 1:
        return "#999999";
      default:
        return "#999999";
    }
  }};
  cursor: ${({ status }) => (status === false ? "pointer" : "default")};
`;

const ITEMS_PER_PAGE = 7;

const BookingDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("3");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showName, setShowName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowNameData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewall");

        const showNameData = response.data;
        const updatedFilteredData = filteredData.map((item) => {
          const selectedShowData = showNameData.find(
            (show) => show.mt20id === item.mt20id
          );
          return {
            ...item,
            showName: selectedShowData ? selectedShowData.prfnm : "", // 공연 이름 추가
          };
        });

        setFilteredData(updatedFilteredData);
      } catch (error) {
        console.log(error);
      }
    };
    if (bookingData) {
      // 선택된 데이터가 있을 때만 공연 데이터 가져오기
      fetchShowNameData();
    }
  }, [bookingData]);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axiosWithAuth().get(
          "http://localhost:8080/login/profile"
        );
        const { id, isLogined } = response.data;
        if (isLogined) {
          setUserId(id);
          setIsLogined(true);
        }
      } catch (error) {
        console.error("로그인 상태를 확인하는 동안 오류 발생:", error);
      }
    };
    fetchLoginStatus();
  }, []);

  useEffect(() => {
    fetchBookingData();
  }, [userId, selectedPeriod]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/reservation/list",
        {
          id: userId,
        }
      );
      const newData = response.data.map((item, index) => ({
        ...item,
        number: (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
      }));
      setBookingData(newData);

      const startDate = new Date();
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

      const filtered = newData.filter((item) => {
        const itemDate = new Date(item.selectdate);
        return itemDate >= startDate;
      });
      setFilteredData(filtered); // setData 호출 이후에 filteredData 설정
    } catch (error) {
      console.error("예매 내역을 불러오는 동안 오류 발생:", error);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const Data = filteredData.slice(startIndex, endIndex);

  const goToStartPage = () => setCurrentPage(1);
  const goToPrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(bookingData.length / ITEMS_PER_PAGE))
    );
  const goToEndPage = () =>
    setCurrentPage(Math.ceil(filteredData.length / ITEMS_PER_PAGE));

  const handlePeriodChange = (event) => setSelectedPeriod(event.target.value);

  const handleCellClick = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

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
  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

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
            Data.map((item) => (
              <tr key={item.imp_uid} onClick={() => handleCellClick(item)}>
                <Cell>{formatDate(item.res_date)}</Cell>
                <Cell>
                  {item.showName && item.showName.length > 20
                    ? `${item.showName.slice(0, 20)}..`
                    : item.showName}
                </Cell>
                <Cell>
                  {formatDate(item.selectdate)} {formatTime(item.selecttime)}
                </Cell>
                <Cell>{item.paid_amount}원</Cell>
                <Cell>{item.people}</Cell>
                <Cell>
                  {item.success.data[0] === 1 ? "결제완료" : "결제취소"}
                </Cell>
                <Cell>
                  <ReviewStatus
                    status={item.prestate.data[0]}
                    onClick={
                      item.prestate.data[0] === 0
                        ? () => navigate("/writereview")
                        : undefined
                    }
                  >
                    {item.prestate.data[0] === 1 ? "작성완료" : "작성하기"}
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
          { length: Math.ceil(filteredData.length / ITEMS_PER_PAGE) },
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
