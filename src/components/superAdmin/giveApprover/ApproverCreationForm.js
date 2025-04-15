import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProcesssRdx } from "../../../store/actions/processActions.js";
import {endpoints} from "../../../ApiEndpoint.js";
import axios from "axios";
import toast from "react-hot-toast";

const RightCreationForm = ({
  handleRightButtonClickForm,
  flowData,
  setIsToggledRefreshTable
}) => {
  const dispatch = useDispatch();
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const { processs, processLoading, processError } = useSelector((state) => state.process);
  const [formData, setFormData] = useState({
    processName: "",
    approvalFlow: [],
  });
  useEffect(() => {
    dispatch(fetchProcesssRdx());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  

  const handleProcessClick = () => {
    setIsProcessOpen(true); // Open the modal
  };

  const handleProcessClose = () => {
    setIsProcessOpen(false); // Close the modal
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPacket = {
      processName: formData.processName,
      approvalFlow: flowData,
    };  
    console.log(finalPacket);

    try {
      const token = localStorage.getItem("token");      
      const response = await axios.post(`${endpoints.addApproverFlow}?processName=${finalPacket.processName}`, finalPacket.approvalFlow, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = await response;
      console.log(`${endpoints.addApproverFlow}?processName=${finalPacket.processName}`, finalPacket.approvalFlow);
      

      toast.success("Added successfully!");
      setIsToggledRefreshTable((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    
  };

  return (
    <section className="text-white" id="contact">
  <div className="container mx-auto px-4">
    {/* Flex container for heading and form */}
    <div className="flex flex-col md:flex-row justify-between items-start">
      {/* Left Side: Approver Flow Heading */}
      <div className="w-full md:w-1/2 pl-2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold">APPROVER FLOW</h2>
      </div>

      {/* Right Side: Process Dropdown and Buttons */}
      <div>
      {/* Button to open the Process section */}
      <button
      onClick={handleProcessClick} // Add this function to handle the click event
      className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
      >
      PROCESS FLOW
      </button>

    {/* Conditionally render the Process section */}
     {isProcessOpen && ( // Add a state `isProcessOpen` to manage visibility
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="w-full max-w-md mx-4">
        {/* Container with Winter Chill Background */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 relative">
          {/* Close button */}
          <button
            onClick={handleProcessClose} // Add this function to handle closing the modal
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          <div className="space-y-4">
            {/* Process Dropdown */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="processNameDropdown" className="text-gray-300 font-medium">
                Select Process
              </label>
                <select
                id="processNameDropdown"
                name="processName"
                onChange={handleChange}
                value={formData.processName}
                className="w-1/2 p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                <option value="" disabled className="bg-gray-800 text-gray-300">
                  Choose....
                </option>
                {processs.map((processName) => (
                  <option key={processName.id} value={processName.name} className="bg-gray-800 text-gray-300">
                    {processName.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify space-x-0 md:space-x-4 space-y-4 md:space-y-0">
              {/* Primary Button (Purple) */}
              <button
                onClick={handleSubmit}
                disabled={flowData.length === 0}
                className={`w-full md:w-auto px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 ${
                  flowData.length === 0 ? "opacity-50 cursor-not-allowed" : ""
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