// src/store/reducers/ticketReducer.js
const initialState = {
    tickets: [],
    ticketLoading: false,
    ticketError: null,
  };
  
  export const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TICKETS_REQUEST":
        return { ...state, ticketLoading: true };
      case "FETCH_TICKETS_SUCCESS":
        return { ...state, ticketLoading: false, tickets: action.payload };
      case "FETCH_TICKETS_FAILURE":
        return { ...state, ticketLoading: false, ticketError: action.payload };
      case "ADD_TICKET_SUCCESS":
        return { ...state, tickets: [...state.tickets, action.payload] };
      case "UPDATE_TICKET_SUCCESS":
        return {
          ...state,
          tickets: state.tickets.map((ticket) =>
            ticket.ticketId === action.payload.ticketId
              ? action.payload
              : ticket
          ),
        };
      case "DELETE_TICKET_SUCCESS":
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.ticketId !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  