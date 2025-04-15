import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import { toast, Toaster } from "react-hot-toast";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { updateemployeeRdx } from "../../../store/actions/employeeActions";

const Employee_Table = ({employees, employeesLoading, role, asset, adminEmployee}) => {
  const dispatch = useDispatch();
  
  const roleOptions = role.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setUpdateEmployee((prevDetails) => ({
      ...prevDetails,
      assignedRoles: selectedRoles,
    }));
  };
  const assetsOptions = asset.map((asset) => ({
    value: asset.assetId,
    label: asset.assetName,
  }));
  const handleAssetsChange = (selectedOptions) => {
    const selectedAssets = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setUpdateEmployee((prevDetails) => ({
      ...prevDetails,
      assignedAssets: selectedAssets,
    }));
  };


  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState({
    firstName: "",
    lastName: "",
    personalEmail: "",
    createdBy: localStorage.getItem("username"),
    phoneNo: "",
    dateOfBirth: "",
    country: "",
    state: "",
    office: "",
    department: "",
    designation: "",
    fatherName: "",
    fatherPhoneNo: "",
    motherName: "",
    motherPhoneNo: "",
    maritalStatus: "",
    spouseName: "",
    spousePhoneNo: "",
    assignedRoles: "",
    assignedAssets: "",
    employeeId: "",
    employeeOnBoardDate:""
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, [dispatch]);

  useEffect(() => {
    const countryName = updateEmployee?.country;
    fetchCountries();
    const selectedCountry = countries.find(
      (country) => country.countryName === countryName
    );
    fetchStates(selectedCountry?.countryId);
    const stateName = updateEmployee?.state;
    const selectedState = states.find((state) => state.stateName === stateName);
    fetchOffices(selectedState?.stateId);
    const officeName = updateEmployee?.office;
    const selectedOffice = offices.find(
      (office) => office.officeId === officeName
    );
    fetchDepartments(officeName);
  }, [isModalOpenUpdate]);

  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(endpoints.getAllCountry, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = await response.data;
        setCountries(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchStates = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getAllStateByCountryID}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setStates(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchOffices = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getAllOfficeByStateID}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setOffices(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchDepartments = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getAllDepartmentByOfficeId}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setDepartments(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateemployeeRdx(updateEmployee));
    setUpdateEmployee({
      userId: "",
      firstName: "",
      lastName: "",
      personalEmail: "",
      createdBy: localStorage.getItem("username"),
      phoneNo: "",
      dateOfBirth: "",
      country: "",
      state: "",
      office: "",
      department: "",
      designation: "",
      fatherName: "",
      fatherPhoneNo: "",
      motherName: "",
      motherPhoneNo: "",
      maritalStatus: "",
      spouseName: "",
      spousePhoneNo: "",
      assignedRoles: "",
      assignedAssets: "",
      employeeId: "",
    });
    setIsModalOpenUpdate(false);
  };
  const handleChangeUpdate = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "country") {
      let countryId =
        e.target.options[e.target.selectedIndex].getAttribute("data-id");
      fetchStates(countryId);
    }

    if (name === "state") {
      let stateId =
        e.target.options[e.target.selectedIndex].getAttribute("data-id");
      fetchOffices(stateId);
    }

    if (name === "office") {
      let OfficeId =
        e.target.options[e.target.selectedIndex].getAttribute("data-id");
      fetchDepartments(OfficeId);
    }

    if (name === "maritalStatus") {
      const checkedString = String(checked);
      setUpdateEmployee((prevDetails) => ({
        ...prevDetails,
        [name]: checkedString,
      }));
      return;
    }

    setUpdateEmployee((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = (data) => {
    const { password, ...rest } = data;

    setUpdateEmployee({
      userId:data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      reportingManager: data.reportingManager,
      email: data.email,
      country: data.country,
      state: data.state,
      office: data.office,
      department: data.department,
      employeeOnBoardDate: data.employeeOnBoardDate,
      assignedRoles: data.assignedRoles,
      assignedAssets: data.assignedAssets,
      employeeId: data.employeeId,
      designation: data.designation,
    });

    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  return (
    <div>
      <div class="table-agile-info mt-3">
        <div class="panel panel-default">
          {/* <div class="panel-heading">Employee Table</div> */}
          <div class="table-responsive">
            <table class="table" width="100">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Reporting Manager</th>
                  <th>Official Email</th>
                  <th>Date of joining</th>
                  <th>Designation</th>
                  <th>Role</th>
                  <th>Active</th>
                  <th>Employee Id</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeesLoading ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : employees.length > 0 ? (
                  employees.map((item) => (
                    <tr key={item.userId} className="table-row-highlight">
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{item.reportingManager}</td>
                      <td>{item.email}</td>
                      <td>{item.employeeOnBoardDate}</td>
                      <td>{item.designation}</td>
                      <td>
                        {item.roleName.length > 0
                          ? item.roleName.join(", ")
                          : "No Role Assigned"}
                      </td>
                      <td>{item.active ? "Yes" : "No"}</td>
                      <td>{item.employeeId}</td>
                      <td>{item.department}</td>
                      <td>
                        <div className="d-flex">
                          <i
                            class="fa-solid fa-pen-to-square me-2"
                            onClick={() => handleUpdate(item)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="18" className="text-center">
                      No Employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Create Country Model  */}

      <div>
        {isModalOpenUpdate && (
          <div>
            <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
              <div
                className="modal-content w-100 p-3"
                style={{ maxHeight: "100vh", overflowY: "auto" }}
              >
                <div className="row">
                  <div class="container text-center common-title fw-bold col-11">
                    <h2 class="common-heading mb-3">Update Employee</h2>
                  </div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-xmark mt-3 me-3 close"
                      onClick={handlecloseUpdate}
                    ></i>
                  </div>
                </div>
                <div className="row h-100">
                  <div class="container">
                    <div class="form-section d-flex justify-content-start w-100 ">
                      <div className="container">
                        <div class="row mb-3">
                          <div class="col-6 col-md-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              class="form-label required"
                              id="requiredField"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              placeholder="firstName"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.firstName}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              class="form-label"
                              id="requiredField"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              placeholder="Hello"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.lastName}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              class="form-label"
                              id="requiredField"
                            >
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              required
                              className="form-control"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              placeholder="Hello"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.dateOfBirth}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              class="form-label"
                              id="requiredField"
                            >
                              Reporting Manager
                            </label>
                            <select
                              id="reportingManager"
                              name="reportingManager"
                              class="form-select"
                              value={updateEmployee?.reportingManager}
                              onChange={handleChangeUpdate}
                            >
                              <option value="" disabled selected>
                                Select Approver
                              </option>
                              {adminEmployee.length > 0 &&
                                adminEmployee.map((empl) => (
                                  <option key={empl.userId} value={empl.email}>
                                    {empl.firstName + " " + empl.lastName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="col-6 col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Official Email
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="email"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.email}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Designation
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="designation"
                              name="designation"
                              placeholder="designation"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.designation}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label for="dob" class="form-label">
                              Date of Joining
                            </label>
                            <input
                              type="date"
                              required
                              className="form-control"
                              id="employeeOnBoardDate"
                              name="employeeOnBoardDate"
                              placeholder="employeeOnBoardDate"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.employeeOnBoardDate}
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Office Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              class="form-select"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.country}
                            >
                              <option value="" selected>
                                Select Country
                              </option>
                              {countries.map((countr) => (
                                <option
                                  key={countr.countryId}
                                  value={countr.countryName}
                                  data-id={countr.countryId}
                                >
                                  {countr.countryName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="col-6 col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Office State
                            </label>
                            <select
                              id="state"
                              name="state"
                              class="form-select"
                              onChange={handleChangeUpdate}
                              value={updateEmployee?.state}
                            >
                              <option value="" selected>
                                Select State
                              </option>
                              {states.length > 0 &&
                                states.map((state) => (
                                  <option
                                    key={state.stateId}
                                    value={state.stateName}
                                    data-id={state.stateId}
                                  >
                                    {state.stateName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div class="col-6 col-md-3">
                            <label for="dob" class="form-label">
                              Office Location and Pincode
                            </label>
                            <div>
                              <select
                                id="office"
                                name="office"
                                class="form-select"
                                onChange={handleChangeUpdate}
                                value={updateEmployee?.office}
                              >
                                <option value="" selected>
                                  Select Office
                                </option>
                                {offices.length > 0 &&
                                  offices.map((office) => (
                                    <option
                                      key={office.officeId}
                                      value={office.officeId}
                                      data-id={office.officeId}
                                    >
                                      {office.officeLocation +
                                        "-" +
                                        office.officePincode}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Department
                            </label>
                            <select
                              id="department"
                              name="department"
                              class="form-select"
                              onChange={handleChangeUpdate}
                              value={updateEmployee.department}
                            >
                              <option value="" selected>
                                Select Department
                              </option>
                              {departments.length > 0 &&
                                departments.map((department) => (
                                  <option
                                    key={department.departmentId}
                                    value={department.departmentName}
                                  >
                                    {department.departmentName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div class="col-6 col-md-3">
                            <label
                              htmlFor="assignedRoles"
                              className="form-label"
                              id="requiredField"
                            >
                              Roles
                            </label>
                            <Select
                              id="assignedRoles"
                              name="assignedRoles"
                              isMulti
                              options={roleOptions}
                              value={
                                updateEmployee.assignedRoles
                                  ? roleOptions.filter((option) =>
                                    updateEmployee.assignedRoles.includes(option.value)
                                  )
                                  : []
                              }
                              onChange={handleRoleChange}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Select Role"
                              required
                            />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="col-3">
                            <label
                              htmlFor="assignedAssets"
                              className="form-label"
                              id="requiredField"
                            >
                              Assets
                            </label>
                            <Select
                              id="assignedAssets"
                              name="assignedAssets"
                              isMulti
                              options={assetsOptions}
                              value={
                                 updateEmployee.assignedAssets
                                  ? assetsOptions.filter((option) =>
                                    updateEmployee.assignedAssets.includes(
                                      option.value
                                    )
                                  )
                                  : []
                              }
                              onChange={handleAssetsChange}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Select Assets"
                              required
                            />
                          </div>
                          <div class="col-6 col-md-3">
                            <label for="dob" class="form-label">
                              employeeId
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="employeeId"
                              name="employeeId"
                              placeholder="employeeId"
                              onChange={handleChangeUpdate}
                              value={updateEmployee.employeeId}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-3 d-flex justify-content-center">
                      <button
                        class="btn btn-primary me-3"
                        onClick={handleUpdateSubmit}
                      >
                        Submit
                      </button>
                      <button
                        class="btn btn-primary me-3"
                        onClick={handlecloseUpdate}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Employee_Table;
