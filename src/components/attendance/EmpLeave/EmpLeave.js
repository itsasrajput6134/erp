import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../../ApiEndpoint";
import toast from "react-hot-toast";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { fetchEmployeesActiveRdx } from "../../../store/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const EmpLeave = () => {
  const dispatch = useDispatch();
  const [minDate, setMinDate] = useState("");
  const [adminEmployee, setAdminEmployee] = useState([]);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [remainingLeave, setRemainingLeave] = useState(null);
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );

  const [selfLeave, setSelfLeave] = useState({
    employeeEmail: localStorage.getItem("username"),
    leaveDates: [],
    leaveType: "",
    currentRole:"",
    processType: "Leave_Process"
  });

  useEffect(() => {
    dispatch(fetchEmployeesActiveRdx());
    fetchRemaingLeave();
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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfLeave((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDateChange = (dates) => {
    setSelfLeave((prevDetails) => ({
      ...prevDetails,
      leaveDates: dates.map((date) => date.format("YYYY-MM-DD")),
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelfLeave({
      employeeEmail: localStorage.getItem("username"),
      leaveDates: [],
      leaveType: "",
      currentRole:"",
      processType: "Leave_Process"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(selfLeave);
      console.log(endpoints.applyLeave);
      
      const response = await axios.post(endpoints.applyLeave, selfLeave, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      toast.success("Leave applied successfully!");
      setSelfLeave({
        employeeEmail: localStorage.getItem("username"),
        leaveDates: [],
        leaveType: "",
        currentRole:"",
        processType: "Leave_Process"

      });
      fetchRemaingLeave();
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
      toast.error(error.response?.data?.message || "Unknown error");
    }
  };

  async function fetchRemaingLeave() {
    try {
      const currentYear = new Date().getFullYear();
      const username = localStorage.getItem("username");      
      const response = await axios.get(
        `${endpoints.getAllRemainingLeavesByYear}?employeeEmail=${username}&year=${currentYear}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data);
      if (!Array.isArray(data)) {
        setRemainingLeave([data]);
      } else {
        setRemainingLeave(data);
      }
      setLeaveLoading(false);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
      toast.error(error.response?.data?.message);
      setLeaveLoading(false);
    }
  }

  // Disable all Saturdays, Sundays, and past dates
  const disableDate = (date) => {
    console.log(date);
    
    const day = date.weekDay.index; 
    const today = new DateObject(); 
    return day === 0 || day === 6 || date.isBefore(today);
  };

  return (
    <div>
      <section class="wrapper">
        <section>
          <div class="container text-center common-title fw-bold">
            <h2 class="common-heading text-white">Apply Leave</h2>
            <hr class="w-50 mx-auto text-white" />
          </div>

          <div class="container">
            <div class="form-section d-flex justify-content-start w-100 text-white">
              <div className="container">
                <div class="row mb-3">
                  <div class="col-6 col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Select Date
                    </label>
                    <div>
                      <DatePicker
                        multiple
                        value={selfLeave.leaveDates}
                        onChange={handleDateChange}
                        className="form-control"
                        id="date"
                        name="date"
                        style={{ height: "2.3rem" }}
                        disable={disableDate}
                      />
                    </div>
                  </div>
                  <div class="col-6 col-lg-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Leave Type
                    </label>
                    <select
                      id="leaveType"
                      name="leaveType"
                      class="form-select"
                      value={selfLeave.leaveType}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select Mode
                      </option>
                      <option value="SICK">Sick</option>
                      <option value="CASUAL">CL</option>
                      <option value="EARNED">EL</option>
                    </select>
                  </div>
                  <div class="col-6 col-lg-3">
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
                  <div class="col-6 col-lg-3">
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
                      value={selfLeave.currentRole}
                      onChange={handleChange}
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
                </div>
              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button className="btn btn-danger me-3" onClick={handleReset}>Reset</button>
              <button className="btn btn-primary me-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </section>
        <section>
          <div class="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
            <div class="p-4 overflow-x-auto border border-gray-800 rounded-lg">
              <div class="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">REMANINIG LEAVE</div>
              <div class="table-responsive">
                <table className="w-full text-lg text-gray-300">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Year</th>
                      <th className="px-4 py-2 text-left">Casual Leave Balance</th>
                      <th className="px-4 py-2 text-left">Earned Leave Balance</th>
                      <th className="px-4 py-2 text-left">Sick Leave Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {leaveLoading ? (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : remainingLeave && remainingLeave?.length > 0 ? (
                      remainingLeave.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-800 transition">
                          <td className="px-4 py-2">{item.year}</td>
                          <td className="px-4 py-2">{item.casualLeaveBalance}</td>
                          <td className="px-4 py-2">{item.earnedLeaveBalance}</td>
                          <td className="px-4 py-2">{item.sickLeaveBalance}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-4">
                          No Leave found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default EmpLeave;
