import React, { useEffect, useState } from "react";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";

const Right_select_Model = ({
  isModalOpen,
  closeModal,
  onSaveChanges,
  userPages,
}) => {
  const [checkedPages, setCheckedPages] = useState([]);
  const [treeState, setTreeState] = useState(null); // Initialize treeState as null
  const [convertedTreeState, setConvertedTreeState] = useState(null); // Initialize convertedTreeState as null

  // Function to convert the folder tree
  const convertFolderTree = (node) => {
    return {
      name: node.name,
      children: node.children
        ? node.children.map((child) => convertFolderTree(child))
        : undefined,
      _id: node._id,
      checked: node.checked,
      isOpen: node.isOpen,
    };
  };

  // Fetch data from the endpoint when component mounts
  useEffect(() => {
    fetch("http://localhost:7000/json")
      .then((response) => response.json())
      .then((data) => {
        setTreeState(data); // Set the treeState with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  // Convert the treeState to the required format when treeState updates
  useEffect(() => {
    if (treeState) {
      setConvertedTreeState(convertFolderTree(treeState));
    }
  }, [treeState]);

  let savechanges = [];

  let handleNameClick = null;

    handleNameClick = ({ defaultOnClick }) => {
      // Prevent default action (editing) when name is clicked
      return {
        defaultOnClick: () => {}, // No action on name click
      };
    };

  const handleSaveChanges = () => {
    onSaveChanges(savechanges);
    closeModal();
  };


  const onTreeStateChange = (state) => {
    const checkedPages = [];
    const collectCheckedNodes = (node) => {
      if (node.checked === 1) {
        checkedPages.push(node.name);
      }
      if (node.children) {
        node.children.forEach((child) => collectCheckedNodes(child));
      }
    };
    collectCheckedNodes(state);

    if (checkedPages != []) {
      savechanges = [];
      savechanges = checkedPages;
    }

    // Update the state only if there's a change
    if (JSON.stringify(checkedPages) !== JSON.stringify(checkedPages)) {
      setCheckedPages(checkedPages);
    }
  };

  useEffect(() => {
    if (userPages && userPages.length > 0) {
      const updateCheckedStatus = (node) => {
        if (node.children) {
          node.children.forEach((child) => {
            updateCheckedStatus(child);
            child.checked = userPages.includes(child.name) ? 1 : 0; // Update checked status
          });
        }
      };
      updateCheckedStatus(convertedTreeState);
    }
  }, [userPages]);

  return (
    <div>
      {isModalOpen && (
        <>
          <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
            <div className="modal-content w-50">
              <div className="row">
                <div className="col-10 common-model-heading mt-3 d-flex justify-content-center">
                  Select Right
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-xmark mt-3 me-3 close"
                    onClick={closeModal}
                  ></i>
                </div>
              </div>
              <div className="row h-75 p-5">
                <div>
                  <div>Simple Tree</div>
                  <FolderTree
                    data={convertedTreeState}
                    initCheckedStatus="custom" // default: 0 [unchecked]
                    initOpenStatus="custom" // default: 'open'
                    onNameClick={handleNameClick}
                    onChange={onTreeStateChange}
                    // readOnly={true}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end m-4">
                <button
                  type="button"
                  className="btn btn-primary btn-sm mx-5"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Right_select_Model;
