import React, { useState } from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin-top: 20px;

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

  .postContent::after {
    content: "";
    display: block;
    height: 0;
    width: 100%;
    visibility: hidden;
  }
`;

const PostTable = styled.table`
  width: 50%;
  border-collapse: collapse;
  text-align: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  & thead {
    text-align: center;
  }

  & tbody {
    text-align: center;
  }
`;

const Th = styled.th`
  padding: 12px;
  font-size: 18px;
  text-align: center;
  background-color: #f2f2f2;
  &:nth-child(2) {
    text-align: center;
    width: 60%;
  }
  &:first-child,
  &:last-child {
    width: 20%;
  }
`;

const Td = styled.td`
  padding: 12px;
  font-size: 18px;
  border-bottom: 1px solid #999999;
  text-align: center;
  &:first-child,
  &:last-child {
    min-width: 200px;
  }
  &:nth-child(2) {
    min-width: 600px;
    text-align: center;
  }
`;

const PostContentContainer = styled.div`
  text-align: left;
  padding-top: 10px;
`;

const Textbox = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 28px;
`;

const P1 = styled.span`
  font-size: 34px;
  font-weight: bold;
`;

const P2 = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #999999;
  margin-left: 20px;
  vertical-align: baseline;
  margin-top: 24px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const P3 = styled.span`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const P4 = styled.span`
  font-size: 18px;
  color: #999999;
  margin-bottom: 12px;
`;

const PostContext = styled.div`
  height: 200px;
  padding: 20px;
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
      id: 3,
      title: "개인정보 처리방침 변경안내",
      content:
        "개인정보보호위원회(이하 `개인정보위'라 한다)는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립 ‧ 공개합니다.",
      date: "2024-03-19",
    },
    {
      id: 2,
      title: "3월 시스템 점검 공지",
      content:
        "티켓퐁를 이용해주시는 회원님들께 감사드리며, 시스템 정기 점검에 관한 안내 말씀드립니다. 서비스 품질 향상을 위한 시스템 정기 점검으로 인해 2023년 4월 28일(금) AM 00:00 부터 ~ 05:00 까지, 5시간 동안 티켓퐁 서비스가 일시 중지됨을 알려드리오니, 서비스 이용에 참고하시기 바랍니다.",
      date: "2024-03-10",
    },
    {
      id: 1,
      title: "고객지원센터 2024년 4월 휴무일 안내",
      content:
        "안녕하세요, 티켓퐁입니다. 3월 중 아래 일정에 고객센터 업무가 진행되지 않을 예정이오니이용에 불편 없으시도록 참고하여 주시기 바랍니다.일정 :- 2023년 3월 1일(화) - 삼일절 - 2023년 3월 9일(수) - 20대 대통령 선거일",
      date: "2024-03-01",
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
      {showPostList && (
        <>
          <PostTable>
            <thead>
              <tr>
                <Th width="20%">번호</Th>
                <Th width="60%">제목</Th>
                <Th width="20%">작성일자</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => togglePost(post.id)}
                  className={selectedPost === post.id ? "selectedRow" : ""}
                >
                  <Td width="20%">{post.id}</Td>
                  <Td width="60%">{post.title}</Td>
                  <Td width="20%">{post.date}</Td>
                </tr>
              ))}
            </tbody>
          </PostTable>

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
      {!showPostList && selectedPost && (
        <PostContentContainer>
          {/* <Textbox>
            <P1>커뮤니티 | </P1>
            <P2>관람후기</P2>
          </Textbox> */}
          <hr />
          <NameBox>
            <P3>{posts.find((post) => post.id === selectedPost).title}</P3>
            <P4>{posts.find((post) => post.id === selectedPost).date}</P4>
          </NameBox>
          <hr />
          <PostContext>
            {posts.find((post) => post.id === selectedPost).content}
          </PostContext>
          <hr />
          <GoBackBtn onClick={toggleList}>목록</GoBackBtn>
        </PostContentContainer>
      )}
    </BoardContainer>
  );
};

export default CommunityBoard;
