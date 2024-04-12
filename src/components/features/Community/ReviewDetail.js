import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 900px;
  margin: 200px auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;
const Textbox = styled.div`
  display: flex;
  justify-content: left;
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

const P3 = styled.span`
  color: #999999;
  font-size: 18px;
  margin-bottom: 10px;
`;

const P4 = styled.span`
  font-size: 34px;
  margin-bottom: 10px;
`;

const HrBox = styled.div`
  border: 1px solid #999999;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 30px;
`;

const ListButton = styled.button`
  background-color: #fc1055;
  width: 110px;
  height: 50px;
  border-radius: 3px;
  border: 0;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: #ffffff;
`;

const OutputArea = styled.div`
  width: 800px;
  height: 300px;
  margin-top: 20px;
`;

const Rank = styled.span`
  color: #ffd700;
`;

const Span = styled.div`
  display: inline-block;
`;

const P5 = styled.span`
  display: inline-block;
  margin-left: 7px;
`;

const ReviewDetail = () => {
  const { prfnmText } = useParams();
  const [data, setData] = useState([]);
  const location = useLocation();

  const preid = location.state.preId;

  useEffect(() => {
    getReviewInfo();
  }, [preid]);

  const getReviewInfo = async () => {
    try {
      const response = await axios.post("http://localhost:8080/review/detail", {
        pre_id: preid,
      });

      const newData = response.data.map((item, index) => ({
        ...item,
      }));
      setData(newData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const rankStar = (num) => {
    const stars = [];

    for (let i = 0; i < num; i++) {
      stars.push(<Rank key={i}>★</Rank>);
    }

    return stars;
  };

  return (
    <div>
      {data && (
        <Container>
          <Textbox>
            <P1>커뮤니티 | </P1>
            <P2>관람후기</P2>
          </Textbox>
          <hr />
          {data.map((item) => (
            <Content key={item.pre_id}>
              <P4>{item.pretitle}</P4>
              {/* <P4>리뷰 제목</P4> */}
              <Span>
                작성자: {item.user_id} | 작성일 : {item.predate}
                {"    "}|
                {item.prestar && <P5> 평점: {rankStar(item.prestar)}</P5>}
                {"    "}
              </Span>
              <HrBox />
              <OutputArea>{item.precontent}</OutputArea>
            </Content>
          ))}
          <hr />
          <ButtonContainer>
            <ListButton>
              <Link to="/community?selectedItem=3">목록</Link>
            </ListButton>
          </ButtonContainer>
        </Container>
      )}
    </div>
  );
};

export default ReviewDetail;
