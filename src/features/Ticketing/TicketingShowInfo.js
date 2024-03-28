import React from "react";
import * as S from "../../styles/TicketingStyled";

const TicketingShowInfo = ({ showInfoData }) => {
  return (
    <S.ContentDetailInfo>
      <ul>
        <li>공연일시</li>
        <span>
          {showInfoData.prfpdfrom} ~ {showInfoData.prfpdto}
        </span>
      </ul>
      <ul>
        <li>시간</li>
        <span>{showInfoData.dtguidance}</span>
      </ul>
      <ul>
        <li>장소</li>
        <span>{showInfoData.fcltynm}</span>
      </ul>
      <ul>
        <li>관람시간</li>
        <span>{showInfoData.prfruntime}</span>
      </ul>
      <ul>
        <li>관람등급</li>
        <span>{showInfoData.prfage}</span>
      </ul>
      <ul>
        <li>문의</li>
        <span>📞{showInfoData.telno}</span>
      </ul>
      <hr />
      <ul>
        <li style={{ color: "#AB003C" }}>티켓가격</li>
        <span>{showInfoData.pcseguidance}</span>
      </ul>
    </S.ContentDetailInfo>
  );
};

export default TicketingShowInfo;
