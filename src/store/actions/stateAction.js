import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_STATES_REQUEST = "FETCH_STATES_REQUEST";
const FETCH_STATES_SUCCESS = "FETCH_STATES_SUCCESS";
const FETCH_STATES_FAILURE = "FETCH_STATES_FAILURE";

const ADD_STATE_SUCCESS = "ADD_STATE_SUCCESS";

const UPDATE_STATE_SUCCESS = "UPDATE_STATE_SUCCESS";

const DELETE_STATE_SUCCESS = "DELETE_STATE_SUCCESS";

// Fetch States
export const fetchStatesRequest = () => {
  return { type: FETCH_STATES_REQUEST };
};

export const fetchStatesSuccess = (states) => {
  return { type: FETCH_STATES_SUCCESS, payload: states };
};

export const fetchStatesFailure = (error) => {
  return { type: FETCH_STATES_FAILURE, payload: error };
};

export const fetchStatesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchStatesRequest());
    try {
      const response = await axios.get(endpoints.getAllState, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchStatesSuccess(data));
    } catch (error) {
      dispatch(fetchStatesFailure(error.message));
    }
  };
};

// Add State
export const addStateSuccess = (state) => {
  return { type: ADD_STATE_SUCCESS, payload: state };
};

export const addStateRdx = (newState) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addState, newState, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addStateSuccess(data));
      dispatch(fetchStatesRdx());
      toast.success("State added successfully!");
    } catch (error) {
      dispatch(fetchStatesFailure(error.message));
      toast.error("Failed to add State.");
    }
  };
};

// Update State

export const updateStateSuccess = (state) => {
  return { type: UPDATE_STATE_SUCCESS, payload: state };
};

export const updateStateRdx = (updatedState) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateState}/${updatedState.stateId}`,
        updatedState,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateStateSuccess(data));
      dispatch(fetchStatesRdx());
      toast.success("State updated successfully!");
    } catch (error) {
      dispatch(fetchStatesFailure(error.message));
      toast.error("Failed to update state.");
    }
  };
};

//Delete Country
export const deleteStateSuccess = (stateId) => {
  return { type: DELETE_STATE_SUCCESS, payload: stateId };
};

export const deleteStateRdx = (stateId) => {
  console.log(stateId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteState}/${stateId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteStateSuccess(stateId));
      dispatch(fetchStatesRdx());
      toast.success("State deleted successfully!");
    } catch (error) {
      dispatch(fetchStatesFailure(error.message));
      toast.error("Failed to delete country.");
    }
  };
};
