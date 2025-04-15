const initialState = {
  departments: [],
  departmentsLoading: false,
  departmentsError: null,
};

export const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DEPARTMENTS_REQUEST":
      return { ...state, departmentsLoading: true };
    case "FETCH_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        departmentsLoading: false,
        departments: action.payload,
      };
    case "FETCH_DEPARTMENTS_FAILURE":
      return {
        ...state,
        departmentsLoading: false,
        departmentsError: action.payload,
      };
    case "ADD_DEPARTMENT_SUCCESS":
      return { ...state, departments: [...state.departments, action.payload] };
    case "UPDATE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        departments: state.departments.map((department) =>
          department.departmentId === action.payload.departmentId
            ? action.payload
            : department
        ),
      };
    case "DELETE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.departmentId !== action.payload
        ),
      };
    default:
      return state;
  }
};
