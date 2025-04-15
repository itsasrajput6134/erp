import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_EMPLOYEES_REQUEST = "FETCH_EMPLOYEES_REQUEST";
const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS";
const FETCH_EMPLOYEES_FAILURE = "FETCH_EMPLOYEES_FAILURE";

const FETCH_EMPLOYEES_REQUEST_ACTIVE = "FETCH_EMPLOYEES_REQUEST_ACTIVE";
const FETCH_EMPLOYEES_SUCCESS_ACTIVE = "FETCH_EMPLOYEES_SUCCESS_ACTIVE";
const FETCH_EMPLOYEES_FAILURE_ACTIVE = "FETCH_EMPLOYEES_ FAILURE_ACTIVE";

const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";

const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";

const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";

//Fetch Active Employee
export const fetchEmployeesRequestActive = () => {
  return { type: FETCH_EMPLOYEES_REQUEST_ACTIVE };
};

export const fetchEmployeesSuccessActive = (employees) => {
  return { type: FETCH_EMPLOYEES_SUCCESS_ACTIVE, payload: employees };
};

export const fetchEmployeesFailureActive = (error) => {
  return { type: FETCH_EMPLOYEES_FAILURE_ACTIVE, payload: error };
};

export const fetchEmployeesActiveRdx = (Active) => {
  return async (dispatch) => {
    dispatch(fetchEmployeesRequestActive());
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(endpoints.getAllEmployeeActive, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchEmployeesSuccessActive(data));
    } catch (error) {
      dispatch(fetchEmployeesFailureActive(error.message));
    }
  };
};


// Fetch All Employees
export const fetchEmployeesRequest = () => {
  return { type: FETCH_EMPLOYEES_REQUEST };
};

export const fetchEmployeesSuccess = (employees) => {
  return { type: FETCH_EMPLOYEES_SUCCESS, payload: employees };
};

export const fetchEmployeesFailure = (error) => {
  return { type: FETCH_EMPLOYEES_FAILURE, payload: error };
};

export const fetchEmployeesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchEmployeesRequest());
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(endpoints.getAllEmployee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = await response.data;
      
      dispatch(fetchEmployeesSuccess(data));
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
    }
  };
};

// Add State
export const addemployeeSuccess = (employee) => {
  return { type: ADD_EMPLOYEE_SUCCESS, payload: employee };
};

export const addemployeeRdx = (newemployee) => {
  return async (dispatch) => {
    try {            
      const token = localStorage.getItem("token");
      console.log(token, newemployee);
      const response = await axios.post(endpoints.addEmployee, newemployee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addemployeeSuccess(data));
      dispatch(fetchEmployeesRdx());
      toast.success("employee added successfully!");
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
      toast.error("Failed to add employee.");
    }
  };
};

// Update State
export const updateemployeeSuccess = (employee) => {
  return { type: UPDATE_EMPLOYEE_SUCCESS, payload: employee };
};

export const updateemployeeRdx = (updatedemployee) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log(updatedemployee);
      console.log(`${endpoints.updateEmployee}/${updatedemployee.userId}`);
      const response = await axios.put(
        `${endpoints.updateEmployee}/${updatedemployee.userId}`,
        updatedemployee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateemployeeSuccess(data));
      dispatch(fetchEmployeesRdx());
      toast.success("employee updated successfully!");
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
      toast.error("Failed to update employee.");
    }
  };
};

//Delete Country
export const deleteEmployeeSuccess = (userId) => {
  return { type: DELETE_EMPLOYEE_SUCCESS, payload: userId };
};

export const deleteEmployeeRdx = (userId) => {
  console.log(userId);
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoints.deleteProject}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      dispatch(deleteEmployeeSuccess(userId));
      dispatch(fetchEmployeesRdx());
      toast.success("Employee deleted successfully!");
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.message));
      toast.error("Failed to delete Employee.");
    }
  };
};
