// src/store/reducers/countryReducer.js
const initialState = {
    clients: [],
    clientsLoading: false,
    clientsError: null,
  };
  
  export const clientReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CLIENTS_REQUEST":
        return { ...state, clientsLoading: true };
      case "FETCH_CLIENTS_SUCCESS":
        return { ...state, clientsLoading: false, clients: action.payload };
      case "FETCH_CLIENTS_FAILURE":
        return { ...state, clientsLoading: false, clientsError: action.payload };
      case "ADD_COUNTRY_SUCCESS":
        return { ...state, clients: [...state.clients, action.payload] };
      case "UPDATE_COUNTRY_SUCCESS":
        return {
          ...state,
          clients: state.clients.map((client) =>
            client.clientId === action.payload.clientId
              ? action.payload
              : client
          ),
        };
      case "DELETE_COUNTRY_SUCCESS":
        return {
          ...state,
          clients: state.clients.filter(
            (client) => client.clientId !== action.payload
          ),
        };
      default:
        return state;
    }
  };