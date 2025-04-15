// src/store/reducers/countryReducer.js
const initialState = {
    travels: [],
    travelsLoading: false,
    travelsError: null,
  };
  
  export const travelReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TRAVELS_REQUEST":
        return { ...state, travelsLoading: true };
      case "FETCH_TRAVELS_SUCCESS":
        return { ...state, travelsLoading: false, travels: action.payload };
      case "FETCH_TRAVELS_FAILURE":
        return { ...state, travelsLoading: false, travelsError: action.payload };
      case "ADD_TRAVEL_SUCCESS":
        return { ...state, travels: [...state.travels, action.payload] };
      case "UPDATE_TRAVEL_SUCCESS":
        return {
          ...state,
          travels: state.travels.map((travel) =>
            travel.travelId === action.payload.travelId
              ? action.payload
              : travel
          ),
        };
      case "DELETE_TRAVEL_SUCCESS":
        return {
          ...state,
          travels: state.travels.filter(
            (travel) => travel.travelId !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  