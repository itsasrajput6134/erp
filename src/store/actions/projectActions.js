import axios from "axios";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";

// Action Types
const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";

const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";

const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";

// Fetch OFFICEs
export const fetchProjectsRequest = () => {
  return { type: FETCH_PROJECTS_REQUEST };
};

export const fetchProjectsSuccess = (projects) => {
  return { type: FETCH_PROJECTS_SUCCESS, payload: projects };
};

export const fetchProjectsFailure = (error) => {
  return { type: FETCH_PROJECTS_FAILURE, payload: error };
};

export const fetchProjectsRdx = () => {
  return async (dispatch) => {
    dispatch(fetchProjectsRequest());
    try {
      const response = await axios.get(endpoints.getAllProject, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      dispatch(fetchProjectsSuccess(data));
    } catch (error) {
      dispatch(fetchProjectsFailure(error.message));
    }
  };
};

// Add State
export const addprojectSuccess = (project) => {
  return { type: ADD_PROJECT_SUCCESS, payload: project };
};

export const addprojectRdx = (newoffice) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.addProject, newoffice, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      dispatch(addprojectSuccess(data));
      dispatch(fetchProjectsRdx());
      toast.success("Project added successfully!");
    } catch (error) {
      dispatch(fetchProjectsFailure(error.message));
      toast.error("Failed to add Project.");
    }
  };
};

// Update State
export const updateprojectSuccess = (project) => {
  return { type: UPDATE_PROJECT_SUCCESS, payload: project };
};

export const updateprojectRdx = (updatedproject) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${endpoints.updateProject}/${updatedproject.projectId}`,
        updatedproject,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      dispatch(updateprojectSuccess(data));
      dispatch(fetchProjectsRdx());
      toast.success("project updated successfully!");
    } catch (error) {
      dispatch(fetchProjectsFailure(error.message));
      toast.error("Failed to update office.");
    }
  };
};

//Delete Country
export const deleteProjectSuccess = (projectId) => {
  return { type: DELETE_PROJECT_SUCCESS, payload: projectId };
};

export const deleteProjectRdx = (projectId) => {
  console.log(projectId);
  return async (dispatch) => {
    try {
      await axios.delete(`${endpoints.deleteProject}/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(deleteProjectSuccess(projectId));
      dispatch(fetchProjectsRdx());
      toast.success("Project deleted successfully!");
    } catch (error) {
      dispatch(fetchProjectsFailure(error.message));
      toast.error("Failed to delete Project.");
    }
  };
};
