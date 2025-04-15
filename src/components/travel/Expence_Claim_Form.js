import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeesActiveRdx } from "../../store/actions/employeeActions.js";
import {
  addClaimRdx,
  fetchClaimsRdx,
} from "../../store/actions/claimActions.js";
import axios from "axios";
import endpoints from "../../ApiEndpoint.js";

const Expence_Claim_Form = () => {
  const dispatch = useDispatch();
  const fileInputRefs = useRef([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [employeeClaim, setEmployeeClaim] = useState({
    employeeEmail: localStorage.getItem("username"),
    claimDate: new Date().toISOString().split("T")[0],
    travelClaimId: "",
    expenses: "",
    currentRole: "",
    processType: "Expense_Process",

  });
  const [expenseID, setExpenseID] = useState([]);

  const [adminEmployee, setAdminEmployee] = useState([]);

  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );

  const [rows, setRows] = useState([
    {
      expenseDate: "",
      expenseType: "",
      billNumber: "",
      description: "",
      expenseAmount: "",
      file: null,
    },
  ]);

  const [newRow, setNewRow] = useState({
    expenseDate: "",
    expenseType: "",
    description: "",
    expenseAmount: "",
    billNumber: "",
    filePath: "",
  });

  const [claimType, setClaimType] = useState([]);

  const [editIdx, setEditIdx] = useState(-1);

  const fetchClaimType = async () => {
    try {
      const response = await axios.get(`${endpoints.getAllClaimType}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      setClaimType(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchEmployeesActiveRdx());
    fetchClaimType();
  }, [dispatch]);

  useEffect(() => {
    if (employees && employees.length > 0) {
      filterEmployees();
    }
  }, [employees]);

  const filterEmployees = () => {
    const adminEmpl = employees.filter(
      (employee) =>
        !employee.roleName.includes("DEVELOPER") &&
        !employee.roleName.includes("USER")
    );
    setAdminEmployee(adminEmpl);
  };

  const handleEditChange = (e, idx) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[idx] = { ...updatedRows[idx], [name]: value };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        expenseDate: newRow.expenseDate,
        expenseType: newRow.expenseType,
        description: newRow.description,
        expenseAmount: newRow.expenseAmount,
        billNumber: newRow.billNumber,
        // filePath: newRow.filePath
      },
    ]);
    setNewRow({
      expenseDate: "",
      expenseType: "",
      description: "",
      expenseAmount: "",
      billNumber: "",
      // filePath: ""
    });
  };

  const [files, setFiles] = useState({});

  const handleDeleteRow = (idx) => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  };

  const handleEditRow = (idx) => {
    setEditIdx(idx);
  };

  const handleSaveRow = () => {
    setEditIdx(-1);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setEmployeeClaim({ ...employeeClaim, [name]: value });
  };

  const handleReset = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(employeeClaim);
    formData.append("employeeEmail", employeeClaim.employeeEmail);
    formData.append("claimDate", employeeClaim.claimDate);
    formData.append("travelClaimId", employeeClaim.travelClaimId);
    formData.append("currentRole", employeeClaim.currentRole);
    formData.append("processType", "Expense_Process")

    rows.forEach((row, idx) => {
      formData.append(`expenses[${idx}].expenseType`, row.expenseType || "");
      formData.append(`expenses[${idx}].expenseDate`, row.expenseDate || "");
      formData.append(
        `expenses[${idx}].expenseAmount`,
        row.expenseAmount || ""
      );
      formData.append(`expenses[${idx}].description`, row.description || "");
      formData.append(`expenses[${idx}].billNumber`, row.billNumber || "");

      if (files[idx]) {
        formData.append(`expenses[${idx}].file`, files[idx]);
      }
    });

    // Dispatch action
    dispatch(addClaimRdx(formData));
  };

  // handle File change
  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({ ...prevFiles, [idx]: file }));
    }
  };

  // Fetch Expense ID
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${endpoints.getAllTravelsEmployee}/${localStorage.getItem(
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
      setExpenseID(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Calculate total amount whenever rows change
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = rows.reduce(
        (sum, row) => sum + (parseFloat(row.expenseAmount) || 0),
        0
      );
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [rows]);

  // Get Unique Pending data
  const uniqueApprovalStatuses = expenseID.filter(
    (item) => item.approvalStatus === "APPROVED"
  );

  return (
    <>
      <section className="wrapper">
        <section
          className="common-section contact-section text-white"
          id="Country"
        >
          <div className="container text-center common-title fw-bold">
            <h2 className="common-heading text-white">Expense Claim</h2>
            <hr className="w-50 mx-auto" />
          </div>

          <div className="container">
            <div className="form-section d-flex justify-content-start w-100 ">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-6 col-md-3 col-12">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                      id="requiredField"
                    >
                      Employee Email
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="employeeEmail"
                      name="employeeEmail"
                      placeholder="employeeEmail"
                      value={employeeClaim.employeeEmail}
                      onChange={handleChangeForm}
                      readOnly
                    />
                  </div>

                  <div className="col-6 col-md-3 col-12">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                      id="requiredField"
                    >
                      claim Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="claimDate"
                      name="claimDate"
                      placeholder="claimDate"
                      value={employeeClaim.claimDate}
                      onChange={handleChangeForm}
                      min={new Date().toISOString().split("T")[0]}
                      disabled
                    />
                  </div>

                  <div className="col-6 col-md-3 col-12">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Current Role
                    </label>
                    <select
                      id="currentRole"
                      name="currentRole"
                      className="form-select"
                      value={employeeClaim.currentRole}
                      onChange={handleChangeForm}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {localStorage
                        .getItem("roles")
                        ?.split(",")
                        .map((role, index) => (
                          <option key={index} value={role.trim()}>
                            {role.trim()}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-6 col-md-3 col-12">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                      id="requiredField"
                    >
                      Travel Claim Id
                    </label>
                    <select
                      id="approverEmail"
                      name="travelClaimId"
                      class="form-select"
                      value={employeeClaim.travelClaimId}
                      onChange={handleChangeForm}
                    >
                      <option value="" disabled>
                        Select Travel Claim ID
                      </option>
                      {uniqueApprovalStatuses.length > 0 &&
                        uniqueApprovalStatuses.map((item) => (
                          <option key={item.id} value={item.travelGenId}>
                            {item.travelGenId}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Array List */}
          <div className="table-agile-info">
            <div className="panel panel-default">
              <div className="table-responsive">
                {rows.length > 0 && (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Expense Date</th>
                        <th>Expense Claim Type</th>
                        <th>Bill Id</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Upload Docs</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => (
                        <tr key={idx}>
                          <>
                            <td>
                              <input
                                type="date"
                                name="expenseDate"
                                value={row.expenseDate}
                                onChange={(e) => handleEditChange(e, idx)}
                                className="form-control"
                                readOnly={editIdx === idx ? false : true}
                              />
                            </td>

                            <td>
                              <select
                                id="expenseType"
                                name="expenseType"
                                className="form-select"
                                value={row.expenseType}
                                onChange={(e) => handleEditChange(e, idx)}
                                readOnly={editIdx === idx ? false : true}
                              >
                                <option value="a" disabled selected>
                                  Select Claim Type
                                </option>
                                {claimType.length > 0 &&
                                  claimType.map((claim) => (
                                    <option
                                      index={claim.id}
                                      value={claim.claimTypeName}
                                    >
                                      {claim.claimTypeName}
                                    </option>
                                  ))}
                              </select>
                            </td>

                            <td>
                              <input
                                type="text"
                                name="billNumber"
                                value={row.billNumber}
                                onChange={(e) => handleEditChange(e, idx)}
                                className="form-control"
                                readOnly={editIdx === idx ? false : true}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                name="description"
                                value={row.description}
                                onChange={(e) => handleEditChange(e, idx)}
                                className="form-control"
                                readOnly={editIdx === idx ? false : true}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                name="expenseAmount"
                                value={row.expenseAmount}
                                onChange={(e) => handleEditChange(e, idx)}
                                className="form-control"
                                readOnly={editIdx === idx ? false : true}
                              />
                            </td>

                            <td>
                              <input
                                type="file"
                                className="form-control"
                                name="file"
                                ref={(el) => (fileInputRefs.current[idx] = el)}
                                onChange={(e) => handleFileChange(e, idx)}
                              />
                            </td>
                          </>
                          <td>
                            <div className="d-flex justify-content-between">
                              {editIdx === idx ? (
                                <i
                                  class="fa-solid fa-floppy-disk fs-3 me-2"
                                  onClick={handleSaveRow}
                                ></i>
                              ) : (
                                <i
                                  class="fa-solid fa-pen-to-square fs-3 me-2"
                                  onClick={() => handleEditRow(idx)}
                                ></i>
                              )}

                              <i
                                class="fa-solid fa-trash fs-3 me-2"
                                onClick={() => handleDeleteRow(idx)}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="text-start">
                  <h4
                    className="mt-3"
                    style={{ textAlign: "center", color: "black" }}
                  >
                    Total Amount:- {totalAmount}
                  </h4>

                  <button className="btn btn-danger" onClick={handleAddRow}>
                    Add Expenses
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-3 mt-3 d-flex justify-content-center">
            <button className="btn btn-danger me-3" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-primary me-3" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Expence_Claim_Form;
