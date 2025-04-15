// src/store/reducers/holidayReducer.js
const initialState = {
  holidays: [],
  holidayLoading: false,
  holidayError: null,
};

export const holidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HOLIDAYS_REQUEST":
      return { ...state, holidayLoading: true };
    case "FETCH_HOLIDAYS_SUCCESS":
      return { ...state, holidayLoading: false, holidays: action.payload };
    case "FETCH_HOLIDAYS_FAILURE":
      return { ...state, holidayLoading: false, holidayError: action.payload };
    case "ADD_HOLIDAY_SUCCESS":
      return { ...state, holidays: [...state.holidays, action.payload] };
    case "UPDATE_HOLIDAY_SUCCESS":
      return {
        ...state,
        holidays: state.holidays.map((holiday) =>
          holiday.holidayId === action.payload.holidayId
            ? action.payload
            : holiday
        ),
      };
    case "DELETE_HOLIDAY_SUCCESS":
      return {
        ...state,
        holidays: state.holidays.filter(
          (holiday) => holiday.holidayId !== action.payload
        ),
      };
    default:
      return state;
  }
};
