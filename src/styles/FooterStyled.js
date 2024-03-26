import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 40px 50px;
  border-top: 2px solid #999999;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: #ccc;
  margin: 0 10px;
`;

export const ContactInfo = styled.div`
  margin-top: 20px;
  text-align: left;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MenuText = styled.span`
  color: #373a42;
  font-size: 18px;
`;

export const ContactText = styled.div`
  color: #999999;
  font-size: 16px;
  &:last-child {
    margin-top: 15px;
  }
`;

export const ScrollTopButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 55px;
`;

export const ScrollTopButtonImg = styled.img`
  width: 67%;
  height: auto;
`;

export const SelectBox = styled.select`
  border: 1px solid #999999;
  color: #373a42;
  padding: 5px 70px 5px 10px;
  margin-right: 18px;
  font-size: 16px;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 7.41L6.41 13 8 14.59 12 10.41 16 14.59 17.59 13 12 7.41z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 5px center;
  background-size: 20px 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  align-self: flex-end;

  &:focus {
    outline: none;
    border-width: 1px;
  }
`;
