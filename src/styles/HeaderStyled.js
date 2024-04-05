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
  cursor: pointer;
  img {
    width: 170px;
    height: 100%;
    padding-top: 0.5rem;
  }
`;

export const Icon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
  text-align: center;
`;
