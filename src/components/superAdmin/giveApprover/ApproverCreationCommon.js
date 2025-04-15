import React, { useEffect, useState } from "react";
import RightCreationForm from "./ApproverCreationForm";
import RightCreationTable from "./ApproverCreationTable";
import RightSelectModel from "./ApproverSelectModel";
import  { Toaster } from 'react-hot-toast';

const RightCreationCommon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savechangesDatas, setSavechangesDatas] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [flowData, setFlowData] = useState([]);
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
    console.log((savechangesData));
  };


  const handleToggleRefreshTable = () => {
    setIsToggledRefreshTable((previsToggledRefreshTable) => !previsToggledRefreshTable);
  };

  return (
    <div className="wrapper">
      <RightCreationForm
        handleRightButtonClickForm={handleRightButtonClickForm}
        flowData={savechangesDatas}
        setIsToggledRefreshTable={setIsToggledRefreshTable}
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