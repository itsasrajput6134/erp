import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeesActiveRdx } from "../../store/actions/employeeActions";

const Emp_Ofboarding = () => {
  const dispatch = useDispatch();
  const { employees, employeesLoading } = useSelector((state) => state.employee);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [assetStatus, setAssetStatus] = useState({});

  useEffect(() => {
    dispatch(fetchEmployeesActiveRdx());
  }, [dispatch]);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setAssetStatus(
      employee.assignedAssets?.reduce((acc, asset) => {
        acc[asset] = false;
        return acc;
      }, {}) || {}
    );
    const modal = new window.bootstrap.Modal(document.getElementById("offboardModal"));
    modal.show();
  };

  const handleAssetChange = (asset) => {
    setAssetStatus((prev) => ({ ...prev, [asset]: !prev[asset] }));
  };

  const handleOffboard = async () => {
    const unreturnedAssets = Object.entries(assetStatus).filter(([, returned]) => !returned);

    if (unreturnedAssets.length > 0) {
      toast.error("Employee cannot be offboarded until all assets are returned.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${endpoints.updateEmployeeOffboard}/${selectedEmployee.userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Employee Offboarded successfully!");
      dispatch(fetchEmployeesActiveRdx());
      document.getElementById("closeModalBtn").click(); // Close modal
    } catch (error) {
      console.error("Failed to Offboard", error);
      toast.error("Failed to Offboard");
    }
  };

  return (
    <div>
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
            <div className="panel-heading">Active Employee Details</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Personal Email</th>
                    <th>Contact Details</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Official Email</th>
                    <th>Department</th>
                    <th>Assigned Assets</th>
                    <th>Off Board</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesLoading ? (
                    <tr>
                      <td colSpan="10" className="text-center">Loading...</td>
                    </tr>
                  ) : employees.length > 0 ? (
                    employees.map((item) => (
                      <tr key={item.userId}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.personalEmail}</td>
                        <td>{item.phoneNo}</td>
                        <td>{item.roleName.join(", ") || "No Role Assigned"}</td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td>{item.email}</td>
                        <td>{item.department}</td>
                        <td>
                          {item.assignedAssets?.length > 0 ? item.assignedAssets.join(", ") : "No Assets Assigned"}
                        </td>
                        <td>
                          <button className="btn btn-danger" onClick={() => openModal(item)}>Offboard</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">No Employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Toaster />

      {/* Bootstrap Modal */}
      <div className="modal fade" id="offboardModal" tabIndex="-1" aria-labelledby="offboardModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="offboardModalLabel">Confirm Asset Return</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedEmployee && selectedEmployee.assignedAssets?.length > 0 ? (
                <div>
                  {selectedEmployee.assignedAssets.map((asset) => (
                    <div key={asset} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={assetStatus[asset] || false}
                        onChange={() => handleAssetChange(asset)}
                        id={`check-${asset}`}
                      />
                      <label className="form-check-label" htmlFor={`check-${asset}`}>
                        {asset}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assets assigned.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModalBtn">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleOffboard}>
                Confirm Offboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emp_Ofboarding;
