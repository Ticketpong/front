import React from "react";
import * as S from "../../../styles/TicketingStyled";
import { useNavigate } from "react-router-dom";

const TicketingHeader = ({ headerData }) => {
  const navigate = useNavigate();
  const clickHome = () => {
    navigate("/");
  };
  const clickShowList = () => {
    navigate("/viewall");
  };
  return (
    <S.ContentTitle>
      <S.NavLocation>
        <span onClick={clickHome}>HOME</span>
        <span>/</span>
        <span onClick={clickShowList}>공연전시예매</span>
        <span>/</span>
        <span style={{ cursor: "default" }}>{headerData.genrenm}</span>
      </S.NavLocation>
      <strong>{headerData.prfnm}</strong>
      <span>
        {headerData.prfpdfrom} ~ {headerData.prfpdto}
      </span>
    </S.ContentTitle>
  );
};

export default TicketingHeader;
