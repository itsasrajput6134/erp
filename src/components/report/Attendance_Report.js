import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const Attendance_Report = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [duplicateEmployeeTravelList, setDuplicateEmployeeTravelList] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("Loading data...");

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // You might want to set default dates here or fetch all data without date range
        const response = await axios.get(
          endpoints.getAttendanceReportData, // Modify this if you need to fetch all data differently
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
          setNoDataMessage("No data available");
        }
      } catch (error) {
        console.log(error);
        setNoDataMessage(error.response?.data?.message || "Failed to load data");
      }
    };

    fetchInitialData();
  }, []);

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
      setNoDataMessage("Loading...");
      const response = await axios.get(
        `${endpoints.getAttendanceReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`,
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

  function handleFilter(status) {
    setSelectedStatus(status);
    if (status === "all") {
      setEmployeeTravelList(duplicateEmployeeTravelList);
    } else if (status === "present") {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.hours > 0
      );
      setEmployeeTravelList(filteredData);
    } else if (status === "leave") {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.hours == 0
      );
      setEmployeeTravelList(filteredData);
    }
  }

  const exportToExcel = () => {
    if (employeeTravelList.length === 0) {
      toast.error("No data to export");
      return;
    }
  
    // Convert data into a structured format for Excel
    const excelData = employeeTravelList.map(item => ({
      "Employee Email": item.employeeEmail || "N/A",
      "Date": item.dateString || "N/A",
      "Hours Worked": item.hours ?? "N/A",
    }));
  
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");
  
    // Generate file name dynamically
    const fileName = `Attendance_Report_${selectedDateStart || "All"}_to_${selectedDateEnd || "All"}.xlsx`;
  
    // Trigger download
    XLSX.writeFile(wb, fileName);
  };
  
  return (
    <div>
  <section className="wrapper p-3">
    <div className="row pl-5 pr-5">
      <div className="container mx-auto p-3 bg-gray-900 rounded-lg">
        {/* Filter and Search Section */}
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
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    handleFilter(e.target.value);
                  }}
                  value={selectedStatus}
                >
                  <option value="all">All</option>
                  <option value="present">Present</option>
                  <option value="leave">Absent</option>
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
                Attendance Report
              </div>
            </div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">EMPLOYEE EMAIL</th>
                    <th className="px-4 py-2 text-left">DATE</th>
                    <th className="px-4 py-2 text-left">HOURS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeTravelList.length > 0 ? (
                    employeeTravelList.map((item) => (
                      <tr key={`${item.employeeEmail}-${item.dateString}`} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.employeeEmail}</td>
                        <td className="px-4 py-2">{item.dateString}</td>
                        <td className="px-4 py-2">{item.hours}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
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
  </section>
</div>
  );
};

export default Attendance_Report;