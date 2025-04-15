import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_TICKETS_REQUEST = "FETCH_TICKETS_REQUEST";
const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";

const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS";

const UPDATE_TICKET_SUCCESS = "UPDATE_TICKET_SUCCESS";

const DELETE_TICKET_SUCCESS = "DELETE_TICKET_SUCCESS";

// Fetch Tickets
export const fetchTicketsRequest = () => {
  return { type: FETCH_TICKETS_REQUEST };
};

export const fetchTicketsSuccess = (tickets) => {
  return { type: FETCH_TICKETS_SUCCESS, payload: tickets };
};

export const fetchTicketsFailure = (error) => {
  return { type: FETCH_TICKETS_FAILURE, payload: error };
};

export const fetchTicketsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchTicketsRequest());
    try {
      const response = await axios.get(endpoints.getAllTicket, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;      
      dispatch(fetchTicketsSuccess(data));
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
    }
  };
};

// Add Ticket

export const addTicketSuccess = (ticket) => {
  return { type: ADD_TICKET_SUCCESS, payload: ticket };
};

export const addTicketRdx = (newTicket) => {
  return async (dispatch) => {
    try {
      console.log(endpoints.postTicket, newTicket);
      
      const response = await axios.post(endpoints.postTicket, newTicket, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addTicketSuccess(data));
      dispatch(fetchTicketsRdx());
      toast.success("Ticket added successfully!");
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
      toast.error("Failed to add Ticket.");
    }
  };
};

// Update Ticket
export const updateTicketSuccess = (ticket) => {
  return { type: UPDATE_TICKET_SUCCESS, payload: ticket };
};

export const updateTicketRdx = (updatedTicket, ticket) => {
  return async (dispatch) => {
    console.log(`${endpoints.putTicket}/${ticket.travelGenId}`, updatedTicket);
    let travelGenId=ticket.travelGenId
    try {
      const response = await axios.put(
        `${endpoints.putTicket}/${travelGenId}`,
        updatedTicket,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateTicketSuccess(data));
      dispatch(fetchTicketsRdx());
      toast.success("Ticket updated successfully!");
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
      toast.error("Failed to update ticket.");
    }
  };
};

//Delete Ticket
export const deleteTicketSuccess = (ticketId) => {
  return { type: DELETE_TICKET_SUCCESS, payload: ticketId };
};

export const deleteTicketRdx = (ticketId) => {
    console.log(ticketId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteTicket}/${ticketId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteTicketSuccess(ticketId));
      dispatch(fetchTicketsRdx());
      toast.success("Ticket deleted successfully!");
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
      toast.error("Failed to delete Ticket.");
    }
  };
};
