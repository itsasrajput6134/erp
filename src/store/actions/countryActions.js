import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_COUNTRIES_REQUEST = "FETCH_COUNTRIES_REQUEST";
const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
const FETCH_COUNTRIES_FAILURE = "FETCH_COUNTRIES_FAILURE";

const ADD_COUNTRY_SUCCESS = "ADD_COUNTRY_SUCCESS";

const UPDATE_COUNTRY_SUCCESS = "UPDATE_COUNTRY_SUCCESS";

const DELETE_COUNTRY_SUCCESS = "DELETE_COUNTRY_SUCCESS";

// Fetch Countries
export const fetchCountriesRequest = () => {
  return { type: FETCH_COUNTRIES_REQUEST };
};

export const fetchCountriesSuccess = (countries) => {
  return { type: FETCH_COUNTRIES_SUCCESS, payload: countries };
};

export const fetchCountriesFailure = (error) => {
  return { type: FETCH_COUNTRIES_FAILURE, payload: error };
};

export const fetchCountriesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchCountriesRequest());
    try {
      const response = await axios.get(endpoints.getAllCountry, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchCountriesSuccess(data));
    } catch (error) {
      dispatch(fetchCountriesFailure(error.message));
    }
  };
};

// Add Country

export const addCountrySuccess = (country) => {
  return { type: ADD_COUNTRY_SUCCESS, payload: country };
};

export const addCountryRdx = (newCountry) => {
  return async (dispatch) => {
    try {
      
      const response = await axios.post(endpoints.addCountry, newCountry, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addCountrySuccess(data));
      dispatch(fetchCountriesRdx());
      toast.success("Country added successfully!");
    } catch (error) {
      dispatch(fetchCountriesFailure(error.message));
      toast.error("Failed to add country.");
    }
  };
};

// Update Country
export const updateCountrySuccess = (country) => {
  return { type: UPDATE_COUNTRY_SUCCESS, payload: country };
};

export const updateCountryRdx = (updatedCountry) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateCountry}/${updatedCountry.countryId}`,
        updatedCountry,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateCountrySuccess(data));
      dispatch(fetchCountriesRdx());
      toast.success("Country updated successfully!");
    } catch (error) {
      dispatch(fetchCountriesFailure(error.message));
      toast.error("Failed to update country.");
    }
  };
};

//Delete Country
export const deleteCountrySuccess = (countryId) => {
  return { type: DELETE_COUNTRY_SUCCESS, payload: countryId };
};

export const deleteCountryRdx = (countryId) => {
    console.log(countryId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteCountry}/${countryId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteCountrySuccess(countryId));
      dispatch(fetchCountriesRdx());
      toast.success("Country deleted successfully!");
    } catch (error) {
      dispatch(fetchCountriesFailure(error.message));
      toast.error("Failed to delete country.");
    }
  };
};
