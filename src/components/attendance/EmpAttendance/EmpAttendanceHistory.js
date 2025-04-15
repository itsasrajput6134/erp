import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import endpoints from "../../../ApiEndpoint";

const EmpAttendanceHistory = () => {
  const [attendance, setAttendance] = useState(null);
  const [allHoliday, setAllHoliday] = useState(null);
  const [allLeave, setAllLeave] = useState(null);

  useEffect(() => {
    fetchAttendance();
    fetchHoliday();
    fetchLeave();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `${endpoints.getAttendance}/${localStorage.getItem("username")}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAttendance(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
    }
  };

  const fetchHoliday = async () => {
    try {
      const response = await axios.get(`${endpoints.getAllHoliday}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAllHoliday(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
    }
  };

  const fetchLeave = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `${endpoints.getAllApprovedLeavesForHistory}?employeeEmail=${username}&status=APPROVED`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      setAllLeave(data);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
    }
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      // Check if the day is Saturday or Sunday
      const day = date.getDay();
      if (day === 0 || day === 6) {
        return "gray-background";
      }

      // Check for holidays
      const formattedDate = getFormattedDate(date);
      const holiday = allHoliday?.find(
        (holiday) => holiday.date === formattedDate
      );

      if (holiday) {
        return "holiday-blue"; // Blue background for holidays
      }
      // Check if the date is in leaveDates and mark it red
      if (allLeave) {
        const leaveRecord = allLeave.find((leave) =>
          leave.leaveDates.includes(formattedDate)
        );

        if (leaveRecord) {
          return "booked-red";
        }
      }
      // Ensure attendance is not null before accessing it
      if (attendance) {
        const attendanceRecord = attendance.find(
          (record) => record.dateString === formattedDate
        );

        if (attendanceRecord) {
          if (attendanceRecord.hours > 1 && attendanceRecord.hours <= 4) {
            return "booked-amber";
          } else if (
            attendanceRecord.hours > 4 &&
            attendanceRecord.hours <= 8
          ) {
            return "available-green";
          }
        }
      }

      return "freeze-date";
    }
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = getFormattedDate(date);
      const holiday = allHoliday?.find(
        (holiday) => holiday.date === formattedDate
      );

      if (holiday) {
        return <span className="tooltip-text">{holiday.name}</span>;
      }
      if (allLeave) {
        const leaveRecord = allLeave.find((leave) =>
          leave.leaveDates.includes(formattedDate)
        );
        if (leaveRecord) {
          return <span className="tooltip-text">LEAVE({leaveRecord.leaveType})</span>;
        }
      }
      if (attendance) {
        const attendanceRecord = attendance.find(
          (record) => record.dateString === formattedDate
        );

        if (attendanceRecord) {
          if (attendanceRecord.hours > 1 && attendanceRecord.hours <= 4) {
            return <span className="tooltip-text">Half Day</span>;;
          } else if (
            attendanceRecord.hours > 4 &&
            attendanceRecord.hours <= 8
          ) {
            return <span className="tooltip-text">Full Day</span>;
          }
        }
      }
    }
    return null;
  };

  return (
    <div>
      <section className="wrapper">
        <section>
          <div className="container text-center common-title fw-bold">
            <h2 className="common-heading text-white">Attendance History</h2>
            <hr className="w-50 mx-auto text-white" />
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="calendar-legend d-flex align-items-start flex-column justify-content-center mb-3 text-white">
                <div className="legend-item d-flex align-items-center justify-content-center">
                  <span className="legend-color booked-red me-1"></span>
                  <span>Leave</span>
                </div>
                <div className="legend-item d-flex align-items-center justify-content-center">
                  <span className="legend-color booked-amber me-1"></span>
                  <span>Half Day</span>
                </div>
                <div className="legend-item d-flex align-items-center justify-content-center">
                  <span className="legend-color available-green me-1"></span>
                  <span>Full Day</span>
                </div>
                <div className="legend-item d-flex align-items-center justify-content-center">
                  <span className="legend-color holiday-blue me-1"></span>
                  <span>Holiday</span>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="calendar-wrapper d-flex justify-content-center align-items-center">
                <Calendar
                  tileClassName={getTileClassName}
                  tileContent={getTileContent}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmpAttendanceHistory;
