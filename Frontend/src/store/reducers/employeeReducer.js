
const initialState = {
  employees: [],
  employee: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_EMPLOYEES_SUCCESS':
      return {
        ...state,
        employees: action.payload.employees,
        currentPage: action.payload.currentPage,
        loading: false
      };
    case 'FETCH_EMPLOYEES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'FETCH_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employee: action.payload,
        loading: false
      };
    case 'CREATE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employees: [...state.employees, action.payload.employee],
        loading: false
      };
    case 'UPDATE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp._id === action.payload.employee._id ? action.payload.employee : emp
        ),
        employee: action.payload.employee,
        loading: false
      };
    case 'DELETE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};

export default employeeReducer;
