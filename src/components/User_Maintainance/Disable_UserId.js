import React, { useState } from "react";
import FolderTree from "react-folder-tree";
 
const Disable_UserId = () => {
  // Define initial state with only the root folder
  const [treeData, setTreeData] = useState({
    name: "Root Folder",
    children: [],
    _id: 1,
    checked: 0,
    isOpen: true,
  });
  // Function to handle adding a new folder
  const addFolder = () => {
    const newFolder = {
      name: "New Folder",
      children: [],
      _id: Math.random(), // Generate unique ID
      checked: 0,
      isOpen: true,
    };
 
    // Update the state by adding the new folder
    setTreeData((prevState) => ({
      ...prevState,
      children: [...prevState.children, newFolder],
    }));
  };
 
  // Function to handle adding a new file (assuming it's within a specific folder)
  const addFile = (folderId) => {
    const newFile = {
      name: "New File",
      _id: Math.random(), // Generate unique ID
      checked: 0,
    };
 
    // Update the state by adding the new file to the specified folder
    setTreeData((prevState) => {
      const updatedChildren = prevState.children.map((folder) => {
        if (folder._id === folderId) {
          return {
            ...folder,
            children: [...folder.children, newFile],
          };
        }
        return folder;
      });
 
      return {
        ...prevState,
        children: updatedChildren,
      };
    });
  };
 
  // Function to handle tree state change
  const onTreeStateChange = (state, event) => {
    console.log(state, event);
    // You can perform any additional actions based on state changes here
  };
 
  return (
    <section className="wrapper">
      <div className="container">
      <FolderTree data={treeData} onChange={onTreeStateChange} />
      </div>
    </section>
  );
};
 
export default Disable_UserId;