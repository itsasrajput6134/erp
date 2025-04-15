import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import endpoints from "../../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // Extract token from URL
  const extractTokenFromURL = () => {
    const path = location.pathname; // Get the current path
    const token = path.split("/reset-password/")[1]; // Extract the token
    if (token) {
      return decodeURIComponent(token); // Decode the token to remove %20
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
    const { oldPassword, newPassword, confirmPassword } = passwordDetails;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const token = extractTokenFromURL();
      if (!token) {
        toast.error("Invalid or missing token in URL");
        return;
      }

      console.log(oldPassword, newPassword, token);

      const response = await axios.post(
        endpoints.submitChangePassword,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully");
        setTimeout(() => {
          navigate("/login");
        }, 300);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }
  };

  return (
    <div className="log-w3">
      <div className="w3layouts-main">
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <input
            className="ggg"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            required
            value={passwordDetails.oldPassword}
            onChange={handleChange}
          />
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
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
            value={passwordDetails.confirmPassword}
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

export default ChangePassword;