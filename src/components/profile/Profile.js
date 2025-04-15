import React, { useEffect, useState } from "react";
import axios from "axios";
import endpoints from "../../ApiEndpoint";
import PersonalDetails from "./PersonalDetails.js";
import AccountDetails from "./AccountDetails.js";
import OfficialDetails from "./OfficialDetails.js";
import DocumentDetails from "./DocumentDetails.js";
import Fab from "@mui/material/Fab"; // Import Fab from Material-UI
import MenuOpenIcon from "@mui/icons-material/MenuOpen"; // Import MenuOpenIcon

const Profile = () => {
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getProfile}${localStorage.getItem("username")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      setEmployeeProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle menu item click
  const handleMenuItemClick = (tab) => {
    setActiveTab(tab); // Set the active tab
    setIsDropdownOpen(false); // Close the dropdown
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetails profile={employeeProfile} refreshProfile={fetchDetails} />;
      case "account":
        return <AccountDetails profile={employeeProfile} refreshProfile={fetchDetails} />;
      case "official":
        return <OfficialDetails profile={employeeProfile} />;
      case "docs":
        return <DocumentDetails profile={employeeProfile} refreshProfile={fetchDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Floating Action Button (Fab) */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1200,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          "&:hover": {
            background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
            transform: "scale(1.1)",
          },
        }}
        onClick={toggleDropdown} // Toggle dropdown on click
      >
        <MenuOpenIcon />
      </Fab>

      {/* Floating Professional Buttons (Stacked Up to Down) */}
      {isDropdownOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col space-y-3">
          <button
            className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ background: "linear-gradient(45deg, #4A90E2 30%, #6BB9F0 90%)" }}
            onClick={() => handleMenuItemClick("personal")}
          >
            Personal
          </button>
          <button
            className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ background: "linear-gradient(45deg, #34495E 30%, #5D6D7E 90%)" }}
            onClick={() => handleMenuItemClick("official")}
          >
            Official
          </button>
          <button
            className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ background: "linear-gradient(45deg, #16A085 30%, #1ABC9C 90%)" }}
            onClick={() => handleMenuItemClick("account")}
          >
            Account
          </button>
          <button
            className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
            style={{ background: "linear-gradient(45deg, #8E44AD 30%, #9B59B6 90%)" }}
            onClick={() => handleMenuItemClick("docs")}
          >
            Documents
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl  mx-auto rounded-lg px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Area */}
        <div className="mt-10 max-w-5xl  mx-auto rounded-lg px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
        </div>
    </div>
  );
};

export default Profile;