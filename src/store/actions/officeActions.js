import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_OFFICES_REQUEST = "FETCH_OFFICES_REQUEST";
const FETCH_OFFICES_SUCCESS = "FETCH_OFFICES_SUCCESS";
const FETCH_OFFICES_FAILURE = "FETCH_OFFICES_FAILURE";

const ADD_OFFICE_SUCCESS = "ADD_OFFICE_SUCCESS";

const UPDATE_OFFICE_SUCCESS = "UPDATE_OFFICE_SUCCESS";

const DELETE_OFFICE_SUCCESS = "DELETE_OFFICE_SUCCESS";

// Fetch OFFICEs
export const fetchOfficesRequest = () => {
  return { type: FETCH_OFFICES_REQUEST };
};

export const fetchOfficesSuccess = (Offices) => {
  return { type: FETCH_OFFICES_SUCCESS, payload: Offices };
};

export const fetchOfficesFailure = (error) => {
  return { type: FETCH_OFFICES_FAILURE, payload: error };
};

export const fetchOfficesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchOfficesRequest());
    try {
      const response = await axios.get(endpoints.getAllOffice, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchOfficesSuccess(data));
    } catch (error) {
      dispatch(fetchOfficesFailure(error.message));
    }
  };
};

// Add State
export const addOfficeSuccess = (office) => {
  return { type: ADD_OFFICE_SUCCESS, payload: office };
};

export const addofficeRdx = (newoffice) => {
  return async (dispatch) => {
    try {
      console.log(endpoints.addOffice, newoffice);
      
      const response = await axios.post(endpoints.addOffice, newoffice, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addOfficeSuccess(data));
      dispatch(fetchOfficesRdx());
      toast.success("Office added successfully!");
    } catch (error) {
      dispatch(fetchOfficesFailure(error.message));
      toast.error("Failed to add Office.");
    }
  };
};

// Update State
export const updateofficeSuccess = (office) => {
  return { type: UPDATE_OFFICE_SUCCESS, payload: office };
};

export const updateofficeRdx = (updatedoffice) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateOffice}/${updatedoffice.officeId}`,
        updatedoffice,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateofficeSuccess(data));
      dispatch(fetchOfficesRdx());
      toast.success("Office updated successfully!");
    } catch (error) {
      dispatch(fetchOfficesFailure(error.message));
      toast.error("Failed to update office.");
    }
  };
};

//Delete Country
export const deleteOfficeSuccess = (officeId) => {
  return { type: DELETE_OFFICE_SUCCESS, payload: officeId };
};

export const deleteOfficeRdx = (officeId) => {
  console.log(officeId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteOffice}/${officeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteOfficeSuccess(officeId));
      dispatch(fetchOfficesRdx());
      toast.success("Offfice deleted successfully!");
    } catch (error) {
      dispatch(fetchOfficesFailure(error.message));
      toast.error("Failed to delete Office.");
    }
  };
};
