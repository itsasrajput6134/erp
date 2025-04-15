import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import toast from "react-hot-toast";
import Preview_Model from "./Preview_Model";

const Expence_Claim_Approver = () => {
  const [employeeClaimList, setEmployeeClaimList] = useState([]);
  const [employeeClaimListLoading, setEmployeeClaimListLoading] =
    useState(true);
  const [travelEmployee, setTravelEmployee] = useState();
  const [managerDescription, setManagerDescription] = useState("");
  const [openClaimModel, setOpenClaimModel] = useState(false);
  const [employeeClaimArray, setEmployeeClaimArray] = useState();

  // State for manager description and revised amount
  const [description, setDescription] = useState("");
  const [revisedAmount, setRevisedAmount] = useState("");

  useEffect(() => {
    fetchList();
  }, []);

  const fetchTravelDetails = async (requestId) => {
    try {
      const response = await axios.get(
        `${endpoints.getExpenseClaimById}/${requestId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmployeeClaimArray(response.data.expenses);
      setOpenClaimModel(true);
    } catch (error) {
      console.error("Error fetching travel details:", error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${
          endpoints.getAllTravelsListToApproverWithPendingStatus
        }/${localStorage.getItem("username")}/process/Expense_Process`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmployeeClaimList(response.data);
    } catch (error) {
      console.error("Failed to fetch the claim list:", error);
      toast.error("Failed to fetch the claim list");
    } finally {
      setEmployeeClaimListLoading(false);
    }
  };

  const handleOpenClaim = (requestId) => {
    fetchTravelDetails(requestId);
  };

  const onClose = () => {
    setOpenClaimModel(false);
  };

  const handleApproved = async (item) => {
    const updatedStatus = {
      description,
      revisedAmount,
    };

    try {
      console.log(`${endpoints.updateTravels}/${travelEmployee.id}/action/approved`, updatedStatus);
      await axios.put(
        `${endpoints.updateTravels}/${travelEmployee.id}/action/approved`,
        updatedStatus,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      fetchList();
      toast.success("Approved Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error while updating");
    }
  };

  const handleHold = async () => {
    if(!managerDescription){
      toast.error("Manager Description is mandatory!");
      return;
    }
    const updatedStatus = {
      description: managerDescription,
      revisedAmount: revisedAmount,
    };
    try {
      await axios.put(
        `${endpoints.updateTravels}/${travelEmployee.id}/action/hold`,
        updatedStatus,{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      fetchList();
      toast.success("Request Hold");
      setManagerDescription("");
      setRevisedAmount("");
      const modalElement = document.getElementById("staticBackdropHold");
      console.log("Modal Element:", modalElement);
    }
    catch(error){
      toast.error("Error white updating")
    }
  }


  const handleDenied = async (item) => {
    const updatedStatus = {
      description,
    };

    try {
      await axios.put(
        `${endpoints.updateTravels}/${travelEmployee.id}/action/rejected`,
        updatedStatus,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      fetchList();
      toast.success("Denied Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error while updating");
    }
  };

  return (
    <div className="pt-20">
      <section className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
        <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div className="panel panel-default">
            <div className="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">REQUESTERS LIST</div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300" width="100%">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Requester Mail</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeClaimListLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <div className="flex justify-center" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : employeeClaimList.length > 0 ? (
                    employeeClaimList.map((item) => (
                      <tr key={item.expenseClaimId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.requestedBy}</td>
                        <td className="px-4 py-2">{item.status}</td>
                        <td>
                          <div className="d-flex justify-content-start">
                            <i
                              className="fa-solid fa-eye me-2"
                              onClick={() => handleOpenClaim(item.requestId)}
                            ></i>
                            <i
                              className="fa-solid fa-check text-success me-2"
                              onClick={() => setTravelEmployee(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropApproved"
                            ></i>
                            <i
                              className="fa-solid fa-xmark text-danger"
                              onClick={() => setTravelEmployee(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropDenied"
                            ></i>
                             <i
                              className="fa-solid fa-pause text-danger"
                              onClick={() => setTravelEmployee(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropHold"
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-9">
                        No Requests Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Approved Modal */}
      <div className="modal fade" id="staticBackdropApproved" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Approve Travel Request</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Manager Description</label>
              <textarea
                className="form-control mb-2"
                placeholder="Enter manager description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label className="form-label">Revised Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter revised amount"
                value={revisedAmount}
                onChange={(e) => setRevisedAmount(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleApproved(travelEmployee)}
                data-bs-dismiss="modal"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Denied Modal */}
      <div className="modal fade" id="staticBackdropDenied" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Deny Travel Request</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                placeholder="Enter manager description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDenied(travelEmployee)}
                data-bs-dismiss="modal"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
       className="modal fade"
       id="staticBackdropHold"
       data-bs-backdrop="static"
       data-bs-keyboard="false"
       tabIndex="-1"
       aria-labelledby="staticBackdropHoldLabel"
       aria-hidden="true"
      >
      <div className="modal-dialog">
      <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropHoldLabel">
          Hold Travel Request
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <textarea
          className="form-control"
          placeholder="Enter manager description"
          value={managerDescription}
          onChange={(e) => setManagerDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleHold}
        >
          Hold
        </button>
      </div>
      </div>
      </div>
      </div>

      <Preview_Model
        isOpen={openClaimModel}
        onClose={onClose}
        employeeClaimArray={employeeClaimArray}
      />
    </div>
  );
};

export default Expence_Claim_Approver;
