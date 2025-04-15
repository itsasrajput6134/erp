import React, { useState, useEffect } from "react";
import RightSelectModel from "./ApproverSelectModel";
import { endpoints } from "../../../ApiEndpoint";
import axios from "axios";
import toast from "react-hot-toast";

const RightCreationTable = ({
  handleRightButtonClick,
  modelData,
  isToggledRefreshTable,
  setIsToggledRefreshTable,
}) => {
  const [formData, setFormData] = useState();
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateformData, setUpdateFormData] = useState({});
  // Fetch user data from API on component mount

  const fetchAllPermissionOfRole = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(endpoints.getAllApproverFlow);

      const response = await axios.get(endpoints.getAllApproverFlow, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = await response.data;
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPermissionOfRole();
  }, [isToggledRefreshTable]);

  const handleRightButtonClickInternal = (data) => {
    console.log(data);
    handleRightButtonClick(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (data) => {
    console.log(data);
    setUpdateFormData({});
    setIsModalOpenUpdate(true);
    console.log(data);
    setUpdateFormData(data);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    console.log(data.name);
    try {
      const response = await axios.delete(
        `${endpoints.deleteApproverFlow}/${data.name}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        fetchAllPermissionOfRole();
        const successMessage = response.data.message || "Successfully deleted";
        toast.success(successMessage); // Ensure it's a string
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to delete";
      toast.error(errorMessage); // Handle error messages appropriately
    }
  };

  const handleSubmit = async (formData) => {
    console.log(formData);
    const updatedProcess = modelData;
    console.log(updatedProcess);

    try {
      const response = await axios.put(
        `${endpoints.updateApproverFlow}/${formData.name}`,
        updatedProcess,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data.message;
      console.log(data);
      toast.success(data || "Update successful");
      setIsToggledRefreshTable((prevState) => !prevState);
      setIsModalOpenUpdate(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
    <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
      <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
        <div className="panel-heading">Approver Flow Table</div>
        <table className="w-full text-sm text-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Process</th>
              <th className="px-4 py-2 text-left">Approver Flow</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {formData && formData.length > 0 ? (
              formData.map((process) => (
                <tr key={process.id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{process.name}</td>
                  <td className="px-4 py-2">
                    {process.hierarchy
                      .sort((a, b) => a.level - b.level) // Sort by level
                      .map((hierarchyItem) => hierarchyItem.roleName)
                      .join(" --> ")}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="d-flex justify-content-evenly w-75">
                      <button
                        onClick={() => handleUpdate(process)}
                        className="p-2 text-purple-400 hover:text-purple-300 transition"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(process)}
                        className="p-2 text-red-500 hover:text-red-400 transition"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  
    <div>
      {isModalOpenUpdate && (
        <>
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Content */}
            <div className="bg-gray-900 rounded-lg shadow-lg w-3/4 max-w-3xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className="text-center font-semibold text-gray-200">UPDATE APPROVER FLOW</h2>
                <button
                  className="text-gray-400 hover:text-gray-200 transition"
                  onClick={handlecloseUpdate}
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
  
              {/* Modal Body */}
              <div className="p-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {/* Process Name Input */}
                    <div className="mb-6">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Process Name
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="Enter Employee role"
                        value={updateformData.name}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>
  
                    {/* Buttons */}
                    <div className="flex justify-center space-x-4">
                      <button
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        onClick={() => handleSubmit(updateformData)}
                      >
                        Submit
                      </button>
                      <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={() => handleRightButtonClickInternal(updateformData)}
                      >
                        Right
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  
    <RightSelectModel />
    </div>
  );
};

export default RightCreationTable;