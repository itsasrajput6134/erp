import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import axios from "axios";
import toast from "react-hot-toast";

const EmpLeaveApprover = () => {
  const [approvedLeaveLoading, setApprovedLeaveLoading] = useState(true);
  const [approvedLeave, setApprovedLeave] = useState(null);
  const [leaveEmployee, setLeaveEmployee] = useState();
  const [managerDescription, setManagerDescription] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [travelDetails, setTravelDetails] = useState({});

  useEffect(() => {
    fetchLeaveData();
  }, []);
  const handleClose = () => {
    setManagerDescription("");
  };
  const handleSetStatus = (item) => {
    console.log(item);

    setLeaveEmployee(item);
  };
  async function fetchLeaveData() {
    try {
      const username = localStorage.getItem("username");
      console.log(
        `${
          endpoints.getAllTravelsListToApproverWithPendingStatus
        }/${localStorage.getItem("username")}/process/Leave_Process`
      );

      const response = await axios.get(
        // `${endpoints.getAllLeavesForApprover}?approver=${username}&status=PENDING`,
        `${
          endpoints.getAllTravelsListToApproverWithPendingStatus
        }/${localStorage.getItem("username")}/process/Leave_Process`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data.length);

      setApprovedLeave(data);
      setApprovedLeaveLoading(false);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
      toast.error("Error while fetching List");
      setApprovedLeaveLoading(false);
    }
  }

  const fetchTravelDetails = async (requestId) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(
        `${endpoints.getLeaveById}/${requestId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setTravelDetails(response.data);
    } catch (error) {
      console.error("Error fetching travel details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleApproved = async () => {
    if (!managerDescription) {
      toast.error("Manager Description is mandatory!");
      return;
    }
    const { id, employeeEmail, approver, leaveType, leaveDates } =
      leaveEmployee;
    const updatedStatus = {
      description: managerDescription,
    };
    try {
      const response = await axios.put(
        `${endpoints.updateTravels}/${id}/action/approved`,
        updatedStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      toast.success("Approved Successfully");
      setManagerDescription("");
      fetchLeaveData();
    } catch (error) {
      console.log(error);
      toast.error("Error while Updating");
    }
  };

  const handleViewDetails = (requestId) => {
    fetchTravelDetails(requestId);
  };

  const handleDenied = async () => {
    if (!managerDescription) {
      toast.error("Manager Description is mandatory!");
      return;
    }
    const { id, employeeEmail, approver, leaveType, leaveDates } =
      leaveEmployee;
    const updatedStatus = {
      description: managerDescription,
    };
    try {
      console.log(`${endpoints.updateTravels}/${id}/action/rejected`, updatedStatus);
      const response = await axios.put(
        `${endpoints.updateTravels}/${id}/action/rejected`,
        updatedStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      toast.error("Denied Successfully");
      setManagerDescription("");
      fetchLeaveData();
    } catch (error) {
      console.log(error);
      toast.error("Error while Updating");
    }
  };

  return (
    <div className="pt-20">
      {/* Emp Leave History Table */}
      <section className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadlow-lg">
        <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div class="panel panel-default">
            <div class="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">LEAVE APPROVER</div>
            <div class="table-responsive">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Leave Requester</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {approvedLeaveLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <div className="flex justify-center">
                          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"> Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : approvedLeave && approvedLeave.length > 0 ? (
                    approvedLeave.map((item) => (
                      <tr key={item.id}>
                        {/* <td>
                          {item &&
                          item.leaveDates &&
                          Array.isArray(item.leaveDates) &&
                          item.leaveDates.length > 0
                            ? item.leaveDates.join(", ")
                            : "No Date present"}
                        </td> */}
                        {/* <td>{item.leaveType}</td> */}
                        <td>{item.requestedBy}</td>
                        <td>{item.status}</td>
                        <td>
                          <div className="d-flex">
                            <i
                              className="fa-solid fa-eye me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#travelDetailsModal"
                              onClick={() => handleViewDetails(item.requestId)}
                            ></i>
                            <i
                              class="fa-solid fa-regular fa-check me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropApproved"
                              onClick={() => handleSetStatus(item)}
                            ></i>
                            <i
                              class="fa-solid fa-xmark me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropDenied"
                              onClick={() => handleSetStatus(item)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        No Leave found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* Approved Model */}
      <div
        class="modal fade"
        id="staticBackdropApproved"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Approved Description
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div class="modal-body">
              <div className="row mb-3">
                <div class="col-12">
                  <label
                    htmlFor="exampleFormControlInput1"
                    class="form-label required"
                    id="requiredField"
                  >
                    Manager Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="managerDescription"
                    value={managerDescription}
                    onChange={(e) => {
                      setManagerDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => handleApproved()}
              >
                Approved
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Denied Model */}

      <div
        class="modal fade"
        id="staticBackdropDenied"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Denied Description
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div class="modal-body">
              <div className="row mb-3">
                <div class="col-12">
                  <label
                    htmlFor="exampleFormControlInput1"
                    class="form-label required"
                    id="requiredField"
                  >
                    Manager Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="managerDescription"
                    value={managerDescription}
                    onChange={(e) => {
                      setManagerDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDenied()}
              >
                Denied
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Details Modal */}
      <div
        className="modal fade"
        id="travelDetailsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="travelDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="travelDetailsModalLabel">
                Leave Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {loadingDetails ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Leave Type:</strong> {travelDetails.leaveType}
                  </p>
                  <p>
                    <strong>Leave Date:</strong>{" "}
                    {travelDetails &&
                    travelDetails.leaveDates &&
                    Array.isArray(travelDetails.leaveDates) &&
                    travelDetails.leaveDates.length > 0
                      ? travelDetails.leaveDates.join(", ")
                      : "No Date present"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveApprover;
