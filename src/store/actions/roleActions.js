import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_ROLES_REQUEST = "FETCH_ROLES_REQUEST";
const FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";
const FETCH_ROLES_FAILURE = "FETCH_ROLES_FAILURE";

const ADD_ROLE_SUCCESS = "ADD_ROLE_SUCCESS";

const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";

const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";

// Fetch Roles
export const fetchRolesRequest = () => {
  return { type: FETCH_ROLES_REQUEST };
};

export const fetchRolesSuccess = (roles) => {
  return { type: FETCH_ROLES_SUCCESS, payload: roles };
};

export const fetchRolesFailure = (error) => {
  return { type: FETCH_ROLES_FAILURE, payload: error };
};

export const fetchRolesRdx = () => {
  return async (dispatch) => {
    dispatch(fetchRolesRequest());
    try {
      const response = await axios.get(endpoints.getAllRoles, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchRolesSuccess(data));
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
    }
  };
};

// Add Role
export const addRoleSuccess = (role) => {
  return { type: ADD_ROLE_SUCCESS, payload: role };
};

export const addRoleRdx = (newRole) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addRoles, newRole, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addRoleSuccess(data));
      dispatch(fetchRolesRdx());
      toast.success("Role added successfully!");
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
      toast.error("Failed to add Role.");
    }
  };
};

// Update Role
export const updateRoleSuccess = (role) => {
  return { type: UPDATE_ROLE_SUCCESS, payload: role };
};

export const updateRoleRdx = (updatedRole) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateRoles}/${updatedRole.id}`,
        updatedRole,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateRoleSuccess(data));
      dispatch(fetchRolesRdx());
      toast.success("Role updated successfully!");
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
      toast.error("Failed to update Role.");
    }
  };
};

// Delete Role
export const deleteRoleSuccess = (roleId) => {
  return { type: DELETE_ROLE_SUCCESS, payload: roleId };
};

export const deleteRoleRdx = (roleId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteRoles}/${roleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteRoleSuccess(roleId));
      dispatch(fetchRolesRdx());
      toast.success("Role deleted successfully!");
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
      toast.error("Failed to delete Role.");
    }
  };
};