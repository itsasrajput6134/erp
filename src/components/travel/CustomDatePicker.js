import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CustomDatePicker = ({ bookedDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getBackgroundColor = (date) => {
    console.log(date);
    // const formattedDate = date.toISOString().split("T")[0];
    const formattedDate = getFormattedDate(date);
    const bookingsForDate = bookedDates.filter((booked) => booked.date === formattedDate);
    
    if (bookingsForDate.length > 0) {
      const maxRoomNumber = bookingsForDate.reduce((max, booking) => Math.max(max, booking.roomNumber), 0);
      const totalRooms = bookingsForDate[0].totalRooms;
      
      if (maxRoomNumber >= totalRooms) {
        return "booked-red"; // Fully booked
      } else if (maxRoomNumber > 0) {
        return "booked-amber"; // Partially booked
      }
    }
    return "available-green"; // Available
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return getBackgroundColor(date);      
    }
  };

  return (
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      tileClassName={tileClassName}
      minDate={new Date()} 
    />
  );
};

export default CustomDatePicker;