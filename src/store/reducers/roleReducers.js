const initialState = {
  roles: [],
  roleLoading: false,
  roleError: null,
};

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROLES_REQUEST":
      return { ...state, roleLoading: true };
    case "FETCH_ROLES_SUCCESS":
      return { ...state, roleLoading: false, roles: action.payload };
    case "FETCH_ROLES_FAILURE":
      return { ...state, roleLoading: false, roleError: action.payload };
    case "ADD_ROLE_SUCCESS":
      return { ...state, roles: [...state.roles, action.payload] };
    case "UPDATE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case "DELETE_ROLE_SUCCESS":
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
      };
    default:
      return state;
  }
};