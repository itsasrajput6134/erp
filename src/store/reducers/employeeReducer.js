const initialState = {
  employees: [],
  employeesLoading: false,
  employeesError: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_REQUEST_ACTIVE":
      return { ...state, employeesLoading: true };
    case "FETCH_EMPLOYEES_SUCCESS_ACTIVE":
      return { ...state, employeesLoading: false, employees: action.payload };
    case "FETCH_EMPLOYEES_FAILURE_ACTIVE":
      return {
        ...state,
        employeesLoading: false,
        employeesError: action.payload,
      };
    case "FETCH_EMPLOYEES_REQUEST":
      return { ...state, employeesLoading: true };
    case "FETCH_EMPLOYEES_SUCCESS":
      return { ...state, employeesLoading: false, employees: action.payload };
    case "FETCH_EMPLOYEES_FAILURE":
      return {
        ...state,
        employeesLoading: false,
        employeesError: action.payload,
      };  
    case "ADD_EMPLOYEE_SUCCESS":
      return { ...state, employees: [...state.employees, action.payload] };
    case "UPDATE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.userId === action.payload.userId ? action.payload : employee
        ),
      };
    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.userId !== action.payload
        ),
      };
    default:
      return state;
  }
};
