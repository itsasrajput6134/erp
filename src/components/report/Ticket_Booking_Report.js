import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const Ticket_Booking_Report = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [duplicateEmployeeTravelList, setDuplicateEmployeeTravelList] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("Select Filter to see Data");

  const handleSearch = async () => {
    if (!selectedDateStart || !selectedDateEnd) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(selectedDateEnd) < new Date(selectedDateStart)) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }

    try {
      setEmployeeTravelList([]);
      setNoDataMessage("Loading...");
      const response = await axios.get(
        `${endpoints.getTicketReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;

      if (data.length > 0) {
        setEmployeeTravelList(data);
        setDuplicateEmployeeTravelList(data);
        setNoDataMessage("");
      } else {
        setEmployeeTravelList([]);
        setNoDataMessage("Data not found for selected filter");
      }
    } catch (error) {
      console.log(error);
      setEmployeeTravelList([]);
      setNoDataMessage(error.response?.data?.message || "Error fetching data");
    }
  };

  const handleFilter = (status) => {
    setSelectedStatus(status);
    if (status === "ALL") {
      setEmployeeTravelList(duplicateEmployeeTravelList);
    } else {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.cancelled === (status === "TRUE")
      );
      setEmployeeTravelList(filteredData);
    }
  };

  const exportToExcel = () => {
    if (employeeTravelList.length === 0) {
      toast.error("No data to export");
      return;
    }

    const excelData = employeeTravelList.map(item => ({
      "Travel ID": item.travelGenId,
      "Travel Mode": item.travelMode,
      "Booking Date": item.bookingDate,
      "Travel Date": item.travelDate,
      "Departure Location": item.departureLocation,
      "Arrival Location": item.arrivalLocation,
      "Passenger Name": item.passengerName,
      "Seat Number": item.seatNumber,
      "Ticket Price": item.ticketPrice,
      "Cancellation Price": item.cancellationPrice,
      "Cancelled": item.cancelled ? "Yes" : "No"
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Ticket Report");
    const fileName = `Ticket_Report_${selectedDateStart}_to_${selectedDateEnd}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <section className="wrapper p-3">
      <div className="row pl-5 pr-5">
      <div className="container mx-auto p-3 bg-gray-900 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
    
      <div className="w-full">
        {/* Date Range and Search */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* From Date */}
              <div>
                <label htmlFor="start" className="block text-white mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDateStart}
                  onChange={(e) => setSelectedDateStart(e.target.value)}
                  placeholder="Select Date start"
                />
              </div>
              
              {/* To Date */}
              <div>
                <label htmlFor="end" className="block text-white mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDateEnd}
                  onChange={(e) => setSelectedDateEnd(e.target.value)}
                  placeholder="Select Date end"
                  min={selectedDateStart}
                />
              </div>
              
              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-white mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleFilter(e.target.value)}
                  value={selectedStatus}
                >
                  <option value="ALL">All</option>
                  <option value="TRUE">Cancelled</option>
                  <option value="FALSE">Not Cancelled</option>
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={exportToExcel}
                disabled={employeeTravelList.length === 0}
              >
                <i className="fa fa-download mr-2"></i> Download
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
          <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="w-full text-center font-semibold text-black bg-white p-4">
                Ticket Booking Report
              </div>
            </div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Travel ID</th>
                    <th className="px-4 py-2 text-left">Travel Mode</th>
                    <th className="px-4 py-2 text-left">Booking Date</th>
                    <th className="px-4 py-2 text-left">Travel Date</th>
                    <th className="px-4 py-2 text-left">Departure Location</th>
                    <th className="px-4 py-2 text-left">Arrival Location</th>
                    <th className="px-4 py-2 text-left">Passenger Name</th>
                    <th className="px-4 py-2 text-left">Seat Number</th>
                    <th className="px-4 py-2 text-left">Ticket Price</th>
                    <th className="px-4 py-2 text-left">Cancellation Price</th>
                    <th className="px-4 py-2 text-left">Cancelled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeTravelList.length > 0 ? (
                    employeeTravelList.map((item) => (
                      <tr key={item.travelGenId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.travelGenId}</td>
                        <td className="px-4 py-2">{item.travelMode}</td>
                        <td className="px-4 py-2">{item.bookingDate}</td>
                        <td className="px-4 py-2">{item.travelDate}</td>
                        <td className="px-4 py-2">{item.departureLocation}</td>
                        <td className="px-4 py-2">{item.arrivalLocation}</td>
                        <td className="px-4 py-2">{item.passengerName}</td>
                        <td className="px-4 py-2">{item.seatNumber}</td>
                        <td className="px-4 py-2">{item.ticketPrice}</td>
                        <td className="px-4 py-2">{item.cancellationPrice}</td>
                        <td className="px-4 py-2">{item.cancelled ? "Yes" : "No"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center py-4">
                        {noDataMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>
      </div>
     </div>
    </div>
      </section>
    </div>
  )
};

export default Ticket_Booking_Report;