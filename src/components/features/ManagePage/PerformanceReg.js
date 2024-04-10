// 공연등록

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosWithAuth from "../../base/axiosWithAuth";

const Container = styled.div`
  width: 100%;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 40px;
  margin-right: 100px;
`;

const InputLabel = styled.label`
  width: 130px;
  margin-right: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  display: flex;
`;

const GrayInput = styled.input`
  background-color: white;
  width: 100%;
  height: 50px;
  flex: 1;
  padding-left: 10px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  border-radius: 3px;
`;

const HrDiv = styled.div`
  border: 1px solid #999999;
  width: 100%;
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const EndButton = styled.button`
  background-color: #fc1055;
  color: #fff;
  width: 250px;
  height: 70px;
  border-radius: 3px;
  border: 0;
  font-size: 24px;
  margin-left: 50px;
  margin-right: 50px;
`;

const CancelButton = styled.button`
  background-color: #999999;
  color: #fff;
  width: 250px;
  height: 70px;
  border-radius: 3px;
  border: 0;
  font-size: 24px;
  margin-left: 50px;
  margin-right: 50px;
`;

const RadioList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const Radio = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PerformaceReg = () => {
  const [performance, setPerformance] = useState({
    name: "",
    genrenm: "",
    ScreeningGrade: "",
    poster: "",
    region: "",
    performanceId: "",
    startDate: "",
    endDate: "",
    runingTime: "",
    price: "",
    telNo: "",
    selYn: "",
  });
  const [manageId, setManageId] = useState("");
  const [isLogined, setIsLogined] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerformance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      submit();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoginState();
  }, []);

  const fetchLoginState = async () => {
    try {
      const response = await axiosWithAuth().get(
        "http://localhost:8080/login/profile"
      );
      const { id, isLogined } = response.data;
      if (isLogined) {
        setManageId(id);
        setIsLogined(true);
      }
    } catch (error) {
      console.error("로그인 상태를 확인하는 동안 오류 발생:", error);
    }
  };

  const url = "http://localhost:8080/manage/manageMain/performanceAdd"; // 공연 등록 백엔드 url

  const submit = async () => {
    try {
      // 관리자 추가 처리 로직
      const response = await axios.post(url, {
        // 등록할 공연 정보
        mt20id: performance.mt20id,
        manage_id: manageId,
        mt10id: performance.mt10id,
        prfnm: performance.prfnm,
        prfpdfrom: performance.prfpdfrom,
        prfpdto: performance.prfpdto,
        prfruntime: performance.prfruntime,
        pcseguidance: performance.pcseguidance,
        genrenm: performance.genrenm,
        prfstate: performance.prfstate,
        poster: performance.poster,
        styurl: performance.styurl,
        dtguidance: performance.dtguidance,
        post: performance.post,
        prfage: performance.prfage,
      });
      console.log(response);
      json.stringify(response);
    } catch (error) {
      console.log(error);
    }
  };

  const Star = () => {
    return <span style={{ color: "#fc1055", fontSize: "1.2em" }}>*</span>;
  };

  const navigate = useNavigate();

  const onClickCancel = () => {
    navigate(0);
  };

  // 공연 시작일, 종료일 정의
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <>
      <hr />
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel>
              공연제목
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              InputLabel
              name="name"
              value={performance.name}
              onChange={handleChange}
              placeholder="공연제목을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              장르
              <Star />
            </InputLabel>
            <Radio>
              <RadioList>
                <input
                  type="radio"
                  name="genrenm"
                  value="콘서트"
                  checked={performance.genrenm === "콘서트"}
                  id="concert"
                  onChange={handleChange}
                />
                <label for="concert">콘서트</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="genrenm"
                  value="뮤지컬"
                  checked={performance.genrenm === "뮤지컬"}
                  id="musical"
                  onChange={handleChange}
                />
                <label for="musical">뮤지컬</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="genrenm"
                  value="연극"
                  checked={performance.genrenm === "연극"}
                  id="theater"
                  onChange={handleChange}
                />
                <label for="theater">연극</label>
              </RadioList>
            </Radio>
          </InputContainer>
          <InputContainer>
            <InputLabel>
              상영등급
              <Star />
            </InputLabel>
            <Radio>
              <RadioList>
                <input
                  type="radio"
                  name="ScreeningGrade"
                  value="전체"
                  checked={performance.ScreeningGrade === "전체"}
                  id="all"
                  onChange={handleChange}
                />
                <label for="all">전체</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="ScreeningGrade"
                  value="7세 이상"
                  checked={performance.ScreeningGrade === "7세 이상"}
                  id="7years"
                  onChange={handleChange}
                />
                <label for="7years">7세 이상</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="ScreeningGrade"
                  value="12세 이상"
                  checked={performance.ScreeningGrade === "12세 이상"}
                  id="12years"
                  onChange={handleChange}
                />
                <label for="12years">12세 이상</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="ScreeningGrade"
                  value="15세 이상"
                  checked={performance.ScreeningGrade === "15세 이상"}
                  id="15years"
                  onChange={handleChange}
                />
                <label for="15years">15세 이상</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="ScreeningGrade"
                  value="청소년 관람불가"
                  checked={performance.ScreeningGrade === "청소년 관람불가"}
                  id="adult"
                  onChange={handleChange}
                />
                <label for="adult">청소년 관람불가</label>
              </RadioList>
            </Radio>
          </InputContainer>
          <InputContainer>
            <InputLabel>
              포스터
              <Star />
            </InputLabel>
            <GrayInput
              type="file"
              name="poster"
              value={performance.poster}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>지역</InputLabel>
            <GrayInput
              type="text"
              name="region"
              value={performance.region}
              onChange={handleChange}
              placeholder="지역을 입력해주세요. ex) 부산"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>공연장</InputLabel>
            <GrayInput
              type="text"
              name="performanceId"
              value={performance.performanceId}
              onChange={handleChange}
              placeholder="공연장ID를 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>시작일</InputLabel>
            <GrayInput
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            종료일
            <GrayInput
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              공연시간
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              name="runingTime"
              value={performance.runingTime}
              onChange={handleChange}
              placeholder="공연시간을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              티켓가격
              <Star />
            </InputLabel>
            <GrayInput
              type="text"
              name="price"
              value={performance.price}
              onChange={handleChange}
              placeholder="티켓가격을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>문의전화</InputLabel>
            <GrayInput
              type="text"
              name="telNo"
              value={performance.telNo}
              onChange={handleChange}
              placeholder="번호를 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>
              판매여부
              <Star />
            </InputLabel>
            <Radio>
              <RadioList>
                <input
                  type="radio"
                  name="selYn"
                  value="Y"
                  checked={performance.selYn === "Y"}
                  id="selYn"
                  onChange={handleChange}
                />
                <label for="selYn">판매 중</label>
              </RadioList>
              <RadioList>
                <input
                  type="radio"
                  name="selYn"
                  value="N"
                  checked={performance.selYn === "N"}
                  id="selYn"
                  onChange={handleChange}
                />
                <label for="selYn">판매중지</label>
              </RadioList>
            </Radio>
          </InputContainer>
          <HrDiv />
          <ButtonContainer>
            <CancelButton type="reset" onClick={onClickCancel}>
              취소
            </CancelButton>
            <EndButton type="submit">완료</EndButton>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};

export default PerformaceReg;
