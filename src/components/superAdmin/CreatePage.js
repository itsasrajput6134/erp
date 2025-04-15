import React, { useEffect, useState } from "react";
import FolderTree from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import axios from "axios";
import { endpoints } from "../../ApiEndpoint";

const CreatePage = () => {
  const [treeState, setTreeState] = useState(null);
  const fetchPages = async () => {
    try {
      const response = await axios.get(endpoints.getPageStructure, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data[0].data.data.data);
      setTreeState(data[0].data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPages();
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
      convertedNode.children = node.children.map((child) =>
        convertFolderTree(child)
      );
    }
    return convertedNode;
  };

  const convertedTreeState = convertFolderTree(treeState);

  const onTreeStateChange = async (state) => {
    const wrappedState = {
      data: {
        data: state,
      },
    };

    console.log(wrappedState);
    console.log(JSON.stringify(wrappedState));

    try {
      const response = await axios.post(
        endpoints.addPageStructure,
        wrappedState,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("Response from /api/json-data endpoint:", data);
    } catch (error) {
      console.error("Error sending state to /api/json-data endpoint:", error);
    }
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

export default CreatePage;
