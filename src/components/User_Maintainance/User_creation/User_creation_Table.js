import React, { useState, useEffect } from "react";
import Right_select_Model from "./Right_select_Model";

const User_creation_Table = ({
  handleRightButtonClick,
  modelData,
  isToggledRefreshTable,
  setIsToggledRefreshTable,
  showToast,
}) => {
  const [formData, setFormData] = useState([]);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [updateformData, setUpdateFormData] = useState({});
  // Fetch user data from API on component mount

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loginDetailsString = localStorage.getItem("loginDetails");
        const loginDetails = JSON.parse(loginDetailsString);
        const email = loginDetails.email;

        console.log(JSON.stringify({ email }));

        if (email) {
          const response = await fetch("http://localhost:7000/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);
          setFormData(data);
        } else {
          console.error("Email not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [isToggledRefreshTable]);

  const handleRightButtonClickInternal = (data) => {
    handleRightButtonClick(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (data) => {
    console.log(data);
    setUpdateFormData({});
    setIsModalOpenUpdate(true);
    setUpdateFormData(data);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    console.log(data.email);
    try {
      const requestBody = {
        email: data.email,
      };

      console.log(JSON.stringify(requestBody)); 

      const response = await fetch("http://localhost:7000/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        showToast("Data Deleted successfully!");
        console.log("User deleted successfully!");
        setIsToggledRefreshTable((prevState) => !prevState);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("&*&*&*&*");
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (formData) => {
    console.log(formData);
    try {
      const { pages = [], ...otherData } = formData;
      const updatedPages = modelData;
      console.log("Updated Pages:", updatedPages); // Log the updatedPages
      const requestBody = {
        ...otherData,
        pages: updatedPages,
      };
      console.log("Request Body:", requestBody); // Log the request body
      const response = await fetch("http://localhost:7000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      showToast("Data Updated successfully!");
      console.log("API Response:", data);
      setIsToggledRefreshTable((prevState) => !prevState);
      setIsModalOpenUpdate(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div class="table-agile-info">
        <div class="panel panel-default">
          <div class="panel-heading">User Registration Table</div>
          <div class="table-responsive">
            <table class="table" width="100">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee Email</th>
                  <th>Employee Password</th>
                  <th>Employee Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.password}</td>
                    <td>{data.role}</td>
                    <td>
                      <div className="d-flex justify-content-evenly w-75">
                        <i
                          class="fa-solid fa-pen-to-square"
                          onClick={() => handleUpdate(data)}
                        ></i>
                        <i
                          class="fa-solid fa-trash"
                          onClick={() => handleDelete(data)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        {isModalOpenUpdate && (
          <>
            <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
              <div className="modal-content w-50">
                <div className="row">
                  <div className="col-10 common-model-heading mt-3 d-flex justify-content-center">
                    Update User
                  </div>
                  <div className="col-2">
                    <i
                      className="fa-solid fa-xmark mt-3 me-3 close"
                      onClick={handlecloseUpdate}
                    ></i>
                  </div>
                </div>
                <div className="row h-75 p-5">
                  <div className="container">
                    <div className="row">
                      <div>
                        <div class="container">
                          <div class="form-section d-flex justify-content-center w-100">
                            <div>
                              <div className="container">
                                <div class="row mb-3">
                                  <div class="col-12 col-md-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      class="form-label"
                                    >
                                      Employee Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      name="name"
                                      placeholder="Enter Employee Name"
                                      value={updateformData.name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div class="col-12 col-md-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      class="form-label"
                                    >
                                      Employee Email
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      placeholder="Enter Employee Email"
                                      value={updateformData.email}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div class="row mb-3">
                                  <div class="col-12 col-md-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      class="form-label"
                                    >
                                      Employee Password
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      placeholder="Enter Employee Password"
                                      value={updateformData.password}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div class="col-12 col-md-6">
                                    <label
                                      for="exampleFormControlInput1"
                                      class="form-label"
                                    >
                                      Employee Role
                                    </label>
                                    <select
                                      id="roleDropdown"
                                      name="role"
                                      onChange={handleChange}
                                      value={updateformData.role}
                                      class="form-select"
                                    >
                                      <option selected>Choose...</option>
                                      <option value="superadmin">
                                        SuperAdmin 
                                      </option>
                                      <option value="admin">Admin</option>
                                      <option value="user">User</option>
                                      <option value="developer">
                                        Developer
                                      </option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="text-center mb-3 d-flex justify-content-center">
                                  <button
                                    class="btn btn-primary me-3"
                                    onClick={() => handleSubmit(updateformData)}
                                  >
                                    Submit
                                  </button>
                                  <button
                                    class="btn btn-danger"
                                    onClick={() =>
                                      handleRightButtonClickInternal(
                                        updateformData
                                      )
                                    }
                                  >
                                    Right
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Right_select_Model />
    </div>
  );
};

export default User_creation_Table;
