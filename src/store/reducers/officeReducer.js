const initialState = {
  offices: [],
  officesLoading: false,
  officesError: null,
};

export const officeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_OFFICES_REQUEST":
      return { ...state, officesLoading: true };
    case "FETCH_OFFICES_SUCCESS":
      return { ...state, officesLoading: false, offices: action.payload };
    case "FETCH_OFFICES_FAILURE":
      return { ...state, officesLoading: false, officesError: action.payload };
    case "ADD_OFFICE_SUCCESS":
      return { ...state, offices: [...state.offices, action.payload] };
    case "UPDATE_OFFICE_SUCCESS":
      return {
        ...state,
        offices: state.offices.map((office) =>
          office.officeId === action.payload.officeId ? action.payload : office
        ),
      };
    case "DELETE_OFFICE_SUCCESS":
      return {
        ...state,
        offices: state.offices.filter(
          (office) => office.officeId !== action.payload
        ),
      };
    default:
      return state;
  }
};
