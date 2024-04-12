import React from "react";
import { useLocation } from "react-router-dom";
import {
  FooterContainer,
  LeftSection,
  TextContainer,
  VerticalLine,
  ContactInfo,
  RightSection,
  ScrollTopButton,
  ScrollTopButtonImg,
  MenuText,
  ContactText,
  SelectBox,
} from "../../styles/FooterStyled";
import arrowIcon from "../../assets/footerImg/arrowIcon.png";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const locationInfo = useLocation();

  if (
    locationInfo.pathname === "/login" ||
    locationInfo.pathname === "/manage" ||
    locationInfo.pathname === "/signup" ||
    locationInfo.pathname === "/findid" ||
    locationInfo.pathname === "/findpw" ||
    locationInfo.pathname === "/confirmid"
  )
    return null;

  return (
    <FooterContainer>
      <LeftSection>
        <TextContainer>
          <MenuText>회사소개</MenuText>
          <VerticalLine />
          <MenuText>이용약관</MenuText>
          <VerticalLine />
          <MenuText>개인정보처리방침</MenuText>
          <VerticalLine />
          <MenuText>청소년보호정책</MenuText>
          <VerticalLine />
          <MenuText>이용안내</MenuText>
          <VerticalLine />
          <MenuText>티켓판매안내</MenuText>
        </TextContainer>
        <ContactInfo>
          <ContactText>고객센터 : 1544-1544 / FAX 02-2272-4679</ContactText>
          <ContactText>
            평일 09:00 ~ 18:00 / 점심시간 12:00 ~ 13:00 (주말/공휴일 휴무)
          </ContactText>
          <ContactText>
            서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) /
            사업자등록번호 123-45-678910
          </ContactText>
          <ContactText>COPYRIGHT (C) ALL RIGHTS RESERVED.</ContactText>
        </ContactInfo>
      </LeftSection>
      <RightSection>
        <ScrollTopButton onClick={handleScrollTop}>
          <ScrollTopButtonImg src={arrowIcon} alt="맨위로" />
        </ScrollTopButton>
        <SelectBox>
          <option value="default">FAMILY SITE</option>
          <option value="site1">multicampus</option>
          <option value="site2">multicampus_it</option>
        </SelectBox>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;
