import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeesRdx,
  addemployeeRdx,
  updateemployeeRdx,
  deleteEmployeeRdx,
} from "../../../store/actions/employeeActions";
import { fetchEmployeesActiveRdx } from "../../../store/actions/employeeActions";
import { fetchRolesRdx } from "../../../store/actions/roleActions";
import { fetchAssetsRdx } from "../../../store/actions/assetActions";
import { IoMdAddCircleOutline } from "react-icons/io";
import Employee_Table from "./Employee_Table";
import { UserPlus } from "lucide-react";

const EmployeeOnboarding = () => {
  const dispatch = useDispatch();
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );
  
  const [adminEmployee, setAdminEmployee] = useState([]);
  const { roles, roleLoading, roleError } = useSelector((state) => state.role);
  const { assets, assetLoading, assetError } = useSelector(
    (state) => state.asset
  );
  const [onBoardDetail, setOnBoardDetail] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    reportingManager: "",
    email: "",
    password: "",
    country: "",
    state: "",
    office: "",
    department: "",
    employeeOnBoardDate: new Date().toISOString().split("T")[0],
    assignedRoles: [],
    assignedAssets: [],
    employeeId: "",
    createdBy: localStorage.getItem("username"),
    designation: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeesRdx());
    dispatch(fetchRolesRdx());
    dispatch(fetchAssetsRdx());
    dispatch(fetchEmployeesActiveRdx());
    fetchCountries();
  }, [dispatch]);

  useEffect(() => {
    if (employees && employees.length > 0) {
      filterEmployees();
    }
  }, [employees]);

  const filterEmployees = () => {
    const adminEmpl = employees.filter((employee) =>
      !employee?.roleName?.includes("DEVELOPER") &&
      !employee?.roleName?.includes("USER")
    );
    setAdminEmployee(adminEmpl);
  };

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

  const handleChange = (e) => {
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
      setOnBoardDetail((prevDetails) => ({
        ...prevDetails,
        [name]: checkedString,
      }));
      return;
    }

    setOnBoardDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setOnBoardDetail((prevDetails) => ({
      ...prevDetails,
      assignedRoles: selectedRoles,
    }));
  };

  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const handleAssetsChange = (selectedOptions) => {
    const selectedAssets = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setOnBoardDetail((prevDetails) => ({
      ...prevDetails,
      assignedAssets: selectedAssets,
    }));
  };

  const assetsOptions = assets.map((asset) => ({
    value: asset.assetId,
    label: asset.assetName,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onBoardDetail.maritalStatus === "") {
      onBoardDetail.maritalStatus = false;
    }
    // Validate required fields
    if (!onBoardDetail.firstName || !onBoardDetail.lastName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    dispatch(addemployeeRdx(onBoardDetail));
    handlecloseUpdateModel(false);

    setOnBoardDetail({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      reportingManager: "",
      email: "",
      password: "",
      country: "",
      state: "",
      office: "",
      department: "",
      employeeOnBoardDate: new Date().toISOString().split("T")[0],
      assignedRoles: [],
      assignedAssets: [],
      employeeId: "",
      createdBy: localStorage.getItem("username"),
      designation: "",
    });
  };

  const handleOpenUpdateModel = () => {
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdateModel = () => {
    setIsModalOpenUpdate(false);
  };

  return (
    <>
      <div>
        <section className="wrapper">
          <section
            className=" common-section contact-section text-white "
            id="Country"
          >
            <div className="container text-end common-title font-bold">
            <div className="flex justify-between pr-4">
              <h2 className="text-left pl-5 font-bold text-white">
              EMPLOYEE TABLE
              </h2>
              <button
                onClick={handleOpenUpdateModel}
                className="flex items-center gap-1 text-gray-900 dark:text-gray-700 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-3 py-2 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-sm font-medium ">Employee Creation</span>
              </button>
            </div>
            </div>
          </section>
          <Employee_Table
            employees={employees}
            employeesLoading={employeesLoading}
            role={roles}
            asset={assets}
            adminEmployee={adminEmployee}
          />
          {isModalOpenUpdate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
                    Create Employee
                  </h2>
                  <button
                    onClick={handlecloseUpdateModel}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={onBoardDetail.firstName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={onBoardDetail.lastName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        onChange={handleChange}
                        value={onBoardDetail.dateOfBirth}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Reporting Manager
                      </label>
                      <select
                        id="reportingManager"
                        name="reportingManager"
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        value={onBoardDetail.reportingManager}
                        onChange={handleChange}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Official Email
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="email"
                        name="email"
                        placeholder="Official Email"
                        onChange={handleChange}
                        value={onBoardDetail.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={onBoardDetail.password}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="designation"
                        name="designation"
                        placeholder="Designation"
                        onChange={handleChange}
                        value={onBoardDetail.designation}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Date of Joining
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="DOJ"
                        name="DOJ"
                        placeholder="Date of Joining"
                        onChange={handleChange}
                        value={onBoardDetail.employeeOnBoardDate}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Office Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        onChange={handleChange}
                        value={onBoardDetail.country}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Office State
                      </label>
                      <select
                        id="state"
                        name="state"
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        onChange={handleChange}
                        value={onBoardDetail.state}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Office Location and Pincode
                      </label>
                      <select
                        id="office"
                        name="office"
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        onChange={handleChange}
                        value={onBoardDetail.office}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        onChange={handleChange}
                        value={onBoardDetail.department}
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Created By
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="createdBy"
                        name="createdBy"
                        placeholder="Created By"
                        onChange={handleChange}
                        value={onBoardDetail.createdBy}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Roles
                      </label>
                      <Select
                        id="assignedRoles"
                        name="assignedRoles"
                        isMulti
                        options={roleOptions}
                        value={
                          onBoardDetail.assignedRoles
                            ? roleOptions.filter((option) =>
                              onBoardDetail.assignedRoles.includes(
                                option.value
                              )
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Assets
                      </label>
                      <Select
                        id="assignedAssets"
                        name="assignedAssets"
                        isMulti
                        options={assetsOptions}
                        value={
                          onBoardDetail.assignedAssets
                            ? assetsOptions.filter((option) =>
                              onBoardDetail.assignedAssets.includes(
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        id="employeeId"
                        name="employeeId"
                        placeholder="Employee ID"
                        onChange={handleChange}
                        value={onBoardDetail.employeeId}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={handlecloseUpdateModel}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
        <Toaster />
      </div>
    </>
  );
};

export default EmployeeOnboarding;