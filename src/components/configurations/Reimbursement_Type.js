import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import endpoints from "../../ApiEndpoint";
import { toast, Toaster } from "react-hot-toast";

const Reimbursement = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [reimbursement, setReimbursement] = useState([]);
  const [addReimbursement, setAddReimbursement] = useState({
    reimbType: "",
  });
  const [updateReimbursement, setUpdateReimbursement] = useState({
    reimbType: "",
  });

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddReimbursement((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateReimbursement((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoints.addReimbursement, addReimbursement, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        const data = response.data;

        toast.success("Added Successfully");
        setAddReimbursement({ reimbType: "" });
        setIsModalOpenCreate(false);
        fetchData();
      } else {
        console.log(response.status);
        toast.error("No token found");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        toast.error("Error adding employee");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoints.getAllReimbursement, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data;
        setReimbursement(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${endpoints.updateReimbursement}/${updateReimbursement.reimbId}`,
        updateReimbursement,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        toast.success("Updated Successfully");
        setIsModalOpenUpdate(false);
        fetchData(); // Refresh the list after updating a country
      } else {
        console.log(response.status);
        toast.error("Update failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error updating country");
      } else {
        toast.error("Network error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleUpdate = (data) => {
    setUpdateReimbursement(data);
    setIsModalOpenUpdate(true);
  };
  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleDelete = async (data) => {
    try {
      const response = await axios.delete(
        `${endpoints.deleteReimbursement}/${data.reimbId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        toast.success("Deleted Successfully");
        fetchData(); // Refresh the list after updating a country
      } else {
        console.log(response.status);
        toast.error("Delete failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error Deleting country");
      } else {
        toast.error("Network error");
      }
    }
  };
  return (
    <>
      <div>
        <section class="wrapper">
          <section
            class="common-section contact-section text-white"
            id="Country"
          >
            <div class="container text-end common-title fw-bold">
              <h2 class="common-heading text-white">
                Reimbursement Creation{" "}
                <span
                  className="fs-2"
                  onClick={handleCreate}
                  style={{ cursor: "pointer" }}
                >
                  <IoMdAddCircleOutline />
                </span>
              </h2>
            </div>
          </section>
        </section>

        {/* Country Table */}
        <div class="table-agile-info">
          <div class="panel panel-default">
            <div class="panel-heading">Country Table</div>
            <div class="table-responsive">
              <table class="table" width="100">
                <thead>
                  <tr>
                    <th>Reimbursement</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reimbursement.length > 0 ? (
                    reimbursement.map((item) => (
                      <tr key={item.reimbId}>
                        <td>{item.reimbType}</td>
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
                        No Reimbursement found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Create Country Model  */}
      <div>
        {isModalOpenCreate && (
          <>
            <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
              <div className="modal-content w-50 p-3">
                <div className="row">
                  <div class="container text-center common-title fw-bold col-11">
                    <h2 class="common-heading mb-3">Create Reimbursement</h2>
                  </div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-xmark mt-3 me-3 close"
                      onClick={handlecloseCreate}
                    ></i>
                  </div>
                </div>
                <div className="row h-75">
                  <div class="container">
                    <div class="form-section d-flex justify-content-start w-100">
                      <div className="container">
                        <div class="row mb-3">
                          <div class="col-6">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Reimbursement
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="reimbType"
                              placeholder="Enter Country Name"
                              name="reimbType"
                              value={addReimbursement.reimbType}
                              onChange={handleChangeAdd}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-3 d-flex justify-content-center">
                      <button class="btn btn-primary me-3" onClick={handleAdd}>
                        Submit
                      </button>
                      <button
                        class="btn btn-danger me-3"
                        onClick={handlecloseCreate}
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

      {/* Update Country Model */}
      <div>
        {isModalOpenUpdate && (
          <>
            <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
              <div className="modal-content w-50 p-3">
                <div className="row">
                  <div class="container text-center common-title fw-bold col-11">
                    <h2 class="common-heading mb-3">Update Reimbursement</h2>
                  </div>
                  <div className="col-1">
                    <i
                      className="fa-solid fa-xmark mt-3 me-3 close"
                      onClick={handlecloseUpdate}
                    ></i>
                  </div>
                </div>
                <div className="row h-75">
                  <div class="container">
                    <div class="form-section d-flex justify-content-start w-100">
                      <div className="container">
                        <div class="row mb-3">
                          <div class="col-6">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Reimbursement
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="reimbType"
                              name="reimbType"
                              placeholder="Enter Country Name"
                              value={updateReimbursement.reimbType}
                              onChange={handleChangeUpdate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-3 d-flex justify-content-center">
                      <button
                        class="btn btn-primary me-3"
                        onClick={handlUpdate}
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
    </>
  );
};

export default Reimbursement;