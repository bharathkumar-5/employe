
const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.employee_details,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
