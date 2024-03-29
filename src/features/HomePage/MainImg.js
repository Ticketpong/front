import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mainImg_01 from '../../assets/homeImg/mainImg_01.jpg';
import mainImg_02 from '../../assets/homeImg/mainImg_02.jpg';
import SearchBar from './../../components/SearchBar';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: #000;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`;

const MainImg = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [mainImg_01, mainImg_02];
  const fadeTime = 3000;

  useEffect(() => {
    document.body.style.margin = '0';
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, fadeTime);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Container>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Slide ${index}`}
          isActive={index === currentImage}
        />
      ))}
      <SearchBar/>
    </Container>
  );
};

export default MainImg;
