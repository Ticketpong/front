import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommuReview from "../../features/Community/CommuReview.js";
import CommunityBoard from "../../features/Community/CommunityBoard.js";
import styled from "styled-components";

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

  p {
    font-weight: 500;
  }
  span {
    font-size: 20px;
  }
  .content {
    width: 70%; /* 컨텐츠의 너비를 조절합니다. */
    padding: 20px;
    margin-top: 100px;
  }
  .item {
    background-color: #f0f0f0;
    border: 1px solid #999999;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .item:hover {
    background-color: #e0e0e0;
  }

  .box {
    background-color: #fff;
    border: 1px solid #999999;
    padding: 20px;
    height: 700px;
    overflow-y: auto;
  }
`;
const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  padding: 20px;
  margin-top: 100px;
  margin-right: 100px;
  font-size: 24px;
`;

const Contents = styled.div`
  width: 70%;
  padding: 20px;
  margin-top: 100px;

  span {
    font-weight: 500;
    font-size: 34px;
  }
  .item {
    background-color: #f0f0f0;
    border: 1px solid #999999;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .item:hover {
    background-color: #999999;
  }

  .box {
    background-color: #fff;
    border: 1px solid #999999;
    padding: 20px;
    height: 700px;
    overflow-y: auto;
  }
`;

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

function Community() {
  const [selectedItem, setSelectedItem] = useState(1);

  // 후기 전체보기 링크 영역
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedItem = parseInt(searchParams.get("selectedItem"));
    if (selectedItem) {
      handleItemClick(selectedItem);
    }
  }, [location.search]);

  const handleItemClick = (num) => {
    setSelectedItem(num);
    const items = document.querySelectorAll(".item");
    items.forEach((item, index) => {
      if (index + 1 === num) {
        item.style.color = "red";
        item.querySelector("span").style.color = "red";
      } else {
        item.style.color = "inherit";
        item.querySelector("span").style.color = "black";
      }
    });
  };

  // 이름 변경
  let selectedName = "";
  switch (selectedItem) {
    case 1:
      selectedName = "공지사항";
      break;
    case 2:
      selectedName = "관람 후기";
      break;
    case 3:
      selectedName = "이용 안내";
      break;
    default:
      selectedName = "";
  }

  return (
    <Container>
      <Sidebar>
        <Head>커뮤니티</Head>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(1)}
        >
          공지사항
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(2)}
        >
          관람 후기
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        <div
          className={`${styled.item} item`}
          onClick={() => handleItemClick(3)}
        >
          이용 안내
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
      </Sidebar>
      <Contents>
        <span>{selectedName}</span>
        <div
          className={`${styled.box} ${styled.text}`}
          style={{ display: selectedItem === 1 ? "block" : "none" }}
        >
          <CommunityBoard />
        </div>
        <div
          className={styled.box}
          style={{ display: selectedItem === 2 ? "block" : "none" }}
        >
          <>
            <CommuReview />
          </>
        </div>
        <Rules style={{ display: selectedItem === 3 ? "block" : "none" }}>
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
            비지정 좌석으로 예매되며, 공연/전시 관람 당일 공연(전시)장
            매표소에서 좌석이 지정 됩니다.
          </li>
          <li>
            티켓 수령은 신분증으로 본인 확인 후 수령 가능하며, 가족을 포함한
            제3자 수령이 불가합니다. 타인에게 티켓 양도가 불가하며, 부정사용
            시에는 회원자격 영구 정지됩니다.
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
      </Contents>
    </Container>
  );
}

export default Community;
