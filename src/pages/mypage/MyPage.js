import React, { useState } from "react";
import styled from "styled-components";
import BookingDetail from "./BookingDetail";
import MyReview from "./MyReview";

const Head = styled.div`
  font-size: 42px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  padding: 20px;
  margin-top: 110px;
  margin-right: 100px;
  font-size: 24px;

  .item {
    background-color: #f0f0f0;
    border: 1px solid #999999;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 70%;
  padding: 20px;
  margin-top: 120px;

  span {
    font-weight: lighter;
    font-size: 18px;
    color: #999999;
  }
  .box {
    background-color: #fff;
    border: 1px solid #999999;
    padding: 20px;
    height: 700px;
    overflow-y: auto;
  }

  p {
    font-size: 34px;
    margin: 0;
    text-align: left;
    line-height: 50px;
    font-weight: 500;
    padding: 5px;
  }

  .text {
    font-weight: lighter;
    font-size: 10px;
    color: #999999;
  }
`;

const MyPage = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const handleItemClick = (num) => {
    setSelectedItem(num);
    const items = document.querySelectorAll(".item");
    items.forEach((item, index) => {
      if (index + 1 === num) {
        item.style.color = "red";
        item.querySelector("span").style.color = "#fc1055";
      } else {
        item.style.color = "inherit";
        item.querySelector("span").style.color = "black";
      }
    });
  };

  // 이름 변경
  let selectedName = "";
  let subText = "";
  switch (selectedItem) {
    case 1:
      selectedName = "예매내역";
      subText = "최대 지난 1년간의 예매내역을 확인할 수 있습니다.";
      break;
    case 2:
      selectedName = "관람 후기";
      subText = "";
      break;
    case 3:
      selectedName = "회원정보수정";
      subText = "";
      break;
    default:
      selectedName = "";
  }
  return (
    <Container>
      <Sidebar>
        <Head>마이 페이지</Head>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(1)}
        >
          예매내역
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(2)}
        >
          관람 후기
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(3)}
        >
          회원정보수정
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
      </Sidebar>
      <Content>
        <p>
          {selectedName}
          <span id={styled.subTextStyle}>&nbsp;&nbsp;{subText}</span>
        </p>
        <div
          className={`${styled.box} ${styled.text}`}
          style={{ display: selectedItem === 1 ? "block" : "none" }}
        >
          <BookingDetail />
        </div>
        <div
          className={styled.box}
          style={{ display: selectedItem === 2 ? "block" : "none" }}
        >
          <MyReview />
        </div>
        <div
          className={styled.box}
          style={{ display: selectedItem === 3 ? "block" : "none" }}
        >
          내용3
        </div>
      </Content>
    </Container>
  );
};

export default MyPage;
