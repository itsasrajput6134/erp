// src/store/reducers/countryReducer.js
const initialState = {
    technologies: [],
    technologiesLoading: false,
    technologiesError: null,
  };
  
  export const technologyReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TECHNOLOGIES_REQUEST":
        return { ...state, technologiesLoading: true };
      case "FETCH_TECHNOLOGIES_SUCCESS":
        return { ...state, technologiesLoading: false, technologies: action.payload };
      case "FETCH_TECHNOLOGIES_FAILURE":
        return { ...state, technologiesLoading: false, technologiesError: action.payload };
      case "ADD_TECHNOLOGY_SUCCESS":
        return { ...state, technologies: [...state.technologies, action.payload] };
      case "UPDATE_TECHNOLOGY_SUCCESS":
        return {
          ...state,
          technologies: state.technologies.map((technology) =>
            technology.techId === action.payload.techId
              ? action.payload
              : technology
          ),
        };
      case "DELETE_TECHNOLOGY_SUCCESS":
        return {
          ...state,
          technologies: state.technologies.filter(
            (technology) => technology.techId !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  