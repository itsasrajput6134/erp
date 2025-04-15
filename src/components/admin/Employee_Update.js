import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import { toast, Toaster } from "react-hot-toast";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { fetchRolesRdx } from "../../store/actions/roleActions";
import { fetchAssetsRdx } from "../../store/actions/assetActions";
import {
  fetchEmployeesRdx,
  updateemployeeRdx,
} from "../../store/actions/employeeActions";

const Employee_Update = () => {
  const dispatch = useDispatch();
  const { roles, roleLoading, roleError } = useSelector((state) => state.role);
  const { assets, assetLoading, assetError } = useSelector(
    (state) => state.asset
  );
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );
  
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [projects, setProjects] = useState([]);
  const [updateEmployee, setUpdateEmployee] = useState({
    userId: "",
    password: "",
    email: "",
    assignedRoles: [],
    assignedAssets: [],
    assignedProject: "",
    project:""
  });

  useEffect(() => {
    dispatch(fetchRolesRdx());
    dispatch(fetchAssetsRdx());
    dispatch(fetchEmployeesRdx());
  }, [dispatch]);

  const fetchProjects = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getAllProjectByDepartmentId}/${id}`,
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
        setProjects(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateemployeeRdx(updateEmployee));
    setUpdateEmployee({
      password: "",
      email: "",
      assignedRoles: [],
      assignedAssets: [],
      assignedProject: "",
      project:""
    });
    setIsModalOpenUpdate(false);
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;

    setUpdateEmployee((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setUpdateEmployee((prevDetails) => ({
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
    setUpdateEmployee((prevDetails) => ({
      ...prevDetails,
      assignedAssets: selectedAssets,
    }));
  };

  const assetsOptions = assets.map((asset) => ({
    value: asset.assetId,
    label: asset.assetName,
  }));

  const handleUpdate = (data) => {
    const { password, ...rest } = data;
    setUpdateEmployee({
      ...rest,
      userId: data.userId,
      email: data.email,
      project: data.project,
      designation: data.designation,
      assignedRoles: data.assignedRoles,
      assignedAssets: data.assignedAssets,
    });
    fetchProjects(data.departmentId);
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${endpoints.deleteEmployee}/${data.userId}`,
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
        toast.success("Deleted Successfully");
        dispatch(fetchEmployeesRdx());
      } else {
        toast.error("No token found");
      }
    } catch (error) {
      toast.error("Error adding employee");
    }
  };
  return (
    <div>
      <section class="wrapper">
        <div class="table-agile-info">
          <div class="panel panel-default">
            <div class="panel-heading">Employee Table</div>
            <div class="table-responsive">
              <table class="table" width="100">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Personal Email Address</th>
                    <th>Contact Details</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Official Email</th>
                    <th>Department</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((item) => (
                      <tr key={item.userId} className="table-row-highlight">
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.personalEmail}</td>
                        <td>{item.phoneNo}</td>
                        <td>{item.roleName.length>0?item.roleName.join(", "):"No Role Assigned"}</td>
                        <td>{item.active?"Yes":"No"}</td>
                        <td>{item.email}</td>
                        <td>{item.department}</td>
                        <td>
                          <div className="d-flex">
                            <i
                              class="fa-solid fa-pen-to-square me-2"
                              onClick={() => handleUpdate(item)}
                            ></i>
                            <i
                              class="fa-solid fa-trash"
                              onClick={() => handleDelete(item)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* Create Country Model  */}
      <div>
        {isModalOpenUpdate && (
          <>
            <div className="modal d-flex w-100 h-100 justify-content-center align-items-center pt-5">
              <div className="modal-content w-50 p-2">
                <div className="row">
                  <div class="container text-center common-title fw-bold col-11">
                    <h2 class="common-heading mb-3">Update Employee Details</h2>
                  </div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-xmark mt-3 me-3 close"
                      onClick={handlecloseUpdate}
                    ></i>
                  </div>
                </div>
                <div className="row">
                  <div class="container">
                    <div class="form-section d-flex justify-content-start w-100">
                      <div className="container">
                        <div class="row mb-3">
                          <div class="col-12 col-md-4">
                            <label
                              for="dob"
                              class="form-label"
                              id="requiredField"
                            >
                              Official Email Address
                            </label>
                            <div>
                              <input
                                type="text"
                                id="email"
                                name="email"
                                class="form-control"
                                value={updateEmployee.email}
                                onChange={handleChangeUpdate}
                              />
                            </div>
                          </div>
                          <div class="col-12 col-md-4">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Project
                            </label>
                            <select
                              id="project"
                              name="project"
                              class="form-select"
                              value={updateEmployee.project}
                              onChange={handleChangeUpdate}
                            >
                              <option value="" selected disabled>
                                Select Project
                              </option>
                              {projects.length > 0 &&
                                projects.map((project) => (
                                  <option
                                    key={project.projectId}
                                    value={project.projectName}
                                  >
                                    {project.projectName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div class="col-12 col-md-4">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Designation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="designation"
                              name="designation"
                              placeholder="Enter State Name"
                              value={updateEmployee.designation}
                              onChange={handleChangeUpdate}
                            />
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div className="col-12 col-md-6">
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
                                      updateEmployee.assignedRoles.includes(
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
                          <div className="col-12 col-md-6">
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
                        class="btn btn-danger me-3"
                        onClick={handlecloseUpdate}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Employee_Update;
