import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import toast from "react-hot-toast";
import Preview_Model from "./Preview_Model";

const Expence_Claim_Approved = () => {
  const [employeeClaimList, setEmployeeClaimList] = useState([]);
  const [employeeClaimListLoading, setEmployeeClaimListLoading] =
    useState(true);
  const [openClaimModel, setOpenClaimModel] = useState(false);
  const [employeeClaimArray, setEmployeeClaimArray] = useState();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    console.log(`${endpoints.getApprovedClaimByStatus}`);
    try {
      const response = await axios.get(
        `${endpoints.getApprovedClaimByStatus}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      setEmployeeClaimList(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch the claim list");
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
    <div>
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
            <div className="panel-heading">Expence Claim Approved Request</div>
            <div className="table-responsive">
              <table className="table" width="100">
                <thead>
                  <tr>
                    <th>Claim Date</th>
                    <th>Requester</th>
                    <th>Approvar Manager</th>
                    <th>Claim Status</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeClaimListLoading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : employeeClaimList.length > 0 ? (
                    employeeClaimList.map((item) => (
                      <tr key={item.expenseClaimId}>
                        <td>{item.claimDate}</td>
                        <td>{item.employeeEmail}</td>
                        <td>{item.approverEmail}</td>
                        <td>{item.expenseClaimStatus}</td>
                        <td>{item.totalAmount}</td>
                        <td>
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
                      <td colSpan="6" className="text-center">
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
    </div>
  );
};

export default Expence_Claim_Approved;
