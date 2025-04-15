import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import endpoints from "../../ApiEndpoint";

const AccountDetails = ({ profile, refreshProfile }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        accountNumber: "",
        ifscNumber: "",
        bankName: "",
        bankBranchName: "",
        accountType: "",
        pfNumber: "",
        nomineeName: "",
        relationWithNominee: "",
        numnerOfFamilyMembers: "",
        uanNumber: "",
        esiNumber: "",
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                userId: profile?.userId || "",
                accountNumber: profile.accountNumber || "",
                ifscNumber: profile.ifscNumber || "",
                bankName: profile.bankName || "",
                bankBranchName: profile.bankBranchName || "",
                accountType: profile.accountType || "",
                pfNumber: profile.pfNumber || "",
                nomineeName: profile.nomineeName || "",
                relationWithNominee: profile.relationWithNominee || "",
                numnerOfFamilyMembers: profile.numnerOfFamilyMembers || "",
                uanNumber: profile.uanNumber || "",
                esiNumber: profile.esiNumber || "",
            });
        }
    }, [profile]);

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const formDataAccounts = new FormData();
            formDataAccounts.append("user", JSON.stringify(formData));
            const response = await axios.put(
                `${endpoints.updateProfile}${formData.userId}`,
                formDataAccounts,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            toast.success("Account Details Updated Successfully!");
            setIsEditable(false);
            if (refreshProfile) {
                refreshProfile();
            }
        } catch (error) {
            console.error("Error updating account details:", error);
            toast.error("Failed to update account details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 center">Account Details</h2>

            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Account Number</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.accountNumber || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">IFSC Code</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="ifscNumber"
                            value={formData.ifscNumber}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.ifscNumber || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Bank Name</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.bankName || " - "}
                        </div>
                    )}
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Branch Name</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="bankBranchName"
                            value={formData.bankBranchName}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.bankBranchName || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Account Type</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.accountType || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">UAN Number</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="uanNumber"
                            value={formData.uanNumber}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.uanNumber || " - "}
                        </div>
                    )}
                </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">PF Number</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="pfNumber"
                            value={formData.pfNumber}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.pfNumber || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Nominee Name</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.nomineeName || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Relation with Nominee</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="relationWithNominee"
                            value={formData.relationWithNominee}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.relationWithNominee || " - "}
                        </div>
                    )}
                </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Number of Family Members</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="numnerOfFamilyMembers"
                            value={formData.numnerOfFamilyMembers}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.numnerOfFamilyMembers || " - "}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">ESI Number</label>
                    {isEditable ? (
                        <input
                            type="text"
                            className="mt-1 p-2 w-full rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                            name="esiNumber"
                            value={formData.esiNumber}
                            onChange={handleChange}
                        />
                    ) : (
                        <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                            {formData.esiNumber || " - "}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
                {isEditable ? (
                    <button
                        className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-all"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default AccountDetails;