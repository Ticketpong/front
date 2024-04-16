import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  p {
    margin: 3px 0;
    font-size: 13px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border-top: 2px solid #373a42;
  font-size: 14px;

  tr {
    border-bottom: 1px solid #373a42;
  }
`;

const Th = styled.th`
  font-size: 14px;
  font-weight: 500;
  width: 18%;
  border: none;
  padding: 10px;
  text-align: center;
  background-color: #f6f8f7;
`;

const Td = styled.td`
  width: 32%;
  border: none;
  padding: 10px;
  text-align: left;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: #fc1055;
  font-size: 14px;
  margin: 0 30px;
  cursor: pointer;

  &.close {
    background-color: #999999;
  }
`;

const ConfirmModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  p {
    margin: 3px 0;
    font-size: 13px;
  }
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999999;
    color: #fff;
  }
`;

const Modal = ({ isOpen, onClose, data }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  if (!isOpen || !data) return null; // 모달이 열리지 않았거나 데이터가 없으면 null 반환

  // 현재 날짜 가져오기
  const currentDate = new Date();
  // 예매일자 가져오기

  const selectDateStr = new Date(data.selectdate);
  const currentDateStr = currentDate;

  // 예매일자와 현재 날짜 비교
  const isCancelable = selectDateStr > currentDateStr;

  const handleCancelClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    const cancelSubmit = async () => {
      if (data.success.data[0] === 0) {
        alert("이미 결제 취소된 예매입니다!");
      } else {
        try {
          const response = await axios.put(
            "http://localhost:8080/reservation/cancel",
            {
              imp_uid: data.imp_uid,
            }
          );
          if (response.status === 200 || response.status === 204) {
            alert("예매가 취소되었습니다.");

            window.location.reload();
          } else {
            alert("예매 취소가 불가합니다. 문의해주세요.");

            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    // 예매 취소 동작을 수행
    cancelSubmit();

    setIsConfirmOpen(false);
    onClose(); // 모달을 닫습니다.
  };

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false);
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
    <ModalWrapper>
      <ModalContent>
        <Title>예매 내역</Title>
        <Table>
          <tbody>
            <tr>
              <Th>예매일</Th>
              <Td>{formatDate(data.res_date)}</Td>
              <Th>결제상태</Th>
              <Td>{data.success.data[0] === 1 ? "결제완료" : "결제취소"}</Td>
            </tr>
            <tr>
              <Th>결제수단</Th>
              <Td>신용카드</Td>
              <Th>관람상태</Th>
              <Td>{data.watchstate.data[0] === 1 ? "관람완료" : "관람전"}</Td>
            </tr>
          </tbody>
        </Table>
        <p>
          ※ 다른 고객님의 예매로 인하여 예매 취소 후 동일 좌석에 대한 재예매가
          불가할 수 있습니다.
        </p>
        <p style={{ color: "#FC1055" }}>
          ※ 당일 공연/전시 예매 및 취소는 불가합니다.
        </p>
        <Table>
          <tbody>
            <tr>
              <Th>예매번호</Th>
              <Td>{data.imp_uid}</Td>
              <Th>공연명</Th>
              <Td>{data.showName}</Td>
            </tr>
            <tr>
              <Th>관람일자</Th>
              <Td>
                {formatDate(data.selectdate)}
                {formatTime(data.selecttime)}
              </Td>
              <Th>결제금액</Th>
              <Td>{data.paid_amount}원</Td>
            </tr>
            <tr>
              <Th>좌석번호</Th>
              <Td>{data.selectseat}</Td>
              <Th>매수</Th>
              <Td>{data.people}</Td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={onClose} className="close">
          닫기
        </Button>
        {isCancelable && <Button onClick={handleCancelClick}>예매취소</Button>}
      </ModalContent>
      {isConfirmOpen && (
        <ConfirmModalWrapper>
          <ConfirmModalContent>
            <p>취소하시겠습니까?</p>
            <ConfirmButtonWrapper>
              <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
              <ConfirmButton onClick={handleCancelConfirm}>취소</ConfirmButton>
            </ConfirmButtonWrapper>
          </ConfirmModalContent>
        </ConfirmModalWrapper>
      )}
    </ModalWrapper>
  );
};

export default Modal;
