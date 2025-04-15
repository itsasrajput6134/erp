import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_DEPARTMENTS_REQUEST = "FETCH_DEPARTMENTS_REQUEST";
const FETCH_DEPARTMENTS_SUCCESS = "FETCH_DEPARTMENTS_SUCCESS";
const FETCH_DEPARTMENTS_FAILURE = "FETCH_DEPARTMENTS_FAILURE";

const ADD_DEPARTMENT_SUCCESS = "ADD_DEPARTMENT_SUCCESS";

const UPDATE_DEPARTMENT_SUCCESS = "UPDATE_DEPARTMENT_SUCCESS";

const DELETE_DEPARTMENT_SUCCESS = "DELETE_DEPARTMENT_SUCCESS";

// Fetch DEPARTMET
export const fetchDepartmentsRequest = () => {
  return { type: FETCH_DEPARTMENTS_REQUEST };
};

export const fetchDepartmentsSuccess = (departments) => {
  return { type: FETCH_DEPARTMENTS_SUCCESS, payload: departments };
};

export const fetchDepartmentsFailure = (error) => {
  return { type: FETCH_DEPARTMENTS_FAILURE, payload: error };
};

export const fetchDepartmentsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchDepartmentsRequest());
    try {
      const response = await axios.get(endpoints.getAllDepartment, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchDepartmentsSuccess(data));
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
    }
  };
};

// Add State
export const addDepartmentSuccess = (department) => {
  return { type: ADD_DEPARTMENT_SUCCESS, payload: department };
};                                       

export const adddepartmentRdx = (newdepartment) => {
  return async (dispatch) => {    
    try {
      console.log(endpoints.addDepartment, newdepartment);
      
      const response = await axios.post(endpoints.addDepartment, newdepartment, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(addDepartmentSuccess(data));
      dispatch(fetchDepartmentsRdx());
      toast.success("Departments added successfully!");
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
      toast.error("Failed to add Office.");
    }
  };
};

// Update State
export const updatedepartmentSuccess = (department) => {
  return { type: UPDATE_DEPARTMENT_SUCCESS, payload: department };
};

export const updatedepartmentRdx = (updatedDepartment) => {
  return async (dispatch) => {                          
    try {
      const response = await axios.put(               
        `${endpoints.updateDepartment}/${updatedDepartment.departmentId}`,
        updatedDepartment,                             
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updatedepartmentSuccess(data));
      dispatch(fetchDepartmentsRdx());
      toast.success("Department updated successfully!");
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
      toast.error("Failed to update Departments.");
    }
  };
};

//Delete Country
export const deleteDepartmentSuccess = (departmentId) => {        
  return { type: DELETE_DEPARTMENT_SUCCESS, payload: departmentId };
};

export const deleteDepartmentRdx = (departmentId) => {
  console.log(departmentId);
  return async (dispatch) => {
    console.log(`${endpoints.deleteDepartment}/${departmentId}`);
    
    try {
      await axios.delete(`${endpoints.deleteDepartment}/${departmentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteDepartmentSuccess(departmentId));
      dispatch(fetchDepartmentsRdx());
      toast.success("Departments deleted successfully!");
    } catch (error) {
      dispatch(fetchDepartmentsFailure(error.message));
      toast.error("Failed to delete Departments.");
    }
  };
};
