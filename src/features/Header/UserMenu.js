import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../styles/HeaderStyled';
import { Link } from 'react-router-dom';
import HeaderUserIcon from '../../assets/headerImg/header_userIcon.png';
import menuIcon from '../../assets/headerImg/menuIcon.png';

const UserMenuContainer = styled.div`
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    justify-content: center;
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

const UserMenu = ({ isLoggedIn, handleLogout, user_id, toggleNav }) => {
  return (
    <UserMenuContainer>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
            <li>
              <Icon src={HeaderUserIcon} alt="HeaderUserIcon" />
              {user_id} 님
            </li>
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
    </UserMenuContainer>
  );
};

export default UserMenu;
