import React, { useEffect, useState } from "react";
import User_Creation_Form from "./User_Creation_Form";
import User_creation_Table from "./User_creation_Table";
import Right_select_Model from "./Right_select_Model";
import toast, { Toaster } from 'react-hot-toast';
// import "react-toastify/dist/ReactToastify.css";

const User_creation_common = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savechangesDatas, setSavechangesDatas] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isToggledRefreshTable, setIsToggledRefreshTable] = useState(false);

  // Function to handle toasting
  const showToast = (message) => {
    toast.success(message);
  };

  const handleRightButtonClick = (selectedUserData) => {
    setSelectedUser(selectedUserData);
    setPagesData(selectedUserData.pages);
    setIsModalOpen(true);
  };

  const handleRightButtonClickForm = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (savechangesData) => {
    setSavechangesDatas(savechangesData);
  };


  const handleToggleRefreshTable = () => {
    setIsToggledRefreshTable((previsToggledRefreshTable) => !previsToggledRefreshTable);
  };

  return (
    <div className="wrapper">
      <User_Creation_Form
        handleRightButtonClickForm={handleRightButtonClickForm}
        pagesData={savechangesDatas}
        handleToggleRefreshTable={handleToggleRefreshTable}
        showToast={showToast}
      />
      <User_creation_Table
        handleRightButtonClick={handleRightButtonClick}
        modelData={savechangesDatas}
        isToggledRefreshTable={isToggledRefreshTable}
        setIsToggledRefreshTable={setIsToggledRefreshTable}
        showToast={showToast}
      />
      <Right_select_Model
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onSaveChanges={handleSaveChanges}
        userPages={pagesData}
      />
      <Toaster 
       position="top-right"
      />
    </div>
  );
};

export default User_creation_common;
