import React, { useEffect, useState } from "react";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";

const Enable_UserId = () => {
  const [treeState, setTreeState] = useState(null);

  useEffect(() => {
    // Fetch data from the /json endpoint when the component mounts
    fetch("http://localhost:7000/json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTreeState(data); // Set the treeState with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const convertFolderTree = (node) => {
    if (!node) return null; // If node is null or undefined, return null
  
    const convertedNode = {
      name: node.name,
      _id: node._id || null, // Provide a default value for _id if it's missing or null
      checked: node.checked,
      isOpen: node.isOpen,
    };
  
    // If node has children, recursively convert each child
    if (node.children && node.children.length > 0) {
      convertedNode.children = node.children.map((child) => convertFolderTree(child));
    }
    return convertedNode;
  };

  const convertedTreeState = convertFolderTree(treeState);

  const onTreeStateChange = (state) => {
    console.log(state);
    console.log(JSON.stringify(state));

    // Make a POST request to the /json endpoint with the complete state
    fetch("http://localhost:7000/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from /json endpoint:", data);
      })
      .catch((error) => {
        console.error("Error sending state to /json endpoint:", error);
      });
  };
  
  return (
    <section className="wrapper">
    <div className="bg-light">
      <div className="fs-4 fw-bold">Create Page</div>
      {treeState !== null && (
        <FolderTree
          data={convertedTreeState}
          onChange={onTreeStateChange}
          initCheckedStatus="custom" 
          initOpenStatus="custom"
          showCheckbox={false}
          // readOnly={true}
        />
      )}
    </div>
    </section>
  );
};

export default Enable_UserId;