import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HeaderContainer, Logo } from "../styles/HeaderStyled";
import logoImg from "../assets/headerImg/logo.png";
import NavMenu from "../features/Header/NavMenu";
import UserMenu from "../features/Header/UserMenu";
import axios from "axios";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();
  const locationInfo = useLocation();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/login/profile",
          { withCredentials: true }
        );
        const { userId, isLogined } = response.data;
        if (isLogined) {
          setUserId(userId);
          setIsLogined(true);
        }
      } catch (error) {
        console.error("로그인 상태를 확인하는 동안 오류 발생:", error);
      }
    };

    fetchLoginStatus();
  }, []);

  // 네비게이션 메뉴 열림/닫힘 상태 토글
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // 로그아웃 버튼 클릭 시 로그아웃
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        setIsLogined(false);
        navigate("/");
      } else if (response.status === 500) {
        console.error("로그아웃 요청 실패:", response.statusText);
      } else {
        console.error("서버에서 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 에러 발생:", error);
    }
  };

  if (locationInfo.pathname === "/login" || locationInfo.pathname === "/signup")
    return null;

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo>
          <img src={logoImg} alt="logoImg" />
        </Logo>
      </Link>
      <UserMenu
        isLogined={isLogined}
        handleLogout={handleLogout}
        userId={userId}
        toggleNav={toggleNav}
      />
      <NavMenu open={isNavOpen} onClose={toggleNav} />
    </HeaderContainer>
  );
};

export default Header;
