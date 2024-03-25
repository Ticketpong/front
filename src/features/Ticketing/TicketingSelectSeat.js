import React, { useState } from "react";
import { PongButton } from "./TicketingPayment";
import SeatSelectionModal from "./SeatSelectionModal"; // 모달 컴포넌트 import

const TicketingSelectSeat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSeats = (seats) => {
    setSelectedSeats(seats);
  };

  return (
    <>
      <PongButton onClick={handleOpenModal}>좌석 선택</PongButton>
      <SeatSelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={handleSelectSeats}
      />
    </>
  );
};

export default TicketingSelectSeat;
