import React from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import HeaderUserIcon from "../../../assets/headerImg/header_userIcon.png";
import menuIcon from "../../../assets/headerImg/menuIcon.png";

const UserMenuContainer = styled.div`
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    justify-content: center;
    ${({ isManagePage }) =>
      isManagePage &&
      css`
        margin-right: 50px;
      `}
  }
  li {
    height: 60px;
    line-height: 60px;
    color: #373a42;
    a {
      color: #373a42;
    }
  }
  li:not(:last-child) {
    margin-right: 30px;
    display: flex;
    align-items: center;
  }
  li:last-child {
    margin-left: 20px;
    margin-right: 0;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
  height: 100%;
  img {
    height: 100%;
    display: inline-block;
    width: 100%;
  }
`;

const LogoutText = styled.span`
  cursor: pointer;
`;

const StyledHeaderUserIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-top: 2px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserMenu = ({ isLogined, handleLogout, userId, toggleNav }) => {
  const locationInfo = useLocation();
  const isManagePage = locationInfo.pathname.toLowerCase() === "/managepage";

  return (
    <UserMenuContainer isManagePage={isManagePage}>
      <ul>
        {isLogined ? (
          <>
            <li>
              <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
            </li>
            <li>
              <UserInfoWrapper>
                <StyledHeaderUserIcon
                  src={HeaderUserIcon}
                  alt="HeaderUserIcon"
                />
                <span>{userId}</span> 님
              </UserInfoWrapper>
            </li>
            {locationInfo.pathname.toLowerCase() !== "/managepage" && (
              <li>
                <Link to="/mypage">마이 페이지</Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link to={locationInfo.pathname.toLowerCase() === "/managepage" ? "/manage" : "/login"}>로그인</Link>
            </li>
            {locationInfo.pathname.toLowerCase() !== "/managepage" && (
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            )}
            {locationInfo.pathname.toLowerCase() !== "/managepage" && (
              <li>
                <Link to="/login">마이페이지</Link>
              </li>
            )}
          </>
        )}
        {locationInfo.pathname.toLowerCase() !== "/managepage" && (
          <li>
            <MenuButton onClick={toggleNav}>
              <img src={menuIcon} alt="menuIcon" />
            </MenuButton>
          </li>
        )}
      </ul>
    </UserMenuContainer>
  );
};

export default UserMenu;
