import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommuReview from "./CommuReview";
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
  /* 게시판 컨테이너 스타일 */
  .boardContainer {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  /* 게시판 표 스타일 */
  .postTable {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  /* 테이블 헤더 스타일 */
  .postTable th {
    padding: 8px;
    text-align: center;
    background-color: #f2f2f2;
  }

  .postTable th:nth-child(2) {
    text-align: left;
  }

  /* 테이블 행 스타일 */
  .postTable tr {
    border-bottom: 1px solid #ddd;
  }

  /* 선택된 행 스타일 */
  .postTable tr.selectedRow {
    background-color: #eaeaea;
  }

  /* 테이블 데이터 셀 스타일 */
  .postTable td {
    padding: 8px;
  }

  .postTable th:first-child,
  .postTable td:first-child,
  .postTable th:last-child,
  .postTable td:last-child {
    width: 20%; /* id 및 date 열의 비중 */
  }

  .postTable th:nth-child(2),
  .postTable td:nth-child(2) {
    width: 60%; /* title 열의 비중 */
  }

  /* Optional: Adjusting title text alignment */
  .postTable td:nth-child(2) {
    text-align: left; /* 제목 텍스트를 왼쪽 정렬로 변경 */
  }

  /* 게시글 내용 컨테이너 스타일 */
  .postContentContainer {
    margin-top: 20px;
  }

  /* 게시글 내용 스타일 */
  .postContent {
    margin-bottom: 10px;
  }
  /* 게시글 내용 글자크기 */
  td {
    font-size: 24px;
  }
  /* 목록으로 돌아가기 버튼 스타일 */
  .goBackButton {
    cursor: pointer;
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }

  /* 목록으로 돌아가기 버튼 호버 스타일 */

  .pagination {
    margin-top: 50px;
    text-align: center;
  }

  .pagination button {
    margin-left: 10px;
    margin-right: 10px;
    border: 0;
    background-color: white;
    font-size: 16px;
  }

  /* 게시판 내용 */

  .postContentContainer {
    position: relative;
  }

  .postContent {
    max-height: calc(1.2em * 7); /* 최대 7줄의 높이로 설정 */
    overflow: hidden;
    margin-bottom: 300px; /* 공백 추가 */
  }

  .postContent::after {
    content: "";
    display: block;
    height: 0;
    width: 100%;
    visibility: hidden;
  }

  .goBackButton {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 16px;
    background-color: #fc1055;
  }
`;

const GoBackBtn = styled.button`
  float: right;
  width: 120px;
  height: 50px;
  border-radius: 3px;
  color: #ffffff;
  background-color: #fc1055;
  border: none;
  font-size: 18px;
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostList, setShowPostList] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // 예시 게시글
  const [posts] = useState([
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "첫 번째 게시글의 내용입니다.",
      date: "2024-03-19",
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "두 번째 게시글의 내용입니다.",
      date: "2024-03-20",
    },
    {
      id: 3,
      title: "세 번째 게시글",
      content: "세 번째 게시글의 내용입니다.",
      date: "2024-03-21",
    },
  ]);

  // 게시글 토글
  const togglePost = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(postId);
      setShowPostList(false); // 게시판 리스트 감춤
    }
  };

  const toggleList = () => {
    setShowPostList(!showPostList);
    setSelectedPost(null); // 선택된 게시글 초기화
  };

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

  // 페이지 번호 클릭 시 해당 페이지로 이동하는 함수
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에서 보여줄 게시글 목록
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
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
          <div className={styled.boardContainer}>
            {/* 게시판 리스트 */}
            {showPostList && (
              <>
                <table className="postTable">
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>제목</th>
                      <th>작성일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        onClick={() => togglePost(post.id)}
                        className={
                          selectedPost === post.id ? styled.selectedRow : ""
                        }
                      >
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 페이지 이동 */}
                <div className="pagination">
                  <button onClick={() => handleClick(1)}>&laquo;</button>
                  <button onClick={() => handleClick(currentPage - 1)}>
                    &lt;
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleClick(number)}
                      className={currentPage === number ? styled.active : ""}
                    >
                      {number}
                    </button>
                  ))}
                  <button onClick={() => handleClick(currentPage + 1)}>
                    &gt;
                  </button>
                  <button
                    onClick={() =>
                      handleClick(Math.ceil(posts.length / postsPerPage))
                    }
                  >
                    &raquo;
                  </button>
                </div>
              </>
            )}

            {/* 선택된 게시글 내용 */}
            {!showPostList && selectedPost && (
              <div className={styled.postContentContainer}>
                <h3>{posts.find((post) => post.id === selectedPost).title}</h3>
                <h5>{posts.find((post) => post.id === selectedPost).date}</h5>
                <hr />
                <p className={styled.postContent}>
                  {posts.find((post) => post.id === selectedPost).content}
                </p>
                <hr />
                <GoBackBtn onClick={toggleList}>목록</GoBackBtn>
              </div>
            )}
          </div>
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
