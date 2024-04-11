import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
// import testData from "../../../dummy/show_detail.json";

const Container = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  width: 100%;
  border-top: 2px solid #373a42;
  border-bottom: 1px solid #373a42;
`;

const Header = styled.th`
  font-weight: 500;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #373a42;
  background-color: #f6f8f7;
`;

const Cell = styled.td`
  padding: 10px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;

  &:last-child {
    border-right: none;
  }
`;

const Button = styled.button`
  width: 70px;
  height: 36px;
  margin-right: 15px;
  background-color: white;
  border: 1px solid #999999;
  border-radius: 3px;
`;

const AddButton = styled.button`
  width: 120px;
  height: 51px;
  border-radius: 3px;
  background-color: #fc1055;
  color: white;
  border: none;
  position: absolute;
  right: 10%;
`;

const Pagination = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PageButton = styled(Button)`
  width: 40px;
  height: 36px;
`;

const PerformanceManage = ({ onAddClick, onEditClick }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manage/manageMain/performance` // 공연 리스트 불러오는 백엔드 url
      );

      const newData = response.data.map((item, index) => ({
        ...item,
        number: (page - 1) * 7 + index + 1,
      }));
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const url = `http://localhost:8080/manage/manageMain/performanceDelete`; // 공연 삭제 백엔드 url

  // dummyData로 test
  // const fetchData = async () => {
  //   try {
  //     // 데이터를 가져오는 로직 추가
  //     setData(testData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


 
  const performanceDelete = async (mt20id) => {
    try {
      const response = await axios.delete(url, { data: { mt20id } }); // pk값으로 조회
      console.log(response);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

   // 페이징 구현
  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / 10))
    );
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  const renderPageButtons = () => {
    const totalPageCount = Math.ceil(data.length / 10);
    const pageButtons = [];

    for (let i = 1; i <= totalPageCount; i++) {
      pageButtons.push(
        <PageButton
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={page === i}
        >
          {i}
        </PageButton>
      );
    }
 
    return pageButtons;
  };

  return (
    <>
      <Container>
        <thead>
          <tr>
            <Header>번호</Header>
            <Header>공연ID</Header>
            <Header>공연제목</Header>
            <Header>장르</Header>
            <Header>시작일</Header>
            <Header>종료일</Header>
            <Header>공연상태</Header>
            <Header>게시여부</Header>
            <Header></Header>
            <Header></Header>
          </tr>
        </thead>
        <tbody>
          {/* 페이징에 맞게 데이터 렌더링 */}
          {data
            .slice((page - 1) * 10, page * 10)
            .map((item, index) => (
              <tr key={index}>
                <Cell>{item.number}</Cell>
                <Cell>{item.mt20id}</Cell>
                <Cell>{item.prfnm}</Cell>
                <Cell>{item.genrenm}</Cell>
                <Cell>{item.prfpdfrom}</Cell>
                <Cell>{item.prfpdto}</Cell>
                <Cell>{item.prfstate}</Cell>
                <Cell>{item.post ? "y" : "n"}</Cell>
                {/* 수정 삭제 버튼 */}
                <Cell>
                  <Button onClick={() => onEditClick(item.mt20id)}>
                    수정
                  </Button>
                  {/* 삭제 버튼 */}
                  <Button onClick={() => performanceDelete(item.mt20id)}>
                  삭제
                </Button>
                </Cell>
              </tr>
            ))}
        </tbody>
      </Container>
      {/* 페이지네이션 버튼 */}
      <Pagination>
        <Button onClick={handlePreviousPage}>
          <MdKeyboardArrowLeft />
        </Button>
        {renderPageButtons()}
        <Button onClick={handleNextPage}>
          <MdKeyboardArrowRight />
        </Button>
      </Pagination>
      {/* 공연 추가 버튼 */}
      <AddButton name="add" onClick={onAddClick}>
        공연추가하기
      </AddButton>
    </>
  );
};

export default PerformanceManage;
