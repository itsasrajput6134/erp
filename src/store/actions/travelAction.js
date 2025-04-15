import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";


// Action Types
const FETCH_TRAVELS_REQUEST = "FETCH_TRAVELS_REQUEST";
const FETCH_TRAVELS_SUCCESS = "FETCH_TRAVELS_SUCCESS";
const FETCH_TRAVELS_FAILURE = "FETCH_TRAVELS_FAILURE";

const ADD_TRAVEL_SUCCESS = "ADD_TRAVEL_SUCCESS";

const UPDATE_TRAVEL_SUCCESS = "UPDATE_TRAVEL_SUCCESS";

const DELETE_TRAVEL_SUCCESS = "DELETE_TRAVEL_SUCCESS";


// Fetch All Travels
export const fetchTravelsRequest = () => {
  return { type: FETCH_TRAVELS_REQUEST };
};

export const fetchTravelsSuccess = (travels) => {
  return { type: FETCH_TRAVELS_SUCCESS, payload: travels };
};

export const fetchTravelsFailure = (error) => {
  return { type: FETCH_TRAVELS_FAILURE, payload: error };
};

export const fetchTravelsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchTravelsRequest());
    try {
      const response = await axios.get(endpoints.getAllTravels, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchTravelsSuccess(data));
    } catch (error) {
      dispatch(fetchTravelsFailure(error.message));
    }
  };
};

// Add Travels
export const addTravelSuccess = (travel) => {
  return { type: ADD_TRAVEL_SUCCESS, payload: travel };
};

export const addTravelRdx = (newTravel) => {
  return async (dispatch) => {
    try {
      console.log(endpoints.addTravels, newTravel);
      const response = await axios.post(endpoints.addTravels, newTravel, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addTravelSuccess(data));
      dispatch(fetchTravelsRdx());
      toast.success("Travel added successfully!");
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(fetchTravelsFailure(error.message));
      toast.error(error.response.data.message);
    }
  };
};

// Update Travels
export const updateTravelSuccess = (travel) => {
  return { type: UPDATE_TRAVEL_SUCCESS, payload: travel };
};

export const updateTravelRdx = (updatedTravel) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.UpdateTravelByGenId}/${updatedTravel.travelGenId}`,
        updatedTravel,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      dispatch(updateTravelSuccess(data));
      toast.success("Travel updated successfully!");
    } catch (error) {
      dispatch(fetchTravelsFailure(error.message));
      toast.error(error.response.data.message);
    }
  };
};

// Delete Travel
export const deleteTravelSuccess = (travelId) => {
  return { type: DELETE_TRAVEL_SUCCESS, payload: travelId };
};

export const deleteTravelRdx = (travelId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.DeleteTravelByGenId}/${travelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteTravelSuccess(travelId));
      toast.success("Travel deleted successfully!");
    } catch (error) {
      dispatch(fetchTravelsFailure(error.message));
      toast.error("Failed to delete Travel.");
    }
  };
};