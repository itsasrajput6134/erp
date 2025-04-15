import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_CLIENTS_REQUEST = "FETCH_CLIENTS_REQUEST";
const FETCH_CLIENTS_SUCCESS = "FETCH_CLIENTS_SUCCESS";
const FETCH_CLIENTS_FAILURE = "FETCH_CLIENTS_FAILURE";

const ADD_CLIENT_SUCCESS = "ADD_CLIENT_SUCCESS";

const UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS";

const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";

// Fetch Countries
export const fetchClientsRequest = () => {
  return { type: FETCH_CLIENTS_REQUEST };
};

export const fetchClientsSuccess = (Clients) => {
  return { type: FETCH_CLIENTS_SUCCESS, payload: Clients };
};

export const fetchClientsFailure = (error) => {
  return { type: FETCH_CLIENTS_FAILURE, payload: error };
};

export const fetchClientsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchClientsRequest());                           
    try {
      const response = await axios.get(endpoints.getAllClients, {
        headers: {
          "Content-Type": "application/json",                    
        },                                      
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchClientsSuccess(data));                      
    } catch (error) {
      dispatch(fetchClientsFailure(error.message));
    }
  };
};

// Add Country

export const addClientSuccess = (client) => {
  return { type: ADD_CLIENT_SUCCESS, payload: client };
};

export const addClientRdx = (newClient) => {
  console.log(newClient, endpoints.addClients, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  return async (dispatch) => {
    try {
      
      const response = await axios.post(endpoints.addClients, newClient, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.message);
      const data = response.data;
      dispatch(addClientSuccess(data));
      dispatch(fetchClientsRdx());
      toast.success("Client added successfully!");
    } catch (error) {
      dispatch(fetchClientsFailure(error.message));
      toast.error(error.response.data.message);
    }
  };
};

// Update Country

export const updateClientSuccess = (client) => {
  return { type: UPDATE_CLIENT_SUCCESS, payload: client };
};

export const updateClientRdx = (updatedClient) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateClients}/${updatedClient.clientId}`,
        updatedClient,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.message);
      const data = await response.data;
      dispatch(updateClientSuccess(data));
      dispatch(fetchClientsRdx());
      toast.success("Client updated successfully!");
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(fetchClientsFailure(error));
      toast.error(error.response.data.message);
    }
  };
};

//Delete Country
export const deleteClientSuccess = (clientId) => {
  return { type: DELETE_CLIENT_SUCCESS, payload: clientId };
};

export const deleteClientRdx = (clientId) => {
    console.log(clientId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteClients}/${clientId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteClientSuccess(clientId));
      dispatch(fetchClientsRdx());
      toast.success("Client deleted successfully!");
    } catch (error) {
      dispatch(fetchClientsFailure(error.message));
      toast.error("Failed to delete Client.");
    }
  };
};
