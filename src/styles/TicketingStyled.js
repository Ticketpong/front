import styled from "styled-components";

export const TicketingWrapper = styled.div`
  margin: 100px auto;
  width: 1120px;
`;
export const ContentWrapper = styled.div`
  margin: 30px 10px;
  text-align: center;
`;

export const ContentTitle = styled.div`
  text-align: left;
  margin: 0 auto;
  margin-top: 50px;
  border-bottom: 1px solid black;
  width: 90%;
  font-weight: 400;
  strong {
    display: flex;
    font-weight: 600;
    font-size: 36px;
    justify-content: left;
    margin: 0;
  }

  span {
    font-size: 24px;
  }
`;

export const NavLocation = styled.div`
  color: #666666;
  left: 0;
  span {
    font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
  }
`;

export const ContentDetail = styled.div`
  display: flex;

  margin: 30px 80px;
  justify-content: center;
`;
export const ContentDetailPoster = styled.div`
  min-width: 400px;
  height: 573px;

  img {
    max-height: 100%;
  }
`;
export const ContentDetailInfo = styled.div`
  padding-left: 50px;
  width: 65%;
  font-size: 18px;
  font-weight: 400;

  ul {
    padding: 0 10px 10px 10px;
    margin-left: 0;
    display: flex;
    width: 95%;

    margin-bottom: 20px;
  }
  li {
    font-weight: 700;
    white-space: nowrap;
  }

  span {
    text-align: left;
    margin-left: 15px;
  }
`;

export const SeatWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.8fr;
  height: 350px;
  margin: 30px 10px;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
`;

export const SeatBox = styled.div`
  display: flex;
  padding: 20px;
  border-left: 1px solid #bfbfbf;
  border-radius: 0 15px 15px 0;
  align-items: flex-start;
  justify-content: space-between;
`;

export const BoxHeader = styled.div`
  display: block;
  width: 100px;
  text-align: left;
  span {
    display: block;
    font-size: 18px;
    margin-top: 0;
    font-weight: 700;
  }
`;

export const TimeItemList = styled.div`
  overflow-y: overlay;
  scrollbar-width: thin;
  scrollbar-color: rgba(36, 36, 40, 0.4) rgba(0, 0, 0, 0);
  padding-top: 24px;
  width: 257px;
  height: 100%;
  border: 0;
  vertical-align: top;
`;

export const TimeItemBtn = styled.button`
  padding: 11px 18px 11px 15px;
  width: 100%;
  border: 1px solid #373a42;
  border-radius: 12px;
  text-align: left;
  margin-bottom: 10px;
  height: 60px;
  font-size: 18px;
  background-color: #fff;

  &.select {
    color: #fc1055;
    border-color: #fc1055;
  }
`;

export const SeatList = styled.ul`
  padding: 0;
`;
export const SeatItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export const SeatTimeData = styled.span`
  color: #ab003c;
  font-weight: 700;
`;

export const PaymentWrapper = styled.div`
  display: flex;

  margin-top: 19px;
`;

export const TicketingTabs = styled.div`
  margin: 0 auto;
`;
export const TicketingTabList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0 auto;
`;
export const TicketingTabItem = styled.li`
  position: relative;
  flex: 1;
  list-style: none;
  text-align: center;
  &:last-child {
    border-right: 1px solid #d8d9df;
  }
`;
export const TicketingTabBtn = styled.button`
  border: none;
  display: block;
  position: relative;
  width: 100%;
  padding: 12px 10px 13px;
  border-top: 1px solid #d8d9df;
  border-left: 1px solid #d8d9df;
  font-size: 18px;
  line-height: 1.5;
  color: #373a42;
  box-sizing: border-box;

  background-color: #fff;
  cursor: pointer;
  font-weight: 700;

  color: ${({ active }) => (active ? "#F5167E" : "#818181")};
  border-color: ${({ active }) => (active ? "#F5167E" : "#d8d9df")};
  border-right: ${({ active }) => (active ? "1px solid #F5167E;" : "none")};
  border-bottom: ${({ active }) => (active ? "none" : "1px solid #F5167E")};
  outline: none;
`;

export const TabContentDetail = styled.div`
  margin: 30px 10px;
  h2 {
    font-size: 20px;
    text-align: left;
    padding-left: 25px;
  }
`;

export const TabContentDetailImg = styled.div`
  margin: 0 auto;
  text-align: center;
  img {
    max-width: 100%;
  }
`;

export const TabContentReview = styled.div`
  margin: 30px 10px;
`;
export const TabContentPlace = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    border-bottom: 2px solid #f5167e;
    padding-bottom: 2px;
  }
  hr {
    height: 0;
    width: 100%;
  }
  p {
    font-size: 15px;
    line-height: 22px;
    color: #62676c;
  }
  ul {
    width: 100%;
    text-align: left;
  }
`;
export const TabContentNotice = styled.div`
  margin: 30px 10px;
`;

export const KakaoLink = styled.button`
  margin-top: 18px;
`;
