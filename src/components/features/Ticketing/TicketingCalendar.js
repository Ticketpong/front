import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TicketingCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Calendar = ({ onDataChange, data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateToday = new Date();
  const dateFrom = new Date(data.prfpdfrom);
  const dateTo = new Date(data.prfpdto);

  const getShowTime = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const selectDate = `${year}${month}${day}`;

    onDataChange(selectDate);
    return selectDate;
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        getShowTime(date);
      }}
      highlightDates={[dateFrom, dateTo]}
      inline
      minDate={dateFrom < dateToday ? dateToday : dateFrom}
      maxDate={dateTo}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="date-customheader">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <IoIosArrowDropleft />
          </button>
          <div className="custom-month">
            {date.getFullYear()}.{" "}
            {months[date.getMonth()].toString().padStart(2, "0")}
          </div>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <IoIosArrowDropright />
          </button>
        </div>
      )}
    />
  );
};

export default Calendar;
