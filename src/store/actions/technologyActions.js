// src/store/actions/countryActions.js
import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_TECHNOLOGIES_REQUEST = "FETCH_TECHNOLOGIES_REQUEST";
const FETCH_TECHNOLOGIES_SUCCESS = "FETCH_TECHNOLOGIES_SUCCESS";
const FETCH_TECHNOLOGIES_FAILURE = "FETCH_TECHNOLOGIES_FAILURE";

const ADD_TECHNOLOGY_SUCCESS = "ADD_TECHNOLOGY_SUCCESS";

const UPDATE_TECHNOLOGY_SUCCESS = "UPDATE_TECHNOLOGY_SUCCESS";

const DELETE_TECHNOLOGY_SUCCESS = "DELETE_TECHNOLOGY_SUCCESS";

// Fetch Countries
export const fetchTechnologiesRequest = () => {
  return { type: FETCH_TECHNOLOGIES_REQUEST };
};

export const fetchTechnologiesSuccess = (technologies) => {
  return { type: FETCH_TECHNOLOGIES_SUCCESS, payload: technologies };
};

export const fetchTechnologiesFailure = (error) => {
  return { type: FETCH_TECHNOLOGIES_FAILURE, payload: error };
};

export const fetchTechnologiesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchTechnologiesRequest());
    try {
      const response = await axios.get(endpoints.getAllTechnology, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchTechnologiesSuccess(data));
    } catch (error) {
      dispatch(fetchTechnologiesFailure(error.message));
    }
  };
};

// Add Technology

export const addTechnologySuccess = (technology) => {
  return { type: ADD_TECHNOLOGY_SUCCESS, payload: technology };
};

export const addTechnologyRdx = (newTechnology) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addTechnology, newTechnology, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addTechnologySuccess(data));
      dispatch(fetchTechnologiesRdx());
      toast.success("Country added successfully!");
    } catch (error) {
      dispatch(fetchTechnologiesFailure(error.message));
      toast.error("Failed to add country.");
    }
  };
};

// Update Country

export const updateTechnologySuccess = (technology) => {
  return { type: UPDATE_TECHNOLOGY_SUCCESS, payload: technology };
};

export const updateTechnologyRdx = (updatedTechnology) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateTechnology}/${updatedTechnology.techId}`,
        updatedTechnology,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateTechnologySuccess(data));
      dispatch(fetchTechnologiesRdx());
      toast.success("Technology updated successfully!");
    } catch (error) {
      dispatch(fetchTechnologiesFailure(error.message));
      toast.error("Failed to update Technology.");
    }
  };
};

//Delete Country
export const deleteTechnologySuccess = (techId) => {
  return { type: DELETE_TECHNOLOGY_SUCCESS, payload: techId };
};

export const deleteTechnologyRdx = (techId) => {
    console.log(techId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteTechnology}/${techId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteTechnologySuccess(techId));
      dispatch(fetchTechnologiesRdx());
      toast.success("Technology deleted successfully!");
    } catch (error) {
      dispatch(fetchTechnologiesFailure(error.message));
      toast.error("Failed to delete Technology.");
    }
  };
};
