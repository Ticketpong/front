import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  text-align: center;
  max-width: 100%;
`;

// ======================================================================================================================
// 상단 부분
export const Upper = styled.div`
  margin-top: 220px;
`;

export const ShortHr = styled.hr`
  width: 50px;
  height: 1px;
  background-color: #ffffff;
  margin-top: 15px;
  border: 0;
`;
export const All = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: center;
  align-items: center;
  margin: 10px auto;
  color: #ffffff;
`;

export const UpperUL = styled.ul`
  display: inline-block;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  flex-wrap: wrap;
  min-width: 1600px;
  max-width: 1600px;
`;

export const UpperLI = styled.li`
  flex: 0 0 calc(20% - 20px);
  margin: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  min-width: 290px;
  max-width: 290px;
`;

export const UpperImage = styled.div`
  display: block;
  min-width: 270px;
  height: 360px;
  margin-bottom: 10px;
  object-fit: cover;
  img {
    max-height: 100%;
    min-width: 285px;
    border-radius: 12px;
  }
`;

export const UpperP = styled.p`
  margin: 0;
  font-size: ${(props) => (props.over ? "18px" : "inherit")};
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "310px" : "inherit")};
`;

export const UpperOver = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${(props) => (props.over ? "310px" : "inherit")};
  margin-bottom: 4px;
`;
export const CategoryContainer = styled.div`
  display: flex;
  margin-bottom: 55px;
  align-items: center;
  justify-content: center;
  margin-right: 22px;
`;
// 이미지 순위 처리
export const ImageContainer = styled.div`
  position: relative;
  min-width: 290px;
  max-width: 290px;
  max-width: 300px;
  max-height: 410px;
`;

export const Rank = styled.p`
  position: absolute;
  bottom: -50px;
  left: 10px;
  background-color: none;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  padding: 5px;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 54px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
`;

export const Button = styled.button`
  min-width: 120px;
  height: 50px;
  background-color: #373a42;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 100px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  line-height: 8px;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const GeographyButton = styled.button`
  min-width: 120px;
  height: 50px;
  background-color: #373a42;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 100px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  line-height: 8px;
  font-size: 24px;
  font-weight: bold;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const MoreButton = styled.button`
  min-width: 240px;
  height: 60px;
  background-color: #ffffff;
  color: #fc1055;
  border: 1px solid #fc1055;
  padding: 10px 20px;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 24px;
  font-size: 24px;

  &:focus {
    background-color: #fc1055;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
`;

// =============================================================================================================
// 하단 부분

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 1600px;
  max-width: 1600px;
  margin: 80px auto;
`;

export const StyledUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const StyledLI = styled.li`
  align-items: center;
  justify-content: center;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 80px;
  margin-left: 24px;
  margin-right: 24px;
  min-width: 350px;
  min-height: 350px;
`;

export const StyledImage = styled.div`
  display: block;
  min-width: 330px;
  max-width: 330px;
  height: 390px;
  margin-bottom: 10px;
  object-fit: cover;
  img {
    min-height: 100%;
    max-height: 100%;
    min-width: 100%;
    max-width: 100%;
    border-radius: 12px;
  }
`;

export const StyledP = styled.p`
  margin: 0;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  max-width: ${(props) => (props.over ? "350px" : "inherit")};
`;

export const StyledOver = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  max-width: ${(props) => (props.over ? "350px" : "inherit")};
`;
