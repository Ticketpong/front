import React from "react";
import { useParams } from "react-router-dom";
import jsonData from "../../../dummy/ReviewData.json";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 900px;
  margin: 80px auto;
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

  const data = jsonData;

  const rankStar = (num) => {
    const stars = [];

    for (let i = 0; i < num; i++) {
      stars.push(<Rank key={i}>★</Rank>);
    }

    return stars;
  };

  return (
    <div>
      {data?.boxofs?.boxof && (
        <Container>
          <Textbox>
            <P1>커뮤니티 | </P1>
            <P2>관람후기</P2>
          </Textbox>
          <hr />
          {data.boxofs.boxof.map(
            (item, index) =>
              item.prfnm._text === prfnmText && (
                <Content key={index}>
                  <P3>{item.prfnm._text}</P3>
                  <P4>리뷰 제목</P4>
                  <Span>
                    작성자: {item.prfplcnm._text} | 작성일 : {item.prfpd._text}
                    {"    "}|
                    {item.rank && <P5> 평점: {rankStar(item.rank._num)}</P5>}
                    {"    "}
                  </Span>
                  <HrBox />
                  <OutputArea>{item.review._text}</OutputArea>
                </Content>
              )
          )}
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
