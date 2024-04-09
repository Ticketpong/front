import React, { useEffect, useState } from "react";
import { PongButton } from "./TicketingPayment";
import SeatSelectionModal from "./SeatSelectionModal";
import axiosWithAuth from "../../base/axiosWithAuth";
import { useNavigate } from "react-router-dom";

const TicketingSelectSeat = (showData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axiosWithAuth().get(
          "http://localhost:8080/login/profile"
        );
        const { id, isLogined } = response.data;
        if (isLogined) {
          setUserId(id);
          setIsLogined(true);
        }
      } catch (error) {
        console.error("로그인 상태를 확인하는 동안 오류 발생:", error);
      }
    };

    fetchLoginStatus();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSeats = (seats) => {
    setSelectedSeats(seats);
  };

  const navigate = useNavigate();

  return (
    <>
      {isLogined ? (
        <>
          <PongButton onClick={handleOpenModal}>좌석 선택</PongButton>
          <SeatSelectionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelect={handleSelectSeats}
            showData={showData}
          />
        </>
      ) : (
        <PongButton onClick={() => navigate("/login")} className="payment">
          로그인
        </PongButton>
      )}
    </>
  );
};

export default TicketingSelectSeat;
