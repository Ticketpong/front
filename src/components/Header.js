import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderContainer, Logo } from "../styles/HeaderStyled";
import logoImg from "../assets/headerImg/logo.png";
import NavMenu from "../features/Header/NavMenu";
import UserMenu from "../features/Header/UserMenu";

const Header = ({ isLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const [user_id, setUser_id] = useState("");
  const [isLoggedInState, setIsLoggedIn] = useState(isLoggedIn);
  const navigate = useNavigate();

  // user_id 가져오기 (엔드포인트url 필요)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/user_id", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser_id(data.user_id);
        } else {
          console.error("user_id 가져오기 실패:", response.statusText);
        }
      } catch (error) {
        console.error("user_id 가져오기 중 에러 발생:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  // 네비게이션 메뉴 열림/닫힘 상태 토글
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // 로그아웃 버튼 클릭 시 로그아웃 (엔드포인트url 필요)
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/");
      } else if (response.status === 400) {
        console.error("로그아웃 요청 실패:", response.statusText);
      } else {
        console.error("서버에서 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 에러 발생:", error);
    }
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo>
          <img src={logoImg} alt="logoImg" />
        </Logo>
      </Link>
      <UserMenu
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        user_id={user_id}
        toggleNav={toggleNav}
      />
      <NavMenu open={isNavOpen} onClose={toggleNav} ref={navRef} />
    </HeaderContainer>
  );
};

export default Header;
