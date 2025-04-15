import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_HOLIDAYS_REQUEST = "FETCH_HOLIDAYS_REQUEST";
const FETCH_HOLIDAYS_SUCCESS = "FETCH_HOLIDAYS_SUCCESS";
const FETCH_HOLIDAYS_FAILURE = "FETCH_HOLIDAYS_FAILURE";

const ADD_HOLIDAY_SUCCESS = "ADD_HOLIDAY_SUCCESS";

const UPDATE_HOLIDAY_SUCCESS = "UPDATE_HOLIDAY_SUCCESS";

const DELETE_HOLIDAY_SUCCESS = "DELETE_HOLIDAY_SUCCESS";

// Fetch Holidays
export const fetchHolidaysRequest = () => {
  return { type: FETCH_HOLIDAYS_REQUEST };
};

export const fetchHolidaysSuccess = (holidays) => {
  return { type: FETCH_HOLIDAYS_SUCCESS, payload: holidays };
};

export const fetchHolidaysFailure = (error) => {
  return { type: FETCH_HOLIDAYS_FAILURE, payload: error };
};

export const fetchHolidaysRdx = () => {
  return async (dispatch) => {
    dispatch(fetchHolidaysRequest());
    try {
      const response = await axios.get(endpoints.getAllHoliday, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchHolidaysSuccess(data));
    } catch (error) {
      dispatch(fetchHolidaysFailure(error.message));
    }
  };
};

// Add Holiday
export const addHolidaySuccess = (holiday) => {
  return { type: ADD_HOLIDAY_SUCCESS, payload: holiday };
};

export const addHolidayRdx = (newHoliday) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addHoliday, newHoliday, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addHolidaySuccess(data));
      dispatch(fetchHolidaysRdx());
      toast.success("Holiday added successfully!");
    } catch (error) {
      dispatch(fetchHolidaysFailure(error.message));
      toast.error("Failed to add Holiday.");
    }
  };
};

// Update Holiday
export const updateHolidaySuccess = (holiday) => {
  return { type: UPDATE_HOLIDAY_SUCCESS, payload: holiday };
};

export const updateHolidayRdx = (updatedHoliday) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateHoliday}/${updatedHoliday.id}`,
        updatedHoliday,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateHolidaySuccess(data));
      dispatch(fetchHolidaysRdx());
      toast.success("Holiday updated successfully!");
    } catch (error) {
      dispatch(fetchHolidaysFailure(error.message));
      toast.error("Failed to update Holiday.");
    }
  };
};

//Delete Holiday
export const deleteHolidaySuccess = (holidayId) => {
  return { type: DELETE_HOLIDAY_SUCCESS, payload: holidayId };
};

export const deleteHolidayRdx = (holidayId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteHoliday}/${holidayId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteHolidaySuccess(holidayId));
      dispatch(fetchHolidaysRdx());
      toast.success("Holiday deleted successfully!");
    } catch (error) {
      dispatch(fetchHolidaysFailure(error.message));
      toast.error("Failed to delete Holiday.");
    }
  };
};
