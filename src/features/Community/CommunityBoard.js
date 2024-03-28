import React, { useState } from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  width: 70%;
  padding: 20px;
  margin-top: 20px;

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
`;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const Th = styled.th`
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  padding: 8px;
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

const CommunityBoard = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostList, setShowPostList] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
    setSelectedPost(null);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <BoardContainer>
      {/* 게시판 리스트 */}
      {showPostList && (
        <>
          <PostTable>
            <thead>
              <tr>
                <Th>번호</Th>
                <Th>제목</Th>
                <Th>작성일자</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => togglePost(post.id)}
                  className={selectedPost === post.id ? styled.selectedRow : ""}
                >
                  <Td>{post.id}</Td>
                  <Td>{post.title}</Td>
                  <Td>{post.date}</Td>
                </tr>
              ))}
            </tbody>
          </PostTable>

          {/* 페이지 이동 */}
          <div className="pagination">
            <button onClick={() => handleClick(1)}>&laquo;</button>
            <button onClick={() => handleClick(currentPage - 1)}>&lt;</button>
            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(
              (number) => (
                <button
                  key={number}
                  onClick={() => handleClick(number)}
                  className={currentPage === number ? styled.active : ""}
                >
                  {number + 1}
                  {/* 한 페이지만 있는 관계로 임시로 + 1 처리 */}
                </button>
              )
            )}
            <button onClick={() => handleClick(currentPage + 1)}>&gt;</button>
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
    </BoardContainer>
  );
};

export default CommunityBoard;
