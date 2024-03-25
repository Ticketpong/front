import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  text-decoration: none;
  font-size: 18px;
  a {
    text-decoration: none;
    font-size: 18px;
  }
`;

export const Logo = styled.div`
  margin-left: 50px;
  img {
    width: 170px;
    height: 100%;
    padding-top: 0.5rem;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const RightMenu = styled.div`
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
  }
  li:last-child {
    margin-left: 20px;
    margin-right: 0;
  }
`;

export const MenuButton = styled.button`
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

export const Nav = styled.nav`
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

export const NavListItem = styled.li`
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
