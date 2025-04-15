import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import toast from "react-hot-toast";
import Preview_Model from "./Preview_Model";

const Expence_Claim_History = () => {
  const [employeeClaimList, setEmployeeClaimList] = useState([]);
  const [employeeClaimListLoading, setEmployeeClaimListLoading] =
    useState(true);
  const [openClaimModel, setOpenClaimModel] = useState(false);
  const [employeeClaimArray, setEmployeeClaimArray] = useState();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    console.log(
      `${endpoints.getClaimByEmployeeEmail}/${localStorage.getItem("username")}`
    );
    try {
      const response = await axios.get(
        `${endpoints.getClaimByEmployeeEmail}/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      setEmployeeClaimList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setEmployeeClaimListLoading(false);
    }
  };

  const handleOpenClaim = (data) => {
    setEmployeeClaimArray(data.expenses);
    setOpenClaimModel(true);
  };

  const onClose = () => {
    setOpenClaimModel(false);
  };

  return (
    <div className="pt-20">
      <section className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
        <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div className="panel panel-default">
            <div className="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">CLAIM HISTORY</div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300" width="100">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Claim Date</th>
                    <th className="px-4 py-2 text-left">Approval Manager</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeClaimListLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-9">
                        <div className="flex justify-center" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : employeeClaimList.length > 0 ? (
                    employeeClaimList.map((item) => (
                      <tr key={item.expenseClaimId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.claimDate}</td>
                        <td className="px-4 py-2">{item.approverEmail}</td>
                        <td className="px-4 py-2">{item.approvalStatus}</td>
                        <td className="px-4 py-2">
                          <div className="d-flex justify-content-start">
                            <i
                              class="fa-solid fa-eye text-center"
                              onClick={() => handleOpenClaim(item)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        No Request found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Preview_Model
        isOpen={openClaimModel}
        onClose={onClose}
        employeeClaimArray={employeeClaimArray}
      />

      {/* View Model */}
      {/* {openClaimModel && (
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
                        employeeClaimArray.map((item) => (
                          <tr key={item.expenseItemId}>
                            <td>{item.expenseType}</td>
                            <td>{item.expenseDate}</td>
                            <td>{item.expenseAmount}</td>
                            <td>{item.description}</td>
                            <td>{item.billId}</td>
                            <td>
                              <div className="d-flex justify-content-start align-item-center">
                                <i class="fa-solid fa-expand me-2"></i>
                                <i class="fa-solid fa-cloud-arrow-down me-2"></i>
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
      )} */}
    </div>
  );
};

export default Expence_Claim_History;
