import axios from "axios";
import React, { useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const User_Report = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
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

    try {
      setEmployeeTravelList([]);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getUserReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
    if (status === "all") {
      setEmployeeTravelList(duplicateEmployeeTravelList);
    } else if (status === "true") {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.active === true
      );
      setEmployeeTravelList(filteredData);
    } else if (status === "false") {
      const filteredData = duplicateEmployeeTravelList.filter(
        (item) => item.active === false
      );
      setEmployeeTravelList(filteredData);
    }
  }

  const exportToExcel = () => {
    if (employeeTravelList.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Prepare the data for Excel
    const excelData = employeeTravelList.map(item => ({
      "Employee ID": item.employeeId,
      "Name": `${item.firstName} ${item.lastName}`,
      "Email": item.email,
      "Personal Email": item.personalEmail,
      "Phone Number": item.phoneNo,
      "Date of Birth": item.dateOfBirth,
      "Designation": item.designation,
      "Status": item.active ? "Active" : "Inactive"
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "User Report");

    // Generate the Excel file and trigger download
    const fileName = `User_Report_${selectedDateStart}_to_${selectedDateEnd}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
<div>
  <section className="wrapper p-3 ">
    <div className="row pl-5 pr-5">
      <div className="container mx-auto p-3 bg-gray-900 rounded-lg">
        {/* Date Range and Search */}
      <div className="w-full">
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
       <div className="flex flex-col md:flex-row gap-4 items-end">
       <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div>
        <label htmlFor="status" className="block text-white mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleFilter(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
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
                User Report
              </div>
            </div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">E-Code</th>
                    <th className="px-4 py-2 text-left">Joining Date</th>
                    <th className="px-4 py-2 text-left">Designation</th>
                    <th className="px-4 py-2 text-left">Date of Birth</th>
                    <th className="px-4 py-2 text-left">Gender</th>
                    <th className="px-4 py-2 text-left">Martial Status</th>
                    <th className="px-4 py-2 text-left">Spouse Name</th>
                    <th className="px-4 py-2 text-left">Father's Name</th>
                    <th className="px-4 py-2 text-left">Contact Number</th>
                    <th className="px-4 py-2 text-left">Contact Number<br/>(Father's) </th>
                    <th className="px-4 py-2 text-left">Name & Contact<br/>(emergency)</th>
                    <th className="px-4 py-2 text-left">Local Address</th>
                    <th className="px-4 py-2 text-left">Permanent Address</th>
                    <th className="px-4 py-2 text-left">official Email</th>
                    <th className="px-4 py-2 text-left">Personal Email</th>
                    <th className="px-4 py-2 text-left">PAN Number</th>
                    <th className="px-4 py-2 text-left">Aadhar Number</th>
                    <th className="px-4 py-2 text-left">Bank Account</th>
                    <th className="px-4 py-2 text-left">IFSC Code</th>
                    <th className="px-4 py-2 text-left">Bank Account Type</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeTravelList.length > 0 ? (
                    employeeTravelList.map((item) => (
                      <tr key={item.employeeId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.employeeId}</td>
                        <td className="px-4 py-2">{`${item.firstName} ${item.lastName}`}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">{item.personalEmail}</td>
                        <td className="px-4 py-2">{item.phoneNo}</td>
                        <td className="px-4 py-2">{item.dateOfBirth}</td>
                        <td className="px-4 py-2">{item.designation}</td>
                        <td className="px-4 py-2">{item.aadharNumber}</td>
                        <td className="px-4 py-2">{item.panNumber}</td>
                        <td className="px-4 py-2">
                          {item.active === true ? "Active" : "Inactive"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
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
  </section>
</div>
  );
};

export default User_Report;