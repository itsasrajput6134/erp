import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

const Travel_Approver = () => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [revisedAmount, setRevisedAmount] = useState(""); // Store revised amount
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [employeeTravelListLoading, setEmployeeTravelListLoading] = useState(true);
  const [travelEmployee, setTravelEmployee] = useState();
  const [managerDescription, setManagerDescription] = useState("");
  const [travelDetails, setTravelDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${
          endpoints.getAllTravelsListToApproverWithPendingStatus
        }/${localStorage.getItem("username")}/process/travel_process`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(
        data,
        `${
          endpoints.getAllTravelsListToApproverWithPendingStatus
        }/${localStorage.getItem("username")}/process/travel_process`
      );

      setEmployeeTravelList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTravelDetails = async (requestId) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(
        `${endpoints.getTravelDetails}/${requestId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      setTravelDetails(
        response.data,
        `${endpoints.getTravelDetails}/${requestId}`
      );
    } catch (error) {
      console.error("Error fetching travel details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchList();
    setEmployeeTravelListLoading(false);
  }, []);

  const handleSetStatus = (item) => {
    setTravelEmployee(item);
  };

  const handleViewDetails = (requestId) => {
    fetchTravelDetails(requestId);
  };

  const handleApproved = async () => {
    
    if (!managerDescription) {
      toast.error("Manager Description is mandatory!");
      return;
    }
    const updatedStatus = {
      description:managerDescription,
    };
    try {
      await axios.put(
        `${endpoints.updateTravels}/${travelEmployee.id}/action/approved`,
        updatedStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      fetchList();
      toast.success("Approved Successfully");
      setManagerDescription("");
    } catch (error) {
      toast.error("Error while Updating");
    }
  };

  const handleDenied = async () => {
    if (!managerDescription) {
      toast.error("Manager Description is mandatory!");
      return;
    }
    const updatedStatus = {
      description: managerDescription
    };
    try {
      await axios.put(
        `${endpoints.updateTravels}/${travelEmployee.id}/action/rejected`,
        updatedStatus,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      fetchList();
      toast.success("Denied Successfully");
      setManagerDescription("");
    } catch (error) {
      toast.error("Error while Updating");
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

  const handleClose = () => {
    setManagerDescription("");
  };

  return (
    <div className="pt-20">
      <section className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
        <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div className="panel panel-default">
            <div className="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">REQUESTERS LIST</div>
            <div className="table-responsive">
              <table className="w-full text-lg text-gray-300" width="100">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Travel Request Id</th>
                    <th className="px-4 py-2 text-left">Requester</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {employeeTravelListLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <div className="flex justify-center" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : employeeTravelList.length > 0 ? (
                    employeeTravelList.map((item) => (
                      <tr key={item.requestId} className="hover:bg-gray-800 transition">
                        <td className="px-4 py-2">{item.requestId}</td>
                        <td className="px-4 py-2">{item.requestedBy}</td>
                        <td className="px-4 py-2">{item.status}</td>
                        <td className="px-4 py-2">
                          <div className="d-flex">
                            <i
                              className="fa-solid fa-eye me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#travelDetailsModal"
                              onClick={() => handleViewDetails(item.requestId)}
                            ></i>
                            <i
                              className="fa-solid fa-check me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropApproved"
                              onClick={() => handleSetStatus(item)}
                            ></i>
                            <i
                              className="fa-solid fa-xmark me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropDenied"
                              onClick={() => handleSetStatus(item)}
                            ></i>
                            <i 
                            className="fa-solid fa-pause me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropHold"
                            onClick={() => handleSetStatus(item)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-8">
                        No State found
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
      <div
        className="modal fade"
        id="staticBackdropApproved"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropApprovedLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropApprovedLabel">
                Approved Travel Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
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
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleApproved}
                data-bs-dismiss="modal"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Denied Modal */}
      <div
        className="modal fade"
        id="staticBackdropDenied"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropDeniedLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropDeniedLabel">
                Deny Travel Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
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
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDenied}
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
                Travel Details
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
                    <strong>Accommodation Type:</strong>{" "}
                    {travelDetails.accommodationType}
                  </p>
                  <p>
                    <strong>Travel Date:</strong> {travelDetails.travelDate}
                  </p>
                  <p>
                    <strong>Mode of Travel:</strong> {travelDetails.travelMode}
                  </p>
                  <p>
                    <strong>Destination:</strong> {travelDetails.destCountry}
                  </p>
                  <p>
                    <strong>Purpose of Travel:</strong>{" "}
                    {travelDetails.travelPurpose}
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

export default Travel_Approver;
