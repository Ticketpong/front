import React, { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "../../../styles/HeaderStyled";
import { Link } from "react-router-dom";
import navUserIcon from "../../../assets/headerImg/nav_userIcon.png";
import navShowIcon from "../../../assets/headerImg/nav_showIcon.png";
import navCommIcon from "../../../assets/headerImg/nav_commIcon.png";

const NavMenuContainer = styled.nav`
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  background-color: #fc1055;
  width: 250px;
  height: 600px;
  ul {
    margin-top: 50px;
    margin-left: 25px;
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    height: 55px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    a {
      color: #ffffff;
    }
  }
  ${({ open }) =>
    open &&
    `
    display: block;
  `}
`;

const NavListItem = styled.li`
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6) {
    margin-left: 35px;
    height: 38px;
    line-height: 38px;
    a {
      font-weight: 500;
    }
    a:hover {
      font-weight: 700;
    }
  }
`;

const NavMenu = ({ open, isLogined, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".nav-menu-container") && open) {
        onClose(); // onClose 함수 호출
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  return (
    <NavMenuContainer className="nav-menu-container" open={open}>
      <ul>
        <NavListItem bold>
          <Icon src={navUserIcon} alt="navUserIcon" />
         {isLogined ? (
            <Link to="/mypage">회원서비스</Link>
          ) : (
            <Link to="/login">회원서비스</Link>
          )}
        </NavListItem>
        <NavListItem bold>
          <Icon src={navShowIcon} alt="navShowIcon" />
          <Link to="/viewall">공연 전시 예매</Link>
        </NavListItem>
        <NavListItem bold>
          <Icon src={navCommIcon} alt="navCommunityIcon" />
          <li>커뮤니티</li>
        </NavListItem>
        <NavListItem>
          <Link to="/community#notice">공지사항</Link>
        </NavListItem>
        <NavListItem>
          <Link to="/community#review">관람후기</Link>
        </NavListItem>
        <NavListItem>
          <Link to="/community#guide">이용안내</Link>
        </NavListItem>
        {/* <NavListItem>
          <Link to="/managepage?selectedItem=2">확인버튼</Link>
        </NavListItem> */}
      </ul>
    </NavMenuContainer>
  );
};

export default NavMenu;
