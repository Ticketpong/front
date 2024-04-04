import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Payment, { PongButton } from "./TicketingPayment";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const SeatRow = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
`;

const Seat = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#fc1055" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

const SelectedSeatsInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const HighlightText = styled.span`
  color: #ab003c;
`;

const Stage = styled.div`
  background-color: #ccc;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const SelectBox = styled.div`
  position: relative;
  width: 90%;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: ${(props) => (props.show ? "relative" : "absolute")};
  list-style: none;
  left: 0;
  width: 100%;
  overflow: hidden;
  margin: 3px auto;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  background-color: #fff;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #fc1055;
  }
`;

const SeatSelectionModal = ({ isOpen, onClose, onSelect, showData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState("결제방식");
  const [discountRate, setDiscountRate] = useState(0);
  const [selectedCardData, setSelectedCardData] = useState([]);

  const dcData = [
    { code: "361", card_name: "BC카드", discountrate: 5 },
    { code: "090", card_name: "카카오뱅크카드", discountrate: 3 },
  ];

  const handleShow = () => {
    setShowOptions((prev) => !prev);
  };

  const seatPrices = {
    VIP: 170000,
    R: 140000,
    S: 110000,
    A: 90000,
    B: 60000,
  };
  const seatTypes = ["VIP", "R", "S", "A", "B"];
  const seatsPerType = 10;

  const handleSelectSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert("최대 5개까지만 선택할 수 있습니다.");
      }
    }
  };
  const calculateTotalPrice = () => {
    let totalPrice =
      selectedSeats.length > 0
        ? seatPrices[selectedSeats[0].match(/[^\d]+/)[0]] * selectedSeats.length
        : 0;

    // 선택된 좌석의 총 금액에서 할인율을 적용
    totalPrice *= (100 - discountRate) / 100;

    return totalPrice;
  };

  const seatTypePrices = selectedSeats.reduce((acc, seat) => {
    const seatType = seat.match(/[^\d]+/)[0];
    acc[seatType] = (acc[seatType] || 0) + seatPrices[seatType];
    return acc;
  }, {});

  const seatPricesDisplay = Object.entries(seatTypePrices)
    .map(([type, price]) => `${type}석: ${price.toLocaleString()}원`)
    .join(", ");

  useEffect(() => {
    onSelect(selectedSeats);
  }, [selectedSeats]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSeats([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOnChangeSelectValue = (e) => {
    const selectedCardValue = e.target.getAttribute("value");
    setCurrentValue(selectedCardValue);

    const selectedCard = dcData.find(
      (card) => card.card_name === selectedCardValue
    );
    setSelectedCardData(selectedCard);
    if (selectedCard) {
      setDiscountRate(selectedCard.discountrate);
    } else {
      setDiscountRate(0); // 선택된 카드가 없을 경우 할인율을 0으로 설정합니다.
    }
    console.log(selectedCardData);
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Stage>STAGE</Stage>
        {seatTypes.map((type) => (
          <SeatRow key={type}>
            {Array.from(
              { length: seatsPerType },
              (_, i) => `${type}${i + 1}`
            ).map((seat) => (
              <Seat
                key={seat}
                selected={selectedSeats.includes(seat)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSeat(seat);
                }}
              >
                {seat}
              </Seat>
            ))}
          </SeatRow>
        ))}
        <SelectedSeatsInfo>
          선택한 좌석: <HighlightText>{selectedSeats.join(", ")}</HighlightText>{" "}
          인원: <HighlightText>{selectedSeats.length}명</HighlightText>
          <br />
          좌석별 금액: <HighlightText>{seatPricesDisplay}</HighlightText>
          <br />총 금액:{" "}
          <HighlightText>
            {calculateTotalPrice().toLocaleString()}원
          </HighlightText>
        </SelectedSeatsInfo>
        <SelectBox onClick={handleShow}>
          <Label>{currentValue}</Label>
          <SelectOptions show={showOptions}>
            <Option onClick={handleOnChangeSelectValue} value={"기본결제"}>
              기본 결제
            </Option>
            <Option onClick={handleOnChangeSelectValue} value={"BC카드"}>
              BC카드 결제 - 전체 금액 5% 할인 적용
            </Option>
            <Option
              onClick={handleOnChangeSelectValue}
              value={"카카오뱅크카드"}
            >
              카카오뱅크카드 결제 - 전체 금액 3% 할인 적용
            </Option>
          </SelectOptions>
        </SelectBox>

        <ButtonContainer>
          <PongButton onClick={onClose} className="paymentCancel">
            취소
          </PongButton>
          <Payment
            amount={calculateTotalPrice()}
            showData={showData}
            selectedSeat={selectedSeats.join(", ")}
            people={selectedSeats.length}
            cardData={selectedCardData}
          />
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SeatSelectionModal;
