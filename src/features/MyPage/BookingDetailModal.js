import React from "react";
import styled from "styled-components";

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

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null; // 모달이 열리지 않았거나 데이터가 없으면 null 반환

  return (
    <ModalWrapper>
      <ModalContent>
        <Title>예매 내역</Title>
        <Table>
          <tbody>
            <tr>
              <Th>예매일</Th>
              <Td>{data.res_date.toLocaleDateString()}</Td>
              <Th>결제상태</Th>
              <Td>{data.success === true ? "결제완료" : "결제취소"}</Td>
            </tr>
            <tr>
              <Th>결제수단</Th>
              <Td>{data.pay_method === "card" ? "신용카드" : "무통장입금"}</Td>
              <Th>관람상태</Th>
              <Td>{data.watchstate === true ? "관람완료" : "관람전"}</Td>
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
              <Td>{data.prfnm}</Td>
            </tr>
            <tr>
              <Th>관람일자</Th>
              <Td>
                {data.selectdate.toLocaleDateString()}
                {data.selecttime}
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
        <Button>예매취소</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
