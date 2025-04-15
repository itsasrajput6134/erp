const initialState = {
  projects: [],
  projectsLoading: false,
  projectsError: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROJECTS_REQUEST":
      return { ...state, projectsLoading: true };
    case "FETCH_PROJECTS_SUCCESS":
      return { ...state, projectsLoading: false, projects: action.payload };
    case "FETCH_PROJECTS_FAILURE":
      return { ...state, projectsLoading: false, projectsError: action.payload };
    case "ADD_PROJECT_SUCCESS":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT_SUCCESS":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.projectId === action.payload.projectId ? action.payload : project
        ),
      };
    case "DELETE_PROJECT_SUCCESS":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.projectId !== action.payload
        ),
      };
    default:
      return state;
  }
};
