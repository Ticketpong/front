import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "../../features/Ticketing/TicketingCalendar";
import * as S from "../../styles/TicketingStyled";
import PlaceMap from "../../components/KakaoMap";

import ShowDataDetail from "../../dummy/show_detail.json";
import jsonDataTime from "../../dummy/show_time.json";
import TicketingSelectSeat from "../../features/Ticketing/TicketingSelectSeat";
import TicketingReview from "../../features/Ticketing/TicketingReview";
import TicketingHeader from "../../features/Ticketing/TicketingHeader";
import TicketingShowInfo from "../../features/Ticketing/TicketingShowInfo";

export const dataDetail = ShowDataDetail;
const dataTime = jsonDataTime;

const Ticketing = () => {
  const { mt20id } = useParams(); // URL 매개변수 추출

  const [selectDate, setSelectDate] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [showSeats, setShowSeats] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [selectedTimeData, setSelectedTimeData] = useState(null);
  const [selectedShowData, setSelectedShowData] = useState(null); // 선택된 공연 데이터

  useEffect(() => {
    // mt20id에 해당하는 데이터를 찾아 선택된 공연 데이터로 설정
    const selectedData = dataDetail.find((item) => item.mt20id === mt20id);
    setSelectedShowData(selectedData);
    // 나머지 상태들 초기화
    setSelectDate("");
    setShowTimes([]);
    setShowSeats([]);
    setSelectData([]);
    setSelectedTimeData(null);
  }, [mt20id]);

  function convertToTimeFormat(arr) {
    return arr.map((time) => {
      const hour = time.slice(0, 2);
      const minute = time.slice(2);
      return `${hour}시 ${minute}분`;
    });
  }

  const handleDataChange = (newData) => {
    setSelectDate(newData);
    const resultTime = dataTime.filter((data) => data.playDate === newData);

    let resultShowTime = resultTime.map((row) => row.playTime);
    setShowTimes(convertToTimeFormat(resultShowTime));

    setSelectedTimeData(null);
    setSelect(null);

    setShowSeats(resultTime);
    setSelectData(resultShowTime);
  };

  const [select, setSelect] = useState("");
  const handleClick = (time) => {
    setSelect(time);

    let str = time;
    let replaced_str = str.replace(/시|분|\s/g, "");

    const selectedData = showSeats.find(
      (data) => data.playTime === replaced_str
    );
    setSelectedTimeData(selectedData);
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // 오늘 날짜를 구하는 함수
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <S.TicketingWrapper>
      {selectedShowData && (
        <S.ContentWrapper>
          <TicketingHeader headerData={selectedShowData} />
          <S.ContentDetail>
            <S.ContentDetailPoster>
              {selectedShowData.poster && (
                <img src={selectedShowData.poster} alt="" />
              )}
            </S.ContentDetailPoster>
            <TicketingShowInfo showInfoData={selectedShowData} />
          </S.ContentDetail>
        </S.ContentWrapper>
      )}
      {selectedShowData &&
      new Date(selectedShowData.prfpdto) >= new Date(getTodayDate()) ? (
        <S.SeatWrapper>
          <S.SeatBox style={{ border: "none" }}>
            <S.BoxHeader>
              <span style={{ color: "#AB003C" }}>01</span>
              <span>날짜 선택</span>
            </S.BoxHeader>
            <Calendar
              data={selectedShowData}
              onDataChange={handleDataChange}
            ></Calendar>
          </S.SeatBox>
          <S.SeatBox>
            <S.BoxHeader>
              <span style={{ color: "#AB003C" }}>02</span>
              <span>시간 선택</span>
            </S.BoxHeader>
            <S.TimeItemList>
              {showTimes.map((time) => (
                <S.TimeItemBtn
                  key={time}
                  onClick={() => handleClick(time)}
                  className={`${select === time ? "select" : ""}`}
                >
                  {time}
                </S.TimeItemBtn>
              ))}
            </S.TimeItemList>
          </S.SeatBox>
          <S.SeatBox style={{ backgroundColor: "#f6f6f6", display: "block" }}>
            <S.BoxHeader style={{ width: "120px" }}>
              <span style={{ color: "#AB003C" }}>예매 가능 좌석</span>
            </S.BoxHeader>
            <>
              {selectedTimeData && (
                <S.SeatList>
                  <S.SeatItem>
                    <span>VIP석</span>
                    <span>
                      <S.SeatTimeData>{selectedTimeData.VIP}</S.SeatTimeData>
                      <span>석</span>
                    </span>
                  </S.SeatItem>
                  <S.SeatItem>
                    <span>R석</span>
                    <span>
                      <S.SeatTimeData>{selectedTimeData.R}</S.SeatTimeData>
                      <span>석</span>
                    </span>
                  </S.SeatItem>
                  <S.SeatItem>
                    <span>S석</span>
                    <span>
                      <S.SeatTimeData>{selectedTimeData.S}</S.SeatTimeData>
                      <span>석</span>
                    </span>
                  </S.SeatItem>
                  <S.SeatItem>
                    <span>A석</span>
                    <span>
                      <S.SeatTimeData>{selectedTimeData.A}</S.SeatTimeData>
                      <span>석</span>
                    </span>
                  </S.SeatItem>
                </S.SeatList>
              )}
            </>
          </S.SeatBox>
        </S.SeatWrapper>
      ) : (
        <S.SeatWrapper>
          <h1>-</h1>
          <h1>이미 마감된 공연입니다.</h1>
          <h1>-</h1>
        </S.SeatWrapper>
      )}
      <>
        {selectedTimeData && (
          <TicketingSelectSeat
            showData={selectedShowData}
            timeData={selectedTimeData}
          />
        )}
      </>

      <S.ContentWrapper>
        <S.TicketingTabs>
          <S.TicketingTabList>
            <S.TicketingTabItem>
              <S.TicketingTabBtn
                active={activeTab === 0}
                onClick={() => handleTabClick(0)}
              >
                상세정보
              </S.TicketingTabBtn>
            </S.TicketingTabItem>
            <S.TicketingTabItem>
              <S.TicketingTabBtn
                active={activeTab === 1}
                onClick={() => handleTabClick(1)}
              >
                관람후기
              </S.TicketingTabBtn>
            </S.TicketingTabItem>
            <S.TicketingTabItem>
              <S.TicketingTabBtn
                active={activeTab === 2}
                onClick={() => handleTabClick(2)}
              >
                장소안내
              </S.TicketingTabBtn>
            </S.TicketingTabItem>
            <S.TicketingTabItem>
              <S.TicketingTabBtn
                active={activeTab === 3}
                onClick={() => handleTabClick(3)}
              >
                예매유의사항
              </S.TicketingTabBtn>
            </S.TicketingTabItem>
          </S.TicketingTabList>
        </S.TicketingTabs>
      </S.ContentWrapper>
      <S.ContentWrapper>
        {activeTab === 0 && selectedShowData && (
          <S.TabContentDetail>
            <S.TabContentWrapper>
              <h2>작품 상세 정보</h2>
              <hr />
              <S.TabContentDetailImg>
                {selectedShowData.styurl && (
                  <img src={selectedShowData.styurl} alt="" />
                )}
              </S.TabContentDetailImg>
            </S.TabContentWrapper>
          </S.TabContentDetail>
        )}
        {activeTab === 1 && selectedShowData && (
          <S.TabContentReview>
            <S.TabContentWrapper>
              <TicketingReview mt20id={selectedShowData.mt20id} />
            </S.TabContentWrapper>
          </S.TabContentReview>
        )}
        {activeTab === 2 && selectedShowData && (
          <S.TabContentWrapper>
            <h2>공연장 안내</h2>
            <hr />
            <p>장소: {selectedShowData.fcltynm}</p>
            <p>문의: {selectedShowData.telno}</p>
            <PlaceMap mt10id={selectedShowData.mt10id} />
          </S.TabContentWrapper>
        )}
        {activeTab === 3 && selectedShowData && (
          <S.TabContentNotice>
            <S.TabContentWrapper>
              <h2>예매 유의사항</h2>
              <ul>
                <li>
                  다른 이용자의 원활한 예매 및 취소에 지장을 초래할 정도로
                  반복적인 행위를 지속하는 경우 회원의 서비스 이용을 제한할 수
                  있습니다.
                </li>
                <li>당일 공연/전시 예매 및 취소는 불가합니다.</li>
                <li>
                  관람일자/회차 변경은 불가능하므로, 변경이 필요한 경우라면 취소
                  후 다시 예매하시기 바랍니다.
                </li>
              </ul>
              <hr />
              <h2>예매내역 확인 및 취소</h2>
              <ul>
                <li>[마이페이지] - [예매 내역]에서 확인 및 취소 가능합니다.</li>
                <li>예매 취소 시 취소수수료가 적용될 수 있습니다.</li>
              </ul>
              <hr />
              <h2>환불안내</h2>
              <ul>
                <li style={{ listStyleType: "none", fontSize: "20px" }}>
                  - 신용카드 결제 -
                </li>
                <li>
                  일반적으로 당사의 취소 처리가 완료되고 4~5일 후 카드사의
                  취소가 확인됩니다. (체크카드 동일)
                </li>
                <li>
                  예매 취소 시점과 해당 카드사의 환불 처리기준에 따라 취소금액의
                  환급방법과 환급일은 다소 차이가 있을 수 있으며, 예매 취소시
                  기존에 결제하였던 내역을 취소하며 최초 결제하셨던 동일카드로
                  취소 시점에 따라 취소수수료와 배송료를 재승인 합니다.
                </li>
                <br />
                <li style={{ listStyleType: "none", fontSize: "20px" }}>
                  - 무통장 입금의 경우 -
                </li>
                <li>
                  예매 취소 시에 환불 계좌번호를 남기고, 그 계좌를 통해
                  취소수수료를 제외한 금액을 환불 받습니다. 취소 후 고객님의
                  계좌로 입금까지 대략 5~7일 정도가 소요됩니다. (주말 제외)
                </li>
                <li>
                  환불은 반드시 예매자 본인 명의의 계좌로만 받으실 수 있습니다.
                </li>
              </ul>
              <hr />
            </S.TabContentWrapper>
          </S.TabContentNotice>
        )}
      </S.ContentWrapper>
    </S.TicketingWrapper>
  );
};

export default Ticketing;
