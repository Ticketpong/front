import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosWithAuth from "../../base/axiosWithAuth";
import axios from "axios";
import { json } from "react-router-dom";
import moment from "moment";

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
const Payment = ({ amount, showData, selectedseat, people, cardData }) => {
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [userValue, setUserValue] = useState([]);
  const [payData, setPayData] = useState([]);
  const [regiData, setRegiData] = useState([]);

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

    fetchLoginStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      getMacInfo();
    }
  }, [userId]);

  const getMacInfo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/macAddress/profile",
        {
          user_id: userId,
        }
      );

      setRegiData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const postUser = async () => {
      const Url = "http://localhost:8080/reservation/member";
      try {
        const response = await axios.post(Url, {
          user_id: userId,
        });
        setUserValue(response.data);
        JSON.stringify(response);
      } catch (error) {
        console.log(error);
      }
    };

    postUser();
  }, [userId]);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const dateString = year + "-" + month + "-" + day;

    return dateString;
  };

  const submitPayment = async (response) => {
    const Url = "http://localhost:8080/reservation";
    try {
      const result = await axios.post(Url, {
        imp_uid: response.imp_uid,
        mt20id: response.custom_data.mt20id,
        mt10id: response.custom_data.mt10id,
        user_id: response.custom_data.user_id,
        res_date: moment(response.custom_data.res_date, "YYYYMMDD").format(
          "YYYY-MM-DD"
        ),
        paid_amount: response.paid_amount,
        success: response.success,
        watchstate: response.custom_data.watchstate,
        selectdate: moment(response.custom_data.selectdate, "YYYYMMDD").format(
          "YYYY-MM-DD"
        ),
        selecttime: moment(response.custom_data.selecttime, "HHmm").format(
          "HH:mm:ss"
        ),
        selectseat: response.custom_data.selectedseat,
        people: response.custom_data.people,
      });
      console.log(result);
      json.stringify(result);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const checkMac = () => {
    console.log(regiData);
    if (userId) {
      if (regiData) {
        onClickPayment();
      } else {
        alert("기기등록이 필요합니다.");
        navigate("/mypage");
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp83485354");
    // 결제 데이터 정의
    const data = {
      pg: "kcp.AO09C", // PG사 코드.PG상점아이디 //고정값
      pay_method: "card", // 결제수단 //고정값
      merchant_uid: `${userId}mid_${new Date().getTime()}`, // 주문번호 uid도 추가해서 고유값 만들기
      amount: amount, // 결제금액
      name: `${showData.showData.prfnm}`, // 주문명
      buyer_name: userValue[0].user_name, // 구매자 이름
      buyer_tel: userValue[0].user_phone, // 구매자 전화번호
      buyer_email: userValue[0].user_email, // 구매자 이메일
      buyer_addr: `${userValue[0].address} ${userValue[0].detailAddress}`, // 구매자 주소

      custom_data: {
        user_id: userId,
        mt20id: showData.showData.mt20id,
        mt10id: showData.showData.mt10id,
        selectedseat: selectedseat,
        res_date: getDate(),
        people: people,
        selectdate: showData.timeData.playDate,
        selecttime: showData.timeData.playTime,
        watchstate: false,
        prestate: false,
      },
    };

    if (cardData) {
      console.log(cardData[0]);
      // cardData가 존재하는 경우 추가 카드 정보를 포함하여 결제 요청
      data.card = {
        direct: {
          code: cardData[0].code,
        },
      };
    }

    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    if (response.success) {
      console.log(response);
      submitPayment(response);
      alert("결제 성공!");

      window.location.reload();
    } else {
      alert(`결제 실패! : ${response.error_msg}`);
    }
  };

  return (
    <>
      <PongButton className="payment" onClick={checkMac}>
        결제하기
      </PongButton>
    </>
  );
};

export default Payment;
