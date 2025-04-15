import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import toast from "react-hot-toast";

const EmpAttendance = () => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selfAttendance, setSelfAttendance] = useState({
    employeeEmail: localStorage.getItem("username"),
    date: "",
    hours: "",
  });

  useEffect(() => {
    const today = new Date();
  
    // Calculate seven days before the current date
    const sevenDaysBefore = new Date(today);
    sevenDaysBefore.setDate(today.getDate() - 7);
    const formattedMinDate = sevenDaysBefore.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  
    // Set maxDate to today
    const formattedMaxDate = today.toISOString().split("T")[0];
  
    setMinDate(formattedMinDate);
    setMaxDate(formattedMaxDate);
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfAttendance((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        endpoints.markAttendance,
        selfAttendance,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      toast.success("Attendance Marked successfully!");
      setSelfAttendance({
        employeeEmail: localStorage.getItem("username"),
        date: "",
        hours: "",
      });
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
      toast.error("Error while marking Attendance");
    }
  };

  return (
    <div>
      <section class="wrapper">
        <section>
          <div class="container text-center common-title fw-bold">
            <h2 class="common-heading text-white">Attendance Mark</h2>
            <hr class="w-50 mx-auto text-white" />
          </div>

          <div class="container">
            <div class="form-section d-flex justify-content-start w-100 text-white">
              <div className="container">                   
                <div class="row mb-3">                     
                  <div class="col-6 col-md-4">               
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="date"
                      name="date"
                      placeholder="date"
                      value={selfAttendance.date}
                      min={minDate}
                      max={maxDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Time slab
                    </label>
                    <select
                      id="hours"
                      name="hours"
                      class="form-select"
                      value={selfAttendance.hours}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select Mode
                      </option>
                      <option value="4">Half Day</option>
                      <option value="8">Full Day</option>
                      {/* <option value="0">Leave</option> */}
                    </select>
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Employee Official Email
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="employeeEmail"
                      name="employeeEmail"
                      placeholder="employeeEmail"
                      value={localStorage.getItem("username")}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button className="btn btn-danger me-3">Reset</button>
              <button className="btn btn-primary me-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default EmpAttendance;