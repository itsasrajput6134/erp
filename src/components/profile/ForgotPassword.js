import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import endpoints from "../../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordDetails, setPasswordDetails] = useState({
    newPassword: "",
    confirmNewPassword: "",
    otpNumber:""
  });
  // Extract token from URL
  const extractTokenFromURL = () => {
    const path = location.pathname; 
    const token = path.split("/otp/")[1];
    if (token) {
      return decodeURIComponent(token);
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    const { newPassword, confirmNewPassword, otpNumber } = passwordDetails;
    if (!newPassword || !confirmNewPassword || !otpNumber) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const token = extractTokenFromURL();
      if (!token) {
        toast.error("Invalid or missing token in URL");
        return;
      }
      

      // console.log(newPassword, confirmNewPassword, otpNumber, token);

      const response = await axios.post(
        endpoints.submitForgotPassword,
        { newPassword, otpNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message||"Password changed successfully");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
      
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="log-w3">
      <div className="w3layouts-main">
        <h2>Forgot Password</h2>
        <form onSubmit={handleChangePassword}>
          <input
            className="ggg"
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
            value={passwordDetails.newPassword}
            onChange={handleChange}
          />
          <input
            className="ggg"
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            required
            value={passwordDetails.confirmNewPassword}
            onChange={handleChange}
          />
          <input
            className="ggg"
            type="text"
            name="otpNumber"
            placeholder="Enter OTP here"
            required
            value={passwordDetails.otpNumber}
            onChange={handleChange}
          />
          <div className="clearfix"></div>
          <input type="submit" value="Submit" name="changePassword" />
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;