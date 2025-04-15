import React, { useState } from "react";
import endpoints from "../../../ApiEndpoint";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EmpLeaveHistory = () => {
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [leaves, setLeaves] = useState(null);
  useEffect(() => {
    fetchLeaveData();
  }, []);
  async function fetchLeaveData() {
    try {
      const username = localStorage.getItem("username");
      console.log(`${endpoints.getAllLeavesForHistory}?employeeEmail=${username}`);
      
      const response = await axios.get(
        `${endpoints.getAllLeavesForHistory}?employeeEmail=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data);
      
      setLeaves(data);
      setLeaveLoading(false);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
      toast.error("Error while fetching History");
      setLeaveLoading(false);
    }
  }

  return (
    <div className="pt-20">
      {/* Emp Leave History Table */}
      <section className="mx-5 my-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
        <div class="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div class="panel panel-default">
            <div class="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">LEAVE HISTORY</div>
            <div class="table-responsive">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Leave Date</th>
                    <th className="px-4 py-2 text-left">Leave Type</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaveLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <div className="flex justify-center">
                          <span className="sr-only"> Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : leaves.length > 0 ? (
                    leaves.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">
                          {item.leaveDates.length > 0
                            ? item.leaveDates.join(", ")
                            : "No Date present"}
                        </td>
                        <td className="px-4 py-2">{item.leaveType}</td>
                        <td className="px-4 py-2">{item.approvalStatus}</td>
                        <td className="px-4 py-2">
                          <div className="d-flex">
                            <i
                              class="fa-solid fa-pen-to-square me-2"
                                // onClick={() => handleUpdate(item)}
                            ></i>
                            <i
                              class="fa-solid fa-trash"
                              //   onClick={() => handleDelete(item)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No Leave found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmpLeaveHistory;
