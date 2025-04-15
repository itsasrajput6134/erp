import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

const Expense_Report = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [expenseList, setExpenseList] = useState([]);
  const [duplicateExpenseList, setDuplicateExpenseList] = useState([]);
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
      setNoDataMessage("Loading...");
      const response = await axios.get(
        `${endpoints.getExpenseReportData}?startDate=${selectedDateStart}&endDate=${selectedDateEnd}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;

      if (data.length > 0) {
        setExpenseList(data);
        setDuplicateExpenseList(data);
        setNoDataMessage("");
      } else {
        setExpenseList([]);
        setNoDataMessage("Data not found for selected filter");
      }
    } catch (error) {
      console.log(error);
      setExpenseList([]);
      setNoDataMessage(error.response?.data?.message || "Error fetching data");
    }
  };

  function handleFilter(status) {
    setSelectedStatus(status);
    if (status === "ALL") {
      setExpenseList(duplicateExpenseList);
    } else {
      const filteredData = duplicateExpenseList.filter(
        (item) => item.expenseClaimStatus === status
      );
      setExpenseList(filteredData);
    }
  }

  const downloadExcel = () => {
    // Implement Excel download functionality
    if (expenseList.length === 0) {
      toast.error("No data to download");
      return;
    }
    
    // This is a placeholder - implement actual Excel export logic here
    console.log("Downloading expense data:", expenseList);
    toast.success("Preparing download...");
    
    // Example implementation might use a library like xlsx or exceljs
    // import * as XLSX from 'xlsx';
    // const ws = XLSX.utils.json_to_sheet(expenseList);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "ExpenseReport");
    // XLSX.writeFile(wb, "ExpenseReport.xlsx");
  };

  return (
    <div>
  <section className="wrapper p-3">
    <div className="row pl-5 pr-5">
      <div className="container mx-auto p-3 bg-gray-900 rounded-lg">
        {/* Filter Section */}
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
                  <option value="APPROVED">Approved</option>
                  <option value="DENIED">Denied</option>
                  <option value="PENDING">Pending</option>
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
                onClick={downloadExcel}
                disabled={expenseList.length === 0}
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
                Expense Report
              </div>
            </div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Approver Email</th>
                    <th className="px-4 py-2 text-left">Claim Date</th>
                    <th className="px-4 py-2 text-left">Employee Email</th>
                    <th className="px-4 py-2 text-left">Expense Claim ID</th>
                    <th className="px-4 py-2 text-left">Total Amount</th>
                    <th className="px-4 py-2 text-left">Claim Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {expenseList.length > 0 ? (
                    expenseList.map((item) => (
                      <tr key={item.expenseClaimGenId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.approverEmail}</td>
                        <td className="px-4 py-2">
                          {new Date(item.claimDate)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")}
                        </td>
                        <td className="px-4 py-2">{item.employeeEmail}</td>
                        <td className="px-4 py-2">{item.expenseClaimGenId}</td>
                        <td className="px-4 py-2">{item.totalAmount}</td>
                        <td className="px-4 py-2">{item.expenseClaimStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
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

export default Expense_Report;