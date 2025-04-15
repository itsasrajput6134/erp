// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import endpoints from "../../ApiEndpoint";

// // const PersonalDetails = ({ profile, refreshProfile }) => {
// //     const [isEditable, setIsEditable] = useState(false);
// //     const [isSubmitting, setIsSubmitting] = useState(false);

// //     const [personalDetails, setPersonalDetails] = useState({
// //         userId: profile?.userId || "",
// //         fatherName: profile?.fatherName || "",
// //         phoneNo: profile?.phoneNo || "",
// //         currentAddress: profile?.currentAddress || "",
// //         permanentAddress: profile?.permanentAddress || "",
// //         personalEmail: profile?.personalEmail || "",
// //         motherName: profile?.motherName || "",
// //         fatherPhoneNo: profile?.fatherPhoneNo || "",
// //         motherPhoneNo: profile?.motherPhoneNo || "",
// //         maritalStatus: profile?.maritalStatus || "",
// //         spouseName: profile?.spouseName || "",
// //         spousePhoneNo: profile?.spousePhoneNo || "",
// //         passportNumber: profile?.passportNumber || "",
// //         aadharNumber: profile?.aadharNumber || "",
// //         panNumber: profile?.panNumber || "",
// //         bloodGroup: profile?.bloodGroup || "",
// //     });

// //     const [maritalStatus, setMaritalStatus] = useState(personalDetails.maritalStatus === "true");

// //     const [errors, setErrors] = useState({});

// //     useEffect(() => {
// //         if (profile) {
// //             setPersonalDetails({
// //                 userId: profile?.userId || "",
// //                 fatherName: profile?.fatherName || "",
// //                 phoneNo: profile?.phoneNo || "",
// //                 currentAddress: profile?.currentAddress || "",
// //                 permanentAddress: profile?.permanentAddress || "",
// //                 personalEmail: profile?.personalEmail || "",
// //                 maritalStatus: profile?.maritalStatus || "",
// //                 spouseName: profile?.spouseName || "",
// //                 spousePhoneNo: profile?.spousePhoneNo || "",
// //                 passportNumber: profile?.passportNumber || "",
// //                 aadharNumber: profile?.aadharNumber || "",
// //                 panNumber: profile?.panNumber || "",
// //                 bloodGroup: profile?.bloodGroup || "",
// //                 motherName: profile?.motherName || "",
// //                 motherPhoneNo: profile?.motherPhoneNo || "",
// //                 fatherPhoneNo: profile?.fatherPhoneNo || "",
// //             });
// //             setMaritalStatus(profile.maritalStatus === "true");
// //         }
// //     }, [profile]);

// //     const validateEmail = (email) => {
// //         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         return regex.test(email);
// //     };

// //     const validatePhoneNumber = (phone) => {
// //         const regex = /^\d{10}$/;
// //         return regex.test(phone);
// //     };

// //     const validateAadharNumber = (aadhar) => {
// //         const regex = /^\d{12}$/;
// //         return regex.test(aadhar);
// //     };

// //     const validatePANNumber = (pan) => {
// //         const regex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
// //         return regex.test(pan);
// //     };

// //     const handleEdit = () => {
// //         setIsEditable(true);
// //     };

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setPersonalDetails((prevState) => ({
// //             ...prevState,
// //             [name]: value,
// //         }));

// //         // Validate fields on change
// //         if (name === "personalEmail" && !validateEmail(value)) {
// //             setErrors((prev) => ({ ...prev, personalEmail: "Invalid email address" }));
// //         } else if (name === "phoneNo" && !validatePhoneNumber(value)) {
// //             setErrors((prev) => ({ ...prev, phoneNo: "Phone number must be 10 digits" }));
// //         } else if (name === "fatherPhoneNo" && !validatePhoneNumber(value)) {
// //             setErrors((prev) => ({ ...prev, fatherPhoneNo: "Phone number must be 10 digits" }));
// //         } else if (name === "motherPhoneNo" && !validatePhoneNumber(value)) {
// //             setErrors((prev) => ({ ...prev, motherPhoneNo: "Phone number must be 10 digits" }));
// //         } else if (name === "aadharNumber" && !validateAadharNumber(value)) {
// //             setErrors((prev) => ({ ...prev, aadharNumber: "Aadhar number must be 12 digits" }));
// //         } else if (name === "panNumber" && !validatePANNumber(value)) {
// //             setErrors((prev) => ({ ...prev, panNumber: "Invalid PAN number" }));
// //         } else {
// //             setErrors((prev) => ({ ...prev, [name]: "" }));
// //         }
// //     };

// //     const handleMaritalStatusChange = (e) => {
// //         const isMarried = e.target.value === "true"; // Convert to boolean
// //         setMaritalStatus(isMarried);

// //         // Update state
// //         handleInputChange({ target: { name: "maritalStatus", value: isMarried } });

// //         // Reset spouse fields if Single
// //         if (!isMarried) {
// //             handleInputChange({ target: { name: "spouseName", value: "-" } });
// //             handleInputChange({ target: { name: "spousePhoneNo", value: "-" } });
// //         }
// //     };

// //     const handleSubmit = async () => {
// //         // Check for errors before submitting
// //         const hasErrors = Object.values(errors).some((error) => error !== "");
// //         if (hasErrors) {
// //             toast.error("Please fix the errors before submitting.");
// //             return;
// //         }

// //         try {
// //             const token = localStorage.getItem("token");
// //             const formData = new FormData();
// //             formData.append("user", JSON.stringify(personalDetails));
// //             const response = await axios.put(
// //                 `${endpoints.updateProfile}${personalDetails.userId}`,
// //                 formData,
// //                 {
// //                     headers: {
// //                         Authorization: token,
// //                         "Content-Type": "multipart/form-data",
// //                     },
// //                     withCredentials: true,
// //                 }
// //             );
// //             toast.success("Personal Details Updated Successfully!");
// //             setIsEditable(false);
// //             if (refreshProfile) {
// //                 refreshProfile();
// //             }
// //         } catch (error) {
// //             toast.error("Failed to update personal details.");
// //         }
// //     };

// //     const handleChangePassword = async () => {
// //         try {
// //             const token = localStorage.getItem("token");
// //             const email = localStorage.getItem("username");
// //             setIsSubmitting(true);
// //             const response = await axios.post(
// //                 `${endpoints.changePassword}?userEmail=${email}`,
// //                 { email },
// //                 {
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                         Authorization: token,
// //                     },
// //                     withCredentials: true,
// //                 }
// //             );
// //             toast.success(response.data || "Check your email for the reset link!");
// //         } catch (error) {
// //             toast.error(error.response?.data?.message || "Failed to send reset link!");
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     if (!profile) {
// //         return <div className="text-center text-gray-400">Loading...</div>;
// //     }

// //     return (
// //         <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
// //             <h2 className="text-2xl font-bold text-purple-400 mb-6">MY DETAILS</h2>

// //             {/* First Row */}
// //             <div className="w-1/2 mx-0">
// //             <div className="grid grid-cols-1 w-full mx-auto gap-4 mb-4">
// //               <div className="flex items-center gap-4 w-2/3">
// //               <label className="text-sm font-medium text-purple-300 w-32">First Name</label>
// //               <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //               {profile.firstName || ""}
// //             </div>
// //             </div>
// //             <div className="flex items-center gap-4 w-2/3">
// //             <label className="text-sm font-medium text-purple-300 w-32">Last Name</label>
// //             <div className="p-1  text-gray-200 rounded-lg shadow-sm flex-1">
// //             {profile.lastName || ""}
// //          </div>
// //         </div>
// //            <div className="flex items-center gap-4 w-2/3">
// //            <label className="text-sm font-medium text-purple-300 w-32">Date of Birth</label>
// //            <div className="p-1  text-gray-200 rounded-lg shadow-sm flex-1">
// //            {profile.dateOfBirth || ""}
// //            </div>
// //         </div>
// //         </div>



// //             {/* Second Row */}
            
// //             <div className="grid grid-cols-1 w-full mx-auto gap-4 mb-4">
// //             <div className="flex items-center gap-4 w-2/3">
// //              <label className="text-sm font-medium text-purple-300 w-32">Personal Email</label>
// //               {isEditable ? (
// //               <div className="flex-1 w-2/3">
// //               <input
// //               type="text"
// //               className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //               name="personalEmail"
// //               value={personalDetails.personalEmail}
// //               onChange={handleInputChange}
// //             />
// //             {errors.personalEmail && <p className="text-red-400 text-sm mt-1">{errors.personalEmail}</p>}
// //             </div>
// //           ) : (
// //             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //             {profile.personalEmail}
// //              </div>
// //              )}
// //             </div>

// //             <div className="flex items-center gap-4 w-2/3">
// //              <label className="text-sm font-medium text-purple-300 w-32 ">Phone Number</label>
// //                {isEditable ? (
// //                <div className="flex-1 w-2/3">
// //                <input
// //                type="text"
// //                className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                name="phoneNo"
// //                value={personalDetails.phoneNo}
// //                onChange={handleInputChange}
// //             />
// //              {errors.phoneNo && <p className="text-red-400 text-sm mt-1">{errors.phoneNo}</p>}
// //             </div>
// //             ) : (
// //              <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //              {profile.phoneNo}
// //              </div>
// //              )}
// //             </div>


// //        <div className="flex items-center gap-4 w-2/3">
// //        <label className="text-sm font-medium text-purple-300 w-32">Current Address</label>
// //        {isEditable ? (
// //     <input
// //       type="text"
// //       className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //       name="currentAddress"
// //       value={personalDetails.currentAddress}
// //       onChange={handleInputChange}
// //     />
// //        ) : (
// //        <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //        {profile.currentAddress}
// //        </div>
// //        )}
// //        </div>

// //                 {/* <div>
// //                     <label className="block text-sm font-medium text-purple-300">Father's Name</label>
// //                     {isEditable ? (
// //                         <input
// //                             type="text"
// //                             className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                             name="fatherName"
// //                             value={personalDetails.fatherName}
// //                             onChange={handleInputChange}
// //                         />
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.fatherName}</div>
// //                     )}
// //                 </div> */}
// //             </div>

// //             {/* Third Row */}
// //             {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// //                 <div>
// //                     <label className="block text-sm font-medium text-purple-300">Father's Phone No</label>
// //                     {isEditable ? (
// //                         <>
// //                             <input
// //                                 type="text"
// //                                 className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                                 name="fatherPhoneNo"
// //                                 value={personalDetails.fatherPhoneNo}
// //                                 onChange={handleInputChange}
// //                             />
// //                             {errors.fatherPhoneNo && (
// //                                 <p className="text-red-400 text-sm mt-1">{errors.fatherPhoneNo}</p>
// //                             )}
// //                         </>
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.fatherPhoneNo}</div>
// //                     )}
// //                 </div>
// //                 <div>
// //                     <label className="block text-sm font-medium text-purple-300">Mother's Name</label>
// //                     {isEditable ? (
// //                         <input
// //                             type="text"
// //                             className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                             name="motherName"
// //                             value={personalDetails.motherName}
// //                             onChange={handleInputChange}
// //                         />
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.motherName}</div>
// //                     )}
// //                 </div>
// //                 <div>
// //                     <label className="block text-sm font-medium text-purple-300">Mother's Phone No</label>
// //                     {isEditable ? (
// //                         <>
// //                             <input
// //                                 type="text"
// //                                 className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                                 name="motherPhoneNo"
// //                                 value={personalDetails.motherPhoneNo}
// //                                 onChange={handleInputChange}
// //                             />
// //                             {errors.motherPhoneNo && (
// //                                 <p className="text-red-400 text-sm mt-1">{errors.motherPhoneNo}</p>
// //                             )}
// //                         </>
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.motherPhoneNo}</div>
// //                     )}
// //                 </div>
// //             </div> */}

// //             {/* Fourth Row */}
// //      <div className="grid grid-cols-1 w-full mx-auto gap-4 mb-4 ">
// //   {/* Marital Status */}
// //     <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">Marital Status</label>
// //     {isEditable ? (
// //       <select
// //         className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //         name="maritalStatus"
// //         value={maritalStatus ? "true" : "false"} // Convert boolean to string
// //         onChange={handleMaritalStatusChange}
// //       >
// //         <option value="" disabled className="text-gray-400">Select Marital Status</option>
// //         <option value="true" className="text-gray-200">Married</option>
// //         <option value="false" className="text-gray-200">Single</option>
// //       </select>
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.maritalStatus ? "Married" : "Single"}
// //       </div>
// //     )}
// //     </div>

// //   {/* Spouse Name */}
// //      <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">Spouse Name</label>
// //     {isEditable ? (
// //       <input
// //         type="text"
// //         className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //         name="spouseName"
// //         value={personalDetails.spouseName}
// //         onChange={handleInputChange}
// //         disabled={!maritalStatus} // Disabled when Single
// //       />
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.maritalStatus ? profile.spouseName : "-"}
// //       </div>
// //     )}
// //      </div>

// //   {/* Spouse Phone No */}
// //       <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">Spouse Phone No</label>
// //     {isEditable ? (
// //       <input
// //         type="text"
// //         className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //         name="spousePhoneNo"
// //         value={personalDetails.spousePhoneNo}
// //         onChange={handleInputChange}
// //         disabled={!maritalStatus} // Disabled when Single
// //       />
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.maritalStatus ? profile.spousePhoneNo : "-"}
// //       </div>
// //     )}
// //       </div>
// //      </div>


// //             {/* Fifth Row */}
// //       <div className="grid grid-cols-1 w-full mx-auto gap-4 mb-4">
// //         {/* Passport Number */}
// //             <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">Passport Number</label>
// //     {isEditable ? (
// //       <input
// //         type="text"
// //         className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //         name="passportNumber"
// //         value={personalDetails.passportNumber}
// //         onChange={handleInputChange}
// //       />
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.passportNumber}
// //       </div>
// //     )}
// //            </div>

// //   {/* Aadhar Number */}
// //          <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">Aadhar Number</label>
// //     {isEditable ? (
// //       <div className="w-full">
// //         <input
// //           type="text"
// //           className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //           name="aadharNumber"
// //           value={personalDetails.aadharNumber}
// //           onChange={handleInputChange}
// //         />
// //         {errors.aadharNumber && (
// //           <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>
// //         )}
// //       </div>
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.aadharNumber}
// //       </div>
// //     )}
// //          </div>

// //   {/* PAN Number */}
// //           <div className="flex items-center gap-4 w-2/3">
// //     <label className="text-sm font-medium text-purple-300 w-32">PAN Number</label>
// //     {isEditable ? (
// //       <div className="w-full">
// //         <input
// //           type="text"
// //           className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
// //           name="panNumber"
// //           value={personalDetails.panNumber}
// //           onChange={handleInputChange}
// //         />
// //         {errors.panNumber && (
// //           <p className="text-red-400 text-sm mt-1">{errors.panNumber}</p>
// //         )}
// //       </div>
// //     ) : (
// //       <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
// //         {profile.panNumber}
// //       </div>
// //     )}
// //           </div>
// //        </div>


// //             {/* Sixth Row */}
// //             <div className="grid grid-cols-1 w-full mx-auto gap-4 mb-4">
// //                 {/* <div>
// //                     <label className="block text-sm font-medium text-purple-300">Current Address</label>
// //                     {isEditable ? (
// //                         <input
// //                             type="text"
// //                             className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                             name="currentAddress"
// //                             value={personalDetails.currentAddress}
// //                             onChange={handleInputChange}
// //                         />
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.currentAddress}</div>
// //                     )}
// //                 </div> */}
// //                 {/* <div>
// //                     <label className="block text-sm font-medium text text-purple-300">Permanent Address</label>
// //                     {isEditable ? (
// //                         <input
// //                             type="text"
// //                             className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                             name="permanentAddress"
// //                             value={personalDetails.permanentAddress}
// //                             onChange={handleInputChange}
// //                         />
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.permanentAddress}</div>
// //                     )}
// //                 </div> */}
// //                 {/* <div>
// //                     <label className="block text-sm font-medium text-purple-300">Blood Group</label>
// //                     {isEditable ? (
// //                         <select
// //                             className="mt-1 p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
// //                             name="bloodGroup"
// //                             value={personalDetails.bloodGroup}
// //                             onChange={handleInputChange}
// //                         >
// //                             <option value="" disabled className="text-gray-400">Select Blood Group</option>
// //                             <option value="A+" className="text-gray-200">A+</option>
// //                             <option value="A-" className="text-gray-200">A-</option>
// //                             <option value="B+" className="text-gray-200">B+</option>
// //                             <option value="B-" className="text-gray-200">B-</option>
// //                             <option value="AB+" className="text-gray-200">AB+</option>
// //                             <option value="AB-" className="text-gray-200">AB-</option>
// //                             <option value="O+" className="text-gray-200">O+</option>
// //                             <option value="O-" className="text-gray-200">O-</option>
// //                         </select>
// //                     ) : (
// //                         <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm">{profile.bloodGroup}</div>
// //                     )}
// //                 </div> */}
// //             </div>

// //             {/* Buttons */}
// //             <div className="mt-6 flex space-x-4">
// //                 {isEditable ? (
// //                     <button
// //                         className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
// //                         onClick={() => {
// //                             console.log("Submit button clicked");
// //                             handleSubmit();
// //                           }}
// //                     >
// //                         Submit
// //                     </button>
// //                 ) : (
// //                     <button
// //                         className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
// //                         onClick={handleEdit}
// //                     >
// //                         Edit
// //                     </button>
// //                 )}
// //                 <button
// //                     className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
// //                     onClick={handleChangePassword}
// //                     disabled={isSubmitting}
// //                 >
// //                     {isSubmitting ? "Sending Link..." : "Change Password"}
// //                 </button>
// //             </div>
// //             </div>
// //         </div>
        
// //     );
// // };

// // export default PersonalDetails;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import endpoints from "../../ApiEndpoint";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const PersonalDetails = ({ profile, refreshProfile }) => {
//     const [isEditable, setIsEditable] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [currentLocation, setCurrentLocation] = useState(null);

//     const [personalDetails, setPersonalDetails] = useState({
//         userId: profile?.userId || "",
//         fatherName: profile?.fatherName || "",
//         phoneNo: profile?.phoneNo || "",
//         currentAddress: profile?.currentAddress || "",
//         permanentAddress: profile?.permanentAddress || "",
//         personalEmail: profile?.personalEmail || "",
//         motherName: profile?.motherName || "",
//         fatherPhoneNo: profile?.fatherPhoneNo || "",
//         motherPhoneNo: profile?.motherPhoneNo || "",
//         maritalStatus: profile?.maritalStatus || "",
//         spouseName: profile?.spouseName || "",
//         spousePhoneNo: profile?.spousePhoneNo || "",
//         passportNumber: profile?.passportNumber || "",
//         aadharNumber: profile?.aadharNumber || "",
//         panNumber: profile?.panNumber || "",
//         bloodGroup: profile?.bloodGroup || "",
//     });

//     const [maritalStatus, setMaritalStatus] = useState(personalDetails.maritalStatus === "true");
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         if (profile) {
//             setPersonalDetails({
//                 userId: profile?.userId || "",
//                 fatherName: profile?.fatherName || "",
//                 phoneNo: profile?.phoneNo || "",
//                 currentAddress: profile?.currentAddress || "",
//                 permanentAddress: profile?.permanentAddress || "",
//                 personalEmail: profile?.personalEmail || "",
//                 maritalStatus: profile?.maritalStatus || "",
//                 spouseName: profile?.spouseName || "",
//                 spousePhoneNo: profile?.spousePhoneNo || "",
//                 passportNumber: profile?.passportNumber || "",
//                 aadharNumber: profile?.aadharNumber || "",
//                 panNumber: profile?.panNumber || "",
//                 bloodGroup: profile?.bloodGroup || "",
//                 motherName: profile?.motherName || "",
//                 motherPhoneNo: profile?.motherPhoneNo || "",
//                 fatherPhoneNo: profile?.fatherPhoneNo || "",
//             });
//             setMaritalStatus(profile.maritalStatus === "true");
//         }

//         const latitude = localStorage.getItem("latitude");
//         const longitude = localStorage.getItem("longitude");
//         if (latitude && longitude) {
//             setCurrentLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
//         }
//     }, [profile]);

//     const validateEmail = (email) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     const validatePhoneNumber = (phone) => {
//         const regex = /^\d{10}$/;
//         return regex.test(phone);
//     };

//     const validateAadharNumber = (aadhar) => {
//         const regex = /^\d{12}$/;
//         return regex.test(aadhar);
//     };

//     const validatePANNumber = (pan) => {
//         const regex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
//         return regex.test(pan);
//     };

//     const handleEdit = () => {
//         setIsEditable(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setPersonalDetails((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));

//         if (name === "personalEmail" && !validateEmail(value)) {
//             setErrors((prev) => ({ ...prev, personalEmail: "Invalid email address" }));
//         } else if (name === "phoneNo" && !validatePhoneNumber(value)) {
//             setErrors((prev) => ({ ...prev, phoneNo: "Phone number must be 10 digits" }));
//         } else if (name === "fatherPhoneNo" && !validatePhoneNumber(value)) {
//             setErrors((prev) => ({ ...prev, fatherPhoneNo: "Phone number must be 10 digits" }));
//         } else if (name === "motherPhoneNo" && !validatePhoneNumber(value)) {
//             setErrors((prev) => ({ ...prev, motherPhoneNo: "Phone number must be 10 digits" }));
//         } else if (name === "aadharNumber" && !validateAadharNumber(value)) {
//             setErrors((prev) => ({ ...prev, aadharNumber: "Aadhar number must be 12 digits" }));
//         } else if (name === "panNumber" && !validatePANNumber(value)) {
//             setErrors((prev) => ({ ...prev, panNumber: "Invalid PAN number" }));
//         } else {
//             setErrors((prev) => ({ ...prev, [name]: "" }));
//         }
//     };

//     const handleMaritalStatusChange = (e) => {
//         const isMarried = e.target.value === "true";
//         setMaritalStatus(isMarried);
//         handleInputChange({ target: { name: "maritalStatus", value: isMarried } });
//         if (!isMarried) {
//             handleInputChange({ target: { name: "spouseName", value: "-" } });
//             handleInputChange({ target: { name: "spousePhoneNo", value: "-" } });
//         }
//     };

//     const handleSubmit = async () => {
//         const hasErrors = Object.values(errors).some((error) => error !== "");
//         if (hasErrors) {
//             toast.error("Please fix the errors before submitting.");
//             return;
//         }

//         try {
//             const token = localStorage.getItem("token");
//             const formData = new FormData();
//             formData.append("user", JSON.stringify(personalDetails));
//             const response = await axios.put(
//                 `${endpoints.updateProfile}${personalDetails.userId}`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: token,
//                         "Content-Type": "multipart/form-data",
//                     },
//                     withCredentials: true,
//                 }
//             );
//             toast.success("Personal Details Updated Successfully!");
//             setIsEditable(false);
//             if (refreshProfile) {
//                 refreshProfile();
//             }
//         } catch (error) {
//             toast.error("Failed to update personal details.");
//         }
//     };

//     const handleChangePassword = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const email = localStorage.getItem("username");
//             setIsSubmitting(true);
//             const response = await axios.post(
//                 `${endpoints.changePassword}?userEmail=${email}`,
//                 { email },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: token,
//                     },
//                     withCredentials: true,
//                 }
//             );
//             toast.success(response.data || "Check your email for the reset link!");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to send reset link!");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!profile) {
//         return <div className="text-center text-white-400">Loading...</div>;
//     }

//     return (
//         <div className="flex p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
//             <div className="w-1/2 mx-0">
//                 <h2 className="text-2xl font-bold text-purple-400 mb-6">MY DETAILS</h2>

//                 {/* Personal Details Form */}
//                 <div className="grid grid-cols-1 w-full mx-auto mb-4">
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Name</label>
//                         <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                         {`${profile.firstName || ""} ${profile.lastName || ""}`}
//                         </div>
//                     </div>
//                     {/* <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Last Name</label>
//                         <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                             {profile.lastName || ""}
//                         </div>
//                     </div> */}
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Date of Birth</label>
//                         <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                             {profile.dateOfBirth || ""}
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Personal Email</label>
//                         {isEditable ? (
//                             <div className="flex-1 w-2/3">
//                                 <input
//                                     type="text"
//                                     className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
//                                     name="personalEmail"
//                                     value={personalDetails.personalEmail}
//                                     onChange={handleInputChange}
//                                 />
//                                 {errors.personalEmail && <p className="text-red-400 text-sm mt-1">{errors.personalEmail}</p>}
//                             </div>
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.personalEmail}
//                             </div>
//                         )}
//                     </div>
//                      <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Phone Number</label>
//                         {isEditable ? (
//                             <div className="flex-1 w-2/3">
//                                 <input
//                                     type="text"
//                                     className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
//                                     name="phoneNo"
//                                     value={personalDetails.phoneNo}
//                                     onChange={handleInputChange}
//                                 />
//                                 {errors.phoneNo && <p className="text-red-400 text-sm mt-1">{errors.phoneNo}</p>}
//                             </div>
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.phoneNo}
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Current Address</label>
//                         {isEditable ? (
//                             <input
//                                 type="text"
//                                 className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                 name="currentAddress"
//                                 value={personalDetails.currentAddress}
//                                 onChange={handleInputChange}
//                             />
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.currentAddress}
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Marital Status</label>
//                         {isEditable ? (
//                             <select
//                                 className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                 name="maritalStatus"
//                                 value={maritalStatus ? "true" : "false"}
//                                 onChange={handleMaritalStatusChange}
//                             >
//                                 <option value="" disabled className="text-gray-400">Select Marital Status</option>
//                                 <option value="true" className="text-gray-200">Married</option>
//                                 <option value="false" className="text-gray-200">Single</option>
//                             </select>
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.maritalStatus ? "Married" : "Single"}
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Spouse Name</label>
//                         {isEditable ? (
//                             <input
//                                 type="text"
//                                 className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                 name="spouseName"
//                                 value={personalDetails.spouseName}
//                                 onChange={handleInputChange}
//                                 disabled={!maritalStatus}
//                             />
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.maritalStatus ? profile.spouseName : "-"}
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Spouse Phone No</label>
//                         {isEditable ? (
//                             <input
//                                 type="text"
//                                 className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                 name="spousePhoneNo"
//                                 value={personalDetails.spousePhoneNo}
//                                 onChange={handleInputChange}
//                                 disabled={!maritalStatus}
//                             />
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.maritalStatus ? profile.spousePhoneNo : "-"}
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Passport Number</label>
//                         {isEditable ? (
//                             <input
//                                 type="text"
//                                 className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                 name="passportNumber"
//                                 value={personalDetails.passportNumber}
//                                 onChange={handleInputChange}
//                             />
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.passportNumber}
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">Aadhar Number</label>
//                         {isEditable ? (
//                             <div className="w-full">
//                                 <input
//                                     type="text"
//                                     className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                     name="aadharNumber"
//                                     value={personalDetails.aadharNumber}
//                                     onChange={handleInputChange}
//                                 />
//                                 {errors.aadharNumber && (
//                                     <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>
//                                 )}
//                             </div>
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.aadharNumber}
//                             </div>
//                         )}
//                     </div>

//                     <div className="flex items-center gap-4 w-2/3">
//                         <label className="text-sm font-medium text-purple-300 w-32">PAN Number</label>
//                         {isEditable ? (
//                             <div className="w-full">
//                                 <input
//                                     type="text"
//                                     className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
//                                     name="panNumber"
//                                     value={personalDetails.panNumber}
//                                     onChange={handleInputChange}
//                                 />
//                                 {errors.panNumber && (
//                                     <p className="text-red-400 text-sm mt-1">{errors.panNumber}</p>
//                                 )}
//                             </div>
//                         ) : (
//                             <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
//                                 {profile.panNumber}
//                             </div>
//                         )}
//                     </div>


//                 </div>


//                 <div className="mt-6 flex space-x-4">
//                     {isEditable ? (
//                         <button
//                             className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             onClick={handleSubmit}
//                         >
//                             Submit
//                         </button>
//                     ) : (
//                         <button
//                             className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             onClick={handleEdit}
//                         >
//                             Edit
//                         </button>
//                     )}
//                     <button
//                         className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                         onClick={handleChangePassword}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? "Sending Link..." : "Change Password"}
//                     </button>
//                 </div>
//             </div>

//             {/* Google Map */}
//             <div className="w-1/2 p-6">
//             <label className="text-lg font-medium text-purple-300 p-2">CURRENT LOCATION</label>
//                 {currentLocation ? (
//                     <LoadScript googleMapsApiKey="AIzaSyAflAB_4f4BOkyqyx9wRFeDs8FuTe1PrDk">
//                         <GoogleMap
//                             mapContainerStyle={{ height: "50%", width: "100%" }}
//                             center={currentLocation}
//                             zoom={15}
//                         >
//                             <Marker
//                                 position={currentLocation}
//                                 title="Your Location"
//                             />
//                         </GoogleMap>
//                     </LoadScript>
//                 ) : (
//                     <div className="text-center text-white-400">Loading map...</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PersonalDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import endpoints from "../../ApiEndpoint";
import LocationMap from "./LocationMap";

const PersonalDetails = ({ profile, refreshProfile }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const [personalDetails, setPersonalDetails] = useState({
        userId: profile?.userId || "",
        fatherName: profile?.fatherName || "",
        phoneNo: profile?.phoneNo || "",
        currentAddress: profile?.currentAddress || "",
        permanentAddress: profile?.permanentAddress || "",
        personalEmail: profile?.personalEmail || "",
        motherName: profile?.motherName || "",
        fatherPhoneNo: profile?.fatherPhoneNo || "",
        motherPhoneNo: profile?.motherPhoneNo || "",
        maritalStatus: profile?.maritalStatus || "",
        spouseName: profile?.spouseName || "",
        spousePhoneNo: profile?.spousePhoneNo || "",
        passportNumber: profile?.passportNumber || "",
        aadharNumber: profile?.aadharNumber || "",
        panNumber: profile?.panNumber || "",
        bloodGroup: profile?.bloodGroup || "",
    });

    const [maritalStatus, setMaritalStatus] = useState(personalDetails.maritalStatus === "true");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (profile) {
            setPersonalDetails({
                userId: profile?.userId || "",
                fatherName: profile?.fatherName || "",
                phoneNo: profile?.phoneNo || "",
                currentAddress: profile?.currentAddress || "",
                permanentAddress: profile?.permanentAddress || "",
                personalEmail: profile?.personalEmail || "",
                maritalStatus: profile?.maritalStatus || "",
                spouseName: profile?.spouseName || "",
                spousePhoneNo: profile?.spousePhoneNo || "",
                passportNumber: profile?.passportNumber || "",
                aadharNumber: profile?.aadharNumber || "",
                panNumber: profile?.panNumber || "",
                bloodGroup: profile?.bloodGroup || "",
                motherName: profile?.motherName || "",
                motherPhoneNo: profile?.motherPhoneNo || "",
                fatherPhoneNo: profile?.fatherPhoneNo || "",
            });
            setMaritalStatus(profile.maritalStatus === "true");
        }

        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        if (latitude && longitude) {
            setCurrentLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        }
    }, [profile]);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const regex = /^\d{10}$/;
        return regex.test(phone);
    };

    const validateAadharNumber = (aadhar) => {
        const regex = /^\d{12}$/;
        return regex.test(aadhar);
    };

    const validatePANNumber = (pan) => {
        const regex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
        return regex.test(pan);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "personalEmail" && !validateEmail(value)) {
            setErrors((prev) => ({ ...prev, personalEmail: "Invalid email address" }));
        } else if (name === "phoneNo" && !validatePhoneNumber(value)) {
            setErrors((prev) => ({ ...prev, phoneNo: "Phone number must be 10 digits" }));
        } else if (name === "fatherPhoneNo" && !validatePhoneNumber(value)) {
            setErrors((prev) => ({ ...prev, fatherPhoneNo: "Phone number must be 10 digits" }));
        } else if (name === "motherPhoneNo" && !validatePhoneNumber(value)) {
            setErrors((prev) => ({ ...prev, motherPhoneNo: "Phone number must be 10 digits" }));
        } else if (name === "aadharNumber" && !validateAadharNumber(value)) {
            setErrors((prev) => ({ ...prev, aadharNumber: "Aadhar number must be 12 digits" }));
        } else if (name === "panNumber" && !validatePANNumber(value)) {
            setErrors((prev) => ({ ...prev, panNumber: "Invalid PAN number" }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleMaritalStatusChange = (e) => {
        const isMarried = e.target.value === "true";
        setMaritalStatus(isMarried);
        handleInputChange({ target: { name: "maritalStatus", value: isMarried } });
        if (!isMarried) {
            handleInputChange({ target: { name: "spouseName", value: "-" } });
            handleInputChange({ target: { name: "spousePhoneNo", value: "-" } });
        }
    };

    const handleSubmit = async () => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (hasErrors) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("user", JSON.stringify(personalDetails));
            const response = await axios.put(
                `${endpoints.updateProfile}${personalDetails.userId}`,
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            toast.success("Personal Details Updated Successfully!");
            setIsEditable(false);
            if (refreshProfile) {
                refreshProfile();
            }
        } catch (error) {
            toast.error("Failed to update personal details.");
        }
    };

    const handleChangePassword = async () => {
        try {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("username");
            setIsSubmitting(true);
            const response = await axios.post(
                `${endpoints.changePassword}?userEmail=${email}`,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    withCredentials: true,
                }
            );
            toast.success(response.data || "Check your email for the reset link!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset link!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!profile) {
        return <div className="text-center text-gray-400 p-8">Loading profile data...</div>;
    }

    return (
        <div className="flex p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
            <div className="w-1/2 mx-0">
                <h2 className="text-2xl font-bold text-purple-400 mb-6">MY DETAILS</h2>

                <div className="grid grid-cols-1 w-full mx-auto mb-4">
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Name</label>
                        <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                            {`${profile.firstName || ""} ${profile.lastName || ""}`}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Date of Birth</label>
                        <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                            {profile.dateOfBirth || ""}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Personal Email</label>
                        {isEditable ? (
                            <div className="flex-1 w-2/3">
                                <input
                                    type="text"
                                    className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                                    name="personalEmail"
                                    value={personalDetails.personalEmail}
                                    onChange={handleInputChange}
                                />
                                {errors.personalEmail && <p className="text-red-400 text-sm mt-1">{errors.personalEmail}</p>}
                            </div>
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.personalEmail}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Phone Number</label>
                        {isEditable ? (
                            <div className="flex-1 w-2/3">
                                <input
                                    type="text"
                                    className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500"
                                    name="phoneNo"
                                    value={personalDetails.phoneNo}
                                    onChange={handleInputChange}
                                />
                                {errors.phoneNo && <p className="text-red-400 text-sm mt-1">{errors.phoneNo}</p>}
                            </div>
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.phoneNo}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Current Address</label>
                        {isEditable ? (
                            <input
                                type="text"
                                className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                name="currentAddress"
                                value={personalDetails.currentAddress}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.currentAddress}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Marital Status</label>
                        {isEditable ? (
                            <select
                                className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                name="maritalStatus"
                                value={maritalStatus ? "true" : "false"}
                                onChange={handleMaritalStatusChange}
                            >
                                <option value="" disabled className="text-gray-400">Select Marital Status</option>
                                <option value="true" className="text-gray-200">Married</option>
                                <option value="false" className="text-gray-200">Single</option>
                            </select>
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.maritalStatus ? "Married" : "Single"}
                            </div>
                        )}
                    </div>

                    {maritalStatus && (
                        <>
                            <div className="flex items-center gap-4 w-2/3 mb-3">
                                <label className="text-sm font-medium text-purple-300 w-32">Spouse Name</label>
                                {isEditable ? (
                                    <input
                                        type="text"
                                        className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                        name="spouseName"
                                        value={personalDetails.spouseName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                        {profile.spouseName}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 w-2/3 mb-3">
                                <label className="text-sm font-medium text-purple-300 w-32">Spouse Phone No</label>
                                {isEditable ? (
                                    <input
                                        type="text"
                                        className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                        name="spousePhoneNo"
                                        value={personalDetails.spousePhoneNo}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                        {profile.spousePhoneNo}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    
                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Passport Number</label>
                        {isEditable ? (
                            <input
                                type="text"
                                className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                name="passportNumber"
                                value={personalDetails.passportNumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.passportNumber}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">Aadhar Number</label>
                        {isEditable ? (
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                    name="aadharNumber"
                                    value={personalDetails.aadharNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.aadharNumber && (
                                    <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>
                                )}
                            </div>
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.aadharNumber}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 w-2/3 mb-3">
                        <label className="text-sm font-medium text-purple-300 w-32">PAN Number</label>
                        {isEditable ? (
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="p-2 w-full rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-purple-500 flex-1"
                                    name="panNumber"
                                    value={personalDetails.panNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.panNumber && (
                                    <p className="text-red-400 text-sm mt-1">{errors.panNumber}</p>
                                )}
                            </div>
                        ) : (
                            <div className="p-1 text-gray-200 rounded-lg shadow-sm flex-1">
                                {profile.panNumber}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    {isEditable ? (
                        <button
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleChangePassword}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending Link..." : "Change Password"}
                    </button>
                </div>
            </div>

            <div className="w-1/2">
                <LocationMap currentLocation={currentLocation} />
            </div>
        </div>
    );
};

export default PersonalDetails;