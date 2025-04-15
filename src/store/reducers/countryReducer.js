// src/store/reducers/countryReducer.js
const initialState = {
  countries: [],
  countryLoading: false,
  CountryError: null,
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COUNTRIES_REQUEST":
      return { ...state, countryLoading: true };
    case "FETCH_COUNTRIES_SUCCESS":
      return { ...state, countryLoading: false, countries: action.payload };
    case "FETCH_COUNTRIES_FAILURE":
      return { ...state, countryLoading: false, CountryError: action.payload };
    case "ADD_COUNTRY_SUCCESS":
      return { ...state, countries: [...state.countries, action.payload] };
    case "UPDATE_COUNTRY_SUCCESS":
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.countryId === action.payload.countryId
            ? action.payload
            : country
        ),
      };
    case "DELETE_COUNTRY_SUCCESS":
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.countryId !== action.payload
        ),
      };
    default:
      return state;
  }
};
