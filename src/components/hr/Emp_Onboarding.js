import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeesRdx,
  addemployeeRdx,
  updateemployeeRdx,
  deleteEmployeeRdx,
} from "../../store/actions/employeeActions";

const EmployeeOnboarding = () => {
  const dispatch = useDispatch();
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );
  const [onBoardDetail, setOnBoardDetail] = useState({
    firstName: "",
    lastName: "",
    perosnalEmail: "",
    createdBy: localStorage.getItem("username"),
    phoneNo: "",
    address: "",
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
    password: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [offices, setOffices] = useState([]);
  const [departments, setDepartments] = useState([]);

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  useEffect(() => {
    dispatch(fetchEmployeesRdx());
    fetchCountries();
  }, [dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !onBoardDetail.firstName ||
      !onBoardDetail.lastName ||
      !onBoardDetail.perosnalEmail ||
      !onBoardDetail.address
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addemployeeRdx(onBoardDetail));
    setOnBoardDetail({
      firstName: "",
      lastName: "",
      perosnalEmail: "",
      createdBy: localStorage.getItem("username"),
      phoneNo: "",
      address: "",
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
      password:"",
    });
  };

  const handleUpdate = () => {};
  const handleDelete = () => {};

  return (
    <>
      <section class="wrapper">
        <section class=" common-section contact-section text-white" id="Country">
          <div class="container text-center common-title fw-bold">
            <h2 class="common-heading text-white">Employee Onboarding</h2>
            <hr class="w-50 mx-auto" />
          </div>

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
                      onChange={handleChange}
                      value={onBoardDetail.firstName}
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
                      onChange={handleChange}
                      value={onBoardDetail.lastName}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label"
                      id="requiredField"
                    >
                      Personal Email
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="perosnalEmail"
                      name="perosnalEmail"
                      placeholder="Hello"
                      onChange={handleChange}
                      value={onBoardDetail.perosnalEmail}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label"
                      id="requiredField"
                    >
                      phoneNo
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      placeholder="Hello"
                      onChange={handleChange}
                      value={onBoardDetail.phoneNo}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-3">
                    <label for="dob" class="form-label">
                      Date Of Birth
                    </label>

                    <div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        class="form-control"
                        value={onBoardDetail.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="col-9">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                      id="requiredField"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="address"
                      onChange={handleChange}
                      value={onBoardDetail.address}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Office Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      class="form-select"
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
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Office State
                    </label>
                    <select
                      id="state"
                      name="state"
                      class="form-select"
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
                  <div class="col-6 col-md-3">
                    <label for="dob" class="form-label">
                      Office Location and Pincode
                    </label>
                    <div>
                      <select
                        id="office"
                        name="office"
                        class="form-select"
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
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      class="form-select"
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
                <div class="row mb-3">
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Fathers Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="fatherName"
                      name="fatherName"
                      placeholder="fatherName"
                      onChange={handleChange}
                      value={onBoardDetail.fatherName}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Fathers Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="fatherPhoneNo"
                      name="fatherPhoneNo"
                      placeholder="fatherPhoneNo"
                      onChange={handleChange}
                      value={onBoardDetail.fatherPhoneNo}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="dob" class="form-label">
                      Mothers Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="motherName"
                      name="motherName"
                      placeholder="motherName"
                      onChange={handleChange}
                      value={onBoardDetail.motherName}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Mothers Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="motherPhoneNo"
                      name="motherPhoneNo"
                      placeholder="motherPhoneNo"
                      onChange={handleChange}
                      value={onBoardDetail.motherPhoneNo}
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-3">
                    <div class="form-check mt-4">
                      <label
                        className="form-check-label"
                        htmlFor="maritalStatusCheckbox"
                      >
                        Marital Status
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="maritalStatus"
                        onChange={handleChange}
                        id="maritalStatusCheckbox"
                      ></input>
                    </div>
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Spouse Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="spouseName"
                      name="spouseName"
                      placeholder="spouseName"
                      onChange={handleChange}
                      readOnly={
                        onBoardDetail.maritalStatus === "true" ? false : true
                      }
                      value={onBoardDetail.spouseName}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="dob" class="form-label">
                      Created By
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="createdBy"
                      name="createdBy"
                      placeholder="createdBy"
                      onChange={handleChange}
                      value={onBoardDetail.createdBy}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label for="dob" class="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      value={onBoardDetail.password}
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Blood Group
                    </label>
                    <select
                      id="country"
                      name="country"
                      class="form-select"
                      // onChange={handleChange}
                      // value={onBoardDetail.country}
                    >
                      <option selected disabled>
                        Select Blood Group
                      </option>
                      {bloodGroupOptions.map((group) => (
                        <option
                          key={group.value}
                          value={group.value}
                          data-id={group.label}
                        >
                          {group.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label"
                    >
                      PassPort Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Hello"
                      // onChange={handleChange}
                      // value={onBoardDetail.lastName}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label"
                    >
                      Aadhar Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="perosnalEmail"
                      name="perosnalEmail"
                      placeholder="Hello"
                      // onChange={handleChange}
                      // value={onBoardDetail.perosnalEmail}
                    />
                  </div>
                  <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label"
                    >
                      Pan Number
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      placeholder="Hello"
                      // onChange={handleChange}
                      // value={onBoardDetail.phoneNo}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button class="btn btn-primary me-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </section>
      </section>
      <Toaster />
    </>
  );
};

export default EmployeeOnboarding;
