import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosWithAuth from "../../base/axiosWithAuth";
import axios from "axios";
import { json } from "react-router-dom";

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
const Payment = ({ amount, showData, selectedSeat, people, cardData }) => {
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [userValue, setUserValue] = useState(null);

  useEffect(() => {
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(iamport);
    };
  }, []);

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
    const postUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/reservation/member",
          {
            user_id: userId,
          }
        );
        setUserValue(response);
        json.stringify(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLoginStatus();
    postUser();
  }, []);
  console.log(userId);
  console.log(userValue);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const dateString = year + "-" + month + "-" + day;

    return dateString;
  };

  const navigate = useNavigate();

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp83485354");
    // 결제 데이터 정의
    const data = {
      pg: "kcp.AO09C", // PG사 코드.PG상점아이디 //고정값
      pay_method: "card", // 결제수단 //고정값
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 uid도 추가해서 고유값 만들기
      amount: amount, // 결제금액
      name: `${showData.showData.prfnm}`, // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example.com", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소

      custom_data: {
        user_id: userId,
        mt20id: showData.showData.mt20id,
        mt10id: showData.showData.mt10id,
        selectedSeat: selectedSeat,
        res_date: getDate(),
        people: people,
        selectdate: showData.timeData.playDate,
        selecttime: showData.timeData.playTime,
        watchstate: false,
        prestate: false,
      },
    };

    if (cardData) {
      // cardData가 존재하는 경우 추가 카드 정보를 포함하여 결제 요청
      data.card = {
        direct: {
          code: cardData.code,
        },
      };
    }

    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    if (response.success) {
      alert("결제 성공!");
      console.log(response);
      navigate(`/ticketing/${showData.showData.mt20id}`);
    } else {
      alert(`결제 실패! : ${response.error_msg}`);
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
