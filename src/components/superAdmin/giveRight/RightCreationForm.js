import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRolesRdx } from "../../../store/actions/roleActions.js";
import {endpoints} from "../../../ApiEndpoint.js";
import axios from "axios";
import toast from "react-hot-toast";

const RightCreationForm = ({
  handleRightButtonClickForm,
  pagesData,
  handleToggleRefreshTable,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { roles, roleLoading, roleError } = useSelector((state) => state.role);
  const [formData, setFormData] = useState({
    role: "",
    pages: [],
  });
  useEffect(() => {
    dispatch(fetchRolesRdx());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleClick = () => {
    setIsOpen(true); // Open the div
  };

  const handleClose = () => {
    setIsOpen(false); // Close the div
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pages = [], role } = formData;
    const updatedPages = pagesData;
    const requestBody = {
        pages: updatedPages,
        role: role
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(endpoints.addPermissionByRole, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = await response.data;
      toast.success("Added successfully!");
    } catch (error) {
      toast.error("Failed to submit");
    }

  };

  return (
  <section className="common-section text-white" id="contact">
  <div className="container mx-auto px-4">
    {/* Flex container for heading and form */}
    <div className="flex flex-col md:flex-row justify-between items-start">
      {/* Left Side: User Creation Heading */}
      <div className="w-full md:w-1/2 pl-2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold">USER PERMISSION</h2>
      </div>

      {/* Right Side: Employee Role Dropdown and Buttons */}
      <div>
      {/* Button to open the Role section */}
      <button
      onClick={handleRoleClick}
      className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
      >
      ADD ROLE
      </button>

  {/* Conditionally render the Role section */}
     {isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="w-full max-w-md mx-4"> {/* Adjusted width and margin for responsiveness */}
        {/* Container with Winter Chill Background */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          <div className="space-y-4">
            {/* Employee Role Dropdown */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="roleDropdown" className="text-gray-300 font-medium">
                ROLE
              </label>
              <select
                id="roleDropdown"
                name="role"
                onChange={handleChange}
                value={formData.role}
                className="w-1/2 p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="" disabled className="bg-gray-800 text-gray-300">
                  Choose....
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name} className="bg-gray-800 text-gray-300">
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify space-x-0 md:space-x-4 space-y-4 md:space-y-0">
              {/* Primary Button (Purple) */}
              <button
                onClick={handleSubmit}
                disabled={pagesData.length === 0}
                className={`w-full md:w-auto px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 ${
                  pagesData.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Submit
              </button>

              {/* Secondary Button (Red) */}
              <button
                onClick={handleRightButtonClickForm}
                className="w-full md:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Right
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}
      </div>
    </div>
  </div>
    </section>
  );
};

export default RightCreationForm;
