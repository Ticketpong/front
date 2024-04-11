import styled from "styled-components";
import React from "react";

const Rules = styled.div`
  p {
    font-size: 24px;
    font-weight: 500;
  }
  li {
    font-size: 18px;
    line-height: 50px;
  }
`;

const Container = styled.div`
  max-width: 1500px;
  padding: 20px;
  margin-top: 20px;
`;
const CommunityRules = () => {
  return (
    <Container>
      <Rules>
        <hr />
        <p>이용수칙</p>
        <li>
          1인 4매 (본인 및 동반인 3인) 까지 예매 가능합니다. 예매 시, 필요한
          매수 만큼만 예매해 주시기 바랍니다.
        </li>
        <li>
          예매 및 예매취소는 공연/전시 전일 오후 5시까지 가능합니다. (예매 및
          예매취소 완료시간 기준)
        </li>
        <li>
          비지정 좌석으로 예매되며, 공연/전시 관람 당일 공연(전시)장 매표소에서
          좌석이 지정 됩니다.
        </li>
        <li>
          티켓 수령은 신분증으로 본인 확인 후 수령 가능하며, 가족을 포함한 제3자
          수령이 불가합니다. 타인에게 티켓 양도가 불가하며, 부정사용 시에는
          회원자격 영구 정지됩니다.
        </li>
        <li>
          예매 취소 없이 미관람한 경우에는 일정 기간 동안 회원자격이 일시
          정지됩니다. 관람이 어려운 경우에는 공연/전시 전일 오후 5시까지
          예매취소를 진행해 주시기 바랍니다.
        </li>
        <li>
          회원정보는 반드시 정확한 정보로 입력하여 관리해 주시기 바랍니다.
          회원정보 관리가 미흡하여 공지가 미진행된 경우에는 회원에게 책임이
          있음을 숙지해 주시기 바랍니다.
        </li>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <hr />
      </Rules>
    </Container>
  );
};

export default CommunityRules;
