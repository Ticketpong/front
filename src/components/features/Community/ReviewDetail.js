import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosWithAuth from "../../base/axiosWithAuth";

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
  border-top: 1px solid #999999;
  padding-top: 15px;
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
  cursor: pointer;
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

const Button = styled.button`
  background: none;
  border: none;
`;

const RecommandNum = styled.span`
  font-size: 20px;
  margin-left: 5px;
  padding-bottom: 3px;
`;

const Recommand = styled.div`
  display: flex;
  float: right;
  align-items: center;
  justify-content: right;
  position: inline;
`;

const ReviewDetail = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [recommandState, setRecommandState] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const preid = location.state.preId;

  useEffect(() => {
    const getReviewInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/review/detail",
          {
            pre_id: preid,
          }
        );

        const newData = response.data.map((item, index) => ({
          ...item,
        }));
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    };
    getReviewInfo();
  }, [preid, recommandState]);

  useEffect(() => {
    fetchLoginStatus();
  }, []);

  const fetchLoginStatus = async () => {
    try {
      const response = await axiosWithAuth().get(
        "http://localhost:8080/login/profile"
      );
      const { id, isLogined } = response.data;
      if (isLogined) {
        setUserId(id);
        setIsLogined(true);
      }
    } catch {
      console.log("로그인 상태를 확인하는 동안 오류 발생:");
    }
  };

  useEffect(() => {
    const getRecommandInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/review/recommand",
          {
            pre_id: preid,
            user_id: userId,
          }
        );
        const newData = response.data;
        setRecommandState(newData);
      } catch (error) {
        console.error(error);
      }
    };
    getRecommandInfo();
  }, [preid, userId]);

  const recommandHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/review/checkRecommand",
        {
          pre_id: preid,
          user_id: userId,
        }
      );
      if (response.data === "recommand success") {
        setRecommandState(true);
        console.log("추천 성공");
      } else if (response.data === "login required") {
        alert("로그인 후 이용해주세요");
        navigate("/login");
      } else {
        setRecommandState(false);
        console.log("추천 취소");
      }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${day}-${month}`;
  };

  const handleDeleteButtonClick = async () => {
    const confirmDelete = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirmDelete) {
      const response = await axios.post("http://localhost:8080/review/delete", {
        pre_id: preid,
      });
      navigate(-1);
    }
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
              <P3>{item.prfnm}</P3>
              <P4>{item.pretitle}</P4>
              <Span>
                작성자: {item.user_id} | 작성일 : {formatDate(item.predate)}
                {"    "}|
                {item.prestar && <P5> 평점: {rankStar(item.prestar)}</P5>}
                {"    "}
                <Recommand>
                  <Button onClick={recommandHandler}>
                    {recommandState ? (
                      <FcLike size="30" />
                    ) : (
                      <GoHeart size="30" />
                    )}
                    <RecommandNum>{item.recommend}</RecommandNum>
                  </Button>
                </Recommand>
              </Span>
              <HrBox />
              <OutputArea>{item.precontent}</OutputArea>

              <ButtonContainer>
                {userId === item.user_id && (
                  <>
                    {" "}
                    <ListButton
                      onClick={() => {
                        navigate("/editmyreview", { state: [item] });
                      }}
                    >
                      수정
                    </ListButton>
                    <ListButton onClick={handleDeleteButtonClick}>
                      삭제
                    </ListButton>
                  </>
                )}
                <ListButton>
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to="/community#review"
                  >
                    목록
                  </Link>
                </ListButton>
              </ButtonContainer>
            </Content>
          ))}
        </Container>
      )}
    </div>
  );
};

export default ReviewDetail;
