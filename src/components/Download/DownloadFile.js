import axios from "axios";
import React from "react";
import endpoints from "../../ApiEndpoint";

function DownloadFile({ employeeClaimArray }) {
  console.log(employeeClaimArray);
  const handleDownloadFile = async () => {

    const filePath = employeeClaimArray;
    console.log("filepath", filePath);
    try {
        const response = await axios.post(
          `${endpoints.downloadfile}`,
          { filePath },
          {
            headers: { "Content-Type": "application/json" },
            responseType: "blob",
          }
        );
      
        if (!response.status) {
          throw new Error("Failed to download the file.");
        }
      
        // Determine the file name
        let fileName = filePath.split("/").pop() || "downloaded_file";
      
        // Create a Blob using the response data and correct content type
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
      
        // Create a Blob URL
        const fileURL = window.URL.createObjectURL(blob);
      
        // Create a link element for download
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = fileName; // Use the derived file name
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink);
      
        // Revoke Blob URL to free memory
        window.URL.revokeObjectURL(fileURL);
      
      } catch (error) {
        console.error("Error downloading the file:", error.message);
      }
      
  };
  return (
    <>
      <i
        class="fa-solid fa-cloud-arrow-down me-2"
        onClick={handleDownloadFile}
      ></i>
    </>
  );
}

export default DownloadFile;
