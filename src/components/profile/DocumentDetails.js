import axios from 'axios';
import React, { useState } from 'react';
import endpoints from '../../ApiEndpoint';
import toast from 'react-hot-toast';

const DocumentDetails = ({ profile, refreshProfile }) => {
  const [documents, setDocuments] = useState({
    adhar: null,
    pan: null,
    passport: null,
    cancelledCheque: null,
    degree: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in documents) {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${endpoints.updateProfile}${profile?.userId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Documents Updated Successfully!");
      if (refreshProfile) refreshProfile();
    } catch (error) {
      console.error("Error updating documents:", error);
      toast.error("Failed to update documents.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Document Details</h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aadhar Card */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Aadhar Card</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              className="p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              name="adhar"
              onChange={handleFileChange}
            />
            {/* <span className="text-gray-400 text-sm truncate w-full md:w-auto">
              {documents.adhar ? documents.adhar.name : "No file chosen"}
            </span> */}
          </div>
        </div>

        {/* PAN Card */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">PAN Card</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              className="p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              name="pan"
              onChange={handleFileChange}
            />
            {/* <span className="text-gray-400 text-sm truncate w-full md:w-auto">
              {documents.pan ? documents.pan.name : "No file chosen"}
            </span> */}
          </div>
        </div>

        {/* Passport */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Passport</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              className="p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              name="passport"
              onChange={handleFileChange}
            />
            {/* <span className="text-gray-400 text-sm truncate w-full md:w-auto">
              {documents.passport ? documents.passport.name : "No file chosen"}
            </span> */}
          </div>
        </div>

        {/* Cancelled Cheque */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Cancelled Cheque</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              className="p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              name="cancelledCheque"
              onChange={handleFileChange}
            />
            {/* <span className="text-gray-400 text-sm truncate w-full md:w-auto">
              {documents.cancelledCheque ? documents.cancelledCheque.name : "No file chosen"}
            </span> */}
          </div>
        </div>

        {/* Graduation Marksheet */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">Graduation Marksheet</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              className="p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
              name="degree"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-4 py-2 text-center transition-all"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default DocumentDetails;
