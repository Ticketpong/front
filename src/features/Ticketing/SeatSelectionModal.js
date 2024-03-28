import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Payment, { PongButton } from "./TicketingPayment";
import { dataDetail } from "../../pages/ticketing/Ticketing";

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

const SeatSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

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
    return selectedSeats.length > 0
      ? seatPrices[selectedSeats[0].match(/[^\d]+/)[0]] * selectedSeats.length
      : 0;
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
        <ButtonContainer>
          <PongButton onClick={onClose} className="paymentCancel">
            취소
          </PongButton>
          <Payment amount={calculateTotalPrice()} prfnm={dataDetail.prfnm} />
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SeatSelectionModal;
