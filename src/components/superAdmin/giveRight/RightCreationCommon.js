import React, { useEffect, useState } from "react";
import RightCreationForm from "./RightCreationForm";
import RightCreationTable from "./RightCreationTable";
import RightSelectModel from "./RightSelectModel";
import  { Toaster } from 'react-hot-toast';

const RightCreationCommon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savechangesDatas, setSavechangesDatas] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isToggledRefreshTable, setIsToggledRefreshTable] = useState(false);

  const handleRightButtonClick = (selectedUserData) => {
    setSelectedUser(selectedUserData);
    setPagesData([]);
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
      <RightCreationForm
        handleRightButtonClickForm={handleRightButtonClickForm}
        pagesData={savechangesDatas}
        handleToggleRefreshTable={handleToggleRefreshTable}
      />
      <RightCreationTable
        handleRightButtonClick={handleRightButtonClick}
        modelData={savechangesDatas}
        isToggledRefreshTable={isToggledRefreshTable}
        setIsToggledRefreshTable={setIsToggledRefreshTable}
      />
      <RightSelectModel
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onSaveChanges={handleSaveChanges}
        userPages={pagesData}
        
      />
      <Toaster />
    </div>
  );
}

export default RightCreationCommon
