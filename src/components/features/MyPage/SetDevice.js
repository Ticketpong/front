import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosWithAuth from "../../base/axiosWithAuth";
import axios from "axios";

const Wrapper = styled.div`
  width: 70%;
  padding: 20px;
  margin-top: 50px;
  text-align: center;

  ul {
    margin: 10px auto;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    flex: 1;
    padding: 0 5px;
    font-weight: 700;
  }
  p {
    flex: 1;
    padding: 0 5px;
  }
  button {
    border: 1px solid #fc1055;
    width: 200px;
    border-radius: 5px;
    text-align: center;
    height: 35px;
    font-size: 15px;
    background-color: #fc1055;
    color: #fff;
  }
`;

const SetDevice = () => {
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [userAgent, setUserAgent] = useState("");
  const [nowData, setNowData] = useState({
    device_id: "",
    user_id: "",
    device_name: "",
  });
  const [regiData, setRegiData] = useState([]);

  useEffect(() => {
    fetchStatusLogin();
  }, []);

  const fetchStatusLogin = async () => {
    const response = await axiosWithAuth().get(
      "http://localhost:8080/login/profile"
    ); //로그인 상태 확인
    const { id, isLogined } = response.data;
    if (isLogined) {
      setUserId(id);
      setIsLogined(isLogined);
    } else {
      console.log("로그인 상태가 아닙니다.");
    }
  };

  useEffect(() => {
    if (userId) {
      getMacInfo();
    }
  }, [userId]);

  const getMacInfo = async () => {
    console.log(userId); //들어감
    try {
      const response = await axios.get(
        "http://localhost:8080/macAddress/profile",
        {
          user_id: userId,
        }
      );
      console.log(response); // 응답 데이터 data 빈 배열
      setRegiData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMacInfo = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/macAddress/edit",
        {
          device_id: setDeviceId(),
          device_name: userAgent,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.userAgent.match(/iPhone/i)) {
      setUserAgent("iPhone");
    } else if (navigator.userAgent.match(/Android/i)) {
      setUserAgent("Android");
    } else if (navigator.userAgent.match(/Mobi/i)) {
      setUserAgent("Mobile");
    } else if (navigator.userAgent.match(/iPad/i)) {
      setUserAgent("iPad");
    } else {
      setUserAgent("PC");
    }
  }, []);

  const setDeviceId = () => {
    const currentTime = Date.now().toString();
    const randomValue = Math.random().toString(36).substr(10);
    const device_id = currentTime + randomValue;

    return device_id;
  };

  useEffect(() => {
    setNowData({
      device_id: setDeviceId(),
      user_id: userId,
      device_name: userAgent,
    });
  }, [userId, userAgent]);

  const postMacInfo = async () => {
    const response = await axios.post("http://localhost:8080/macAddress", {
      device_id: nowData.device_id,
      user_id: nowData.user_id,
      device_name: nowData.device_name,
    });
  };

  const setMac = () => {
    const today = new Date();
    if (regiData.length > 0) {
      console.log(regiData.length);
      if (today - regiData.res_date > 30) {
        updateMacInfo();
      } else {
        alert(`${30 - (today - regiData.res_date)}일 후 재설정이 가능합니다.`);
      }
    } else {
      postMacInfo();
      alert("설정이 완료되었습니다!");
    }
  };

  return (
    <>
      <Wrapper>
        {nowData && ( // nowData가 존재할 때만 표시
          <ul>
            <li>
              <span>등록된 기기 ID: </span>
              <p>{regiData.device_id}</p>
            </li>
            <li>
              <span>등록된 기기 유형: </span>
              <p>{regiData.device_name}</p>
            </li>
            <li>
              <span>접속한 기기 ID: </span>
              <p>{nowData.device_id}</p>
            </li>
            <li>
              <span>접속한 기기 유형: </span>
              <p>{nowData.device_name}</p>
            </li>
          </ul>
        )}
        <button onClick={setMac}>현재 접속한 기기로 설정</button>
      </Wrapper>
    </>
  );
};

export default SetDevice;
