import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const Leave_Report = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [duplicateEmployeeTravelList, setDuplicateEmployeeTravelList] =
    useState([]);
  const [noDataMessage, setNoDataMessage] = useState(
    "Select Filter to see Data"
  );

  const handleSearch = async () => {
    if (!selectedDateStart || !selectedDateEnd) {
      console.log("Please fill in all fields.");
      toast.success("Please fill in all fields.");
      return;
    }

    if (new Date(selectedDateEnd) < new Date(selectedDateStart)) {
      console.log("End date cannot be earlier than start date.");
      toast.success("End date cannot be earlier than start date.");
      return;
    }

    console.log(selectedStatus, selectedDateEnd, selectedDateStart);
    console.log(
      `${endpoints.getLeaveReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`
    );

    try {
      setEmployeeTravelList([]);
      const response = await axios.get(
        `${endpoints.getLeaveReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data);

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
      setNoDataMessage(error.response.data.message);
    }
  };

  function handleFilter(status) {
    console.log(status);
    console.log(duplicateEmployeeTravelList);
    if (status === "ALL") {
      setEmployeeTravelList(duplicateEmployeeTravelList);
    } else {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.status === status
      );
      setEmployeeTravelList(filteredData);
    }
    console.log(employeeTravelList);
  }

  const exportToExcel = () => {
    if (employeeTravelList.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Prepare the data for Excel
    const excelData = employeeTravelList.map(item => ({
      "Employee Email": item.employeeEmail,
      "Approver": item.approver,
      "Leave Type": item.leaveType,
      "Amount": item.amount,
      "Status": item.status,
      "Description": item.description,
      "Leave Dates": item.leaveDates && item.leaveDates.length > 0 
        ? item.leaveDates.join(", ") 
        : "No dates"
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Leave Report");

    // Generate the Excel file and trigger download
    const fileName = `Leave_Report_${selectedDateStart}_to_${selectedDateEnd}.xlsx`;
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
                      <option value="" disabled selected>
                        Select Status
                      </option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="PENDING">Pending</option>
                      <option value="ALL">All</option>
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
                    Leave Report
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="w-full text-lg text-gray-300">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Employee Email</th>
                        <th className="px-4 py-2 text-left">Approver</th>
                        <th className="px-4 py-2 text-left">Leave Type</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Leave Dates</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {employeeTravelList.length > 0 ? (
                        employeeTravelList.map((item) => (
                          <tr key={item.employeeEmail} className="hover:bg-gray-800 transition">
                            <td className="px-4 py-2">{item.employeeEmail}</td>
                            <td className="px-4 py-2">{item.approver}</td>
                            <td className="px-4 py-2">{item.leaveType}</td>
                            <td className="px-4 py-2">{item.amount}</td>
                            <td className="px-4 py-2">{item.status}</td>
                            <td className="px-4 py-2">{item.description}</td>
                            <td className="px-4 py-2">
                              {item.leaveDates && item.leaveDates.length > 0
                                ? item.leaveDates.join(", ")
                                : "No dates"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
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
  );
};

export default Leave_Report;