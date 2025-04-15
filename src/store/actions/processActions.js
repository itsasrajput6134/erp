import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_PROCESSS_REQUEST = "FETCH_PROCESSS_REQUEST";
const FETCH_PROCESSS_SUCCESS = "FETCH_PROCESSS_SUCCESS";
const FETCH_PROCESSS_FAILURE = "FETCH_PROCESSS_FAILURE";

const ADD_PROCESS_SUCCESS = "ADD_PROCESS_SUCCESS";

const UPDATE_PROCESS_SUCCESS = "UPDATE_PROCESS_SUCCESS";

const DELETE_PROCESS_SUCCESS = "DELETE_PROCESS_SUCCESS";

// Fetch Processs
export const fetchProcesssRequest = () => {
  return { type: FETCH_PROCESSS_REQUEST };
};

export const fetchProcesssSuccess = (processs) => {
  return { type: FETCH_PROCESSS_SUCCESS, payload: processs };
};

export const fetchProcesssFailure = (error) => {
  return { type: FETCH_PROCESSS_FAILURE, payload: error };
};

export const fetchProcesssRdx = () => {
  return async (dispatch) => {
    dispatch(fetchProcesssRequest());
    try {
      const response = await axios.get(endpoints.getAllProcesss, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchProcesssSuccess(data));
    } catch (error) {
      dispatch(fetchProcesssFailure(error.message));
    }
  };
};

// Add Process
export const addProcessSuccess = (process) => {
  return { type: ADD_PROCESS_SUCCESS, payload: process };
};

export const addProcessRdx = (newProcess) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addProcesss, newProcess, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addProcessSuccess(data));
      dispatch(fetchProcesssRdx());
      toast.success("Process added successfully!");
    } catch (error) {
      dispatch(fetchProcesssFailure(error.message));
      toast.error("Failed to add Process.");
    }
  };
};

// Update Process
export const updateProcessSuccess = (process) => {
  return { type: UPDATE_PROCESS_SUCCESS, payload: process };
};

export const updateProcessRdx = (updatedProcess) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateProcesss}/${updatedProcess.id}`,
        updatedProcess,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateProcessSuccess(data));
      dispatch(fetchProcesssRdx());
      toast.success("Process updated successfully!");
    } catch (error) {
      dispatch(fetchProcesssFailure(error.message));
      toast.error("Failed to update Process.");
    }
  };
};

// Delete Process
export const deleteProcessSuccess = (processId) => {
  return { type: DELETE_PROCESS_SUCCESS, payload: processId };
};

export const deleteProcessRdx = (processId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteProcesss}/${processId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteProcessSuccess(processId));
      dispatch(fetchProcesssRdx());
      toast.success("Process deleted successfully!");
    } catch (error) {
      dispatch(fetchProcesssFailure(error.message));
      toast.error("Failed to delete Process.");
    }
  };
};