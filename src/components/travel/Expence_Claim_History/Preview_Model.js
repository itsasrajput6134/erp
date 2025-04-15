import axios from "axios";
import React from "react";
import endpoints from "../../../ApiEndpoint";
import DownloadFile from "../../Download/DownloadFile";

const Preview_Model = ({ isOpen, onClose, employeeClaimArray }) => {
  if (!isOpen) return null;

  const handleDownloadFile = async (item) => {
    // const filePath = employeeClaimArray[0].filePath; // Get the file path
    const filePath = item.filePath
    console.log("filepath", filePath);
    // try {
    //   const response = await axios.post(
    //     `${endpoints.downloadfile}`,
    //     { filePath },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       responseType: "blob",
    //     }
    //   );

    //   if (response.status !== 200) {
    //     throw new Error("Failed to download the file.");
    //   }

    //   const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    //   const alink = document.createElement("a");
    //   alink.href = fileURL;
    //   alink.download = "filename.png"; // Set the desired filename dynamically if needed
    //   document.body.appendChild(alink);
    //   alink.click();
    //   document.body.removeChild(alink);
    // } catch (error) {
    //   console.error("Error downloading the file:", error.message);
    // }
  };

  return (
    <div>
      <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
        <div className="modal-content w-75 p-3">
          <div className="row">
            <div class="container text-center common-title fw-bold col-11">
              <h2 class="common-heading mb-3">Expenses</h2>
            </div>
            <div className="col-1">
              <i
                className="fa-solid fa-xmark mt-3 me-3 close"
                onClick={onClose}
              ></i>
            </div>
          </div>
          <div className="row h-75">
            <div class="container">
              <div className="table-responsive">
                <table className="table" width="100">
                  <thead>
                    <tr>
                      <th>Expense Type</th>
                      <th>Expense Date</th>
                      <th>Expense Amount</th>
                      <th>Description</th>
                      <th>BillId</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeClaimArray.length > 0 ? (
                      employeeClaimArray.map((item, index) => (
                        <tr key={item.expenseItemId}>
                          <td>{item.expenseType}</td>
                          <td>{item.expenseDate}</td>
                          <td>{item.expenseAmount}</td>
                          <td>{item.description}</td>
                          <td>{item.billId}</td>
                          <td>
                            <div className="d-flex justify-content-start align-item-center">
                              <DownloadFile employeeClaimArray={item.filePath}/>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Request found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="text-center mb-3 d-flex justify-content-center">
                <button class="btn btn-danger me-3" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview_Model;
