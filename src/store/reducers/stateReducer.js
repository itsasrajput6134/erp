const initialState = {
  states: [],
  statesLoading: false,
  statesError: null,
};

export const stateReducer = (state = initialState, action) => {

  switch (action.type) {
    case "FETCH_STATES_REQUEST":
      return { ...state, statesLoading: true };
    case "FETCH_STATES_SUCCESS":
      return { ...state, statesLoading: false, states: action.payload };
    case "FETCH_STATES_FAILURE":
      return { ...state, statesLoading: false, statesError: action.payload };
    case "ADD_STATE_SUCCESS":
      return { ...state, states: [...state.states, action.payload] };
    case "UPDATE_STATE_SUCCESS":
      return {
        ...state,
        states: state.states.map((state) =>
          state.stateId === action.payload.stateId ? action.payload : state
        ),
      };
    case "DELETE_STATE_SUCCESS":
      return {
        ...state,
        states: state.states.filter(
          (state) => state.stateId !== action.payload
        ),
      };
    default:
      return state;
  }
};
