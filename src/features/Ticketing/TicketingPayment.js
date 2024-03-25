import React, { useEffect } from "react";
import styled from "styled-components";

export const PongButton = styled.button`
  display: block;
  position: relative;
  width: 180px;
  font-size: 22px;
  padding: 0;
  margin: 10px 20px 10px auto;
  font-weight: 600;
  text-align: center;
  height: 50px;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  background: #fc1055;
  cursor: pointer;

  &.payment {
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
  }
  &.paymentCancel {
    font-size: 16px;
    color: #fc1055;
    background-color: #fff;
    border: 1px solid#fc1055;
    border-radius: 8px;
  }
`;
const Payment = ({ amount, prfnm }) => {
  useEffect(() => {
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp83485354");
    // 결제 데이터 정의
    const data = {
      pg: "kcp.AO09C", // PG사 코드.PG상점아이디 //고정값
      pay_method: "card", // 결제수단 //고정값
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: amount, // 결제금액
      name: `${prfnm}`, // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example.com", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    if (response.success) {
      alert("결제 성공");
      console.log(response);
    } else {
      alert(`결제 실패 : ${response.error_msg}`);
    }
  };

  return (
    <>
      <PongButton className="payment" onClick={onClickPayment}>
        결제하기
      </PongButton>
    </>
  );
};

export default Payment;
