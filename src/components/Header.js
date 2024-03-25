import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/headerImg/logo.png";
import menuIcon from "../assets/headerImg/menuIcon.png";
import navUserIcon from "../assets/headerImg/nav_userIcon.png";
import navShowIcon from "../assets/headerImg/nav_showIcon.png";
import navCommIcon from "../assets/headerImg/nav_commIcon.png";
import {
  HeaderContainer,
  Logo,
  Icon,
  RightMenu,
  MenuButton,
  Nav,
  NavListItem,
} from "../styles/HeaderStyled";

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

  // 네비게이션 메뉴 영역 외부를 클릭했을 때
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // 로그아웃 버튼 클릭 시 로그아웃 (엔드포인트url 필요)
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("로그아웃 요청 실패:", response.statusText);
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
      <Nav open={isNavOpen} ref={navRef}>
        <ul>
          <NavListItem bold>
            <Icon src={navUserIcon} alt="navUserIcon" />
            {isLoggedIn ? (
              <Link to="/mypage">회원서비스</Link>
            ) : (
              <Link to="/login">회원서비스</Link>
            )}
          </NavListItem>
          <NavListItem bold>
            <Icon src={navShowIcon} alt="navShowIcon" />
            <Link to="/show_all">공연 전시 예매</Link>
          </NavListItem>
          <NavListItem bold>
            <Icon src={navCommIcon} alt="navCommunityIcon" />
            <li>커뮤니티</li>
          </NavListItem>
          <NavListItem>
            <Link to="/review">후기</Link>
          </NavListItem>
          <NavListItem>
            <Link to="/notice">공지사항</Link>
          </NavListItem>
          <NavListItem>
            <Link to="/guide">이용안내</Link>
          </NavListItem>
        </ul>
      </Nav>
      <RightMenu>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
              <li>{user_id} 님</li>
              <li>
                <Link to="/mypage">마이 페이지</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/login">마이페이지</Link>
              </li>
            </>
          )}
          <li>
            <MenuButton onClick={toggleNav}>
              <img src={menuIcon} alt="menuIcon" />
            </MenuButton>
          </li>
        </ul>
      </RightMenu>
    </HeaderContainer>
  );
};

export default Header;
