import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosWithAuth from "../../base/axiosWithAuth";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 50px;
  text-align: center;

  ul {
    width: 500px;
    margin: 0 auto;
    padding: 10px;
    list-style: none;
    border: 1px solid #999999;
    border-radius: 15px;
  }
  li {
    width: 400px;
    display: flex;
    text-align: left;
    line-height: 55px;
    margin: 0 auto;
  }
  span {
    flex: 1;
    padding: 0 5px;
    font-weight: 700;
  }
  p {
    margin: 0;
    flex: 1;
    padding: 0 5px;
  }
  button {
    margin-top: 20px;
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
    try {
      const response = await axios.post(
        "http://localhost:8080/macAddress/profile",
        {
          user_id: userId,
        }
      );

      setRegiData(response.data[0]);
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
    const getDateStringDifference = (dateString) => {
      const today = new Date();
      const date2 = new Date(dateString);

      const differenceInMs = Math.abs(today - date2);
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
      return Math.floor(differenceInDays);
    };

    if (regiData) {
      console.log(regiData.length);
      if (getDateStringDifference(regiData.res_date) > 30) {
        updateMacInfo();
        alert("설정이 완료되었습니다!");
        window.location.reload();
      } else {
        alert(
          `${
            30 - getDateStringDifference(regiData.res_date)
          }일 후 재설정이 가능합니다.`
        );
      }
    } else {
      console.log(regiData);
      postMacInfo();
      alert("설정이 완료되었습니다!");
      window.location.reload();
    }
  };

  return (
    <>
      <Wrapper>
        {nowData && ( // nowData가 존재할 때만 표시
          <ul>
            <li>
              <span>등록된 기기 ID: </span>
              <p>{regiData ? regiData.macaddress : "기기를 등록해주세요."}</p>
            </li>
            <li>
              <span>등록된 기기 유형: </span>
              <p>{regiData ? regiData.device_name : "기기를 등록해주세요."}</p>
            </li>
            {/* <li>
              <span>접속한 기기 ID: </span>
              <p>{nowData.macaddress}</p>
            </li> */}
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
