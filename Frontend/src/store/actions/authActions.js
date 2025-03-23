
import axios from 'axios';
import { setNotification } from './uiActions';

const API_URL = 'http://localhost:4444';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_REQUEST' });
    
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: response.data
    });
    
    dispatch(setNotification({
      type: 'success',
      message: 'Login successful!'
    }));
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    
    dispatch({
      type: 'AUTH_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  dispatch(setNotification({
    type: 'info',
    message: 'You have been logged out'
  }));
};

export const checkAuthStatus = () => (dispatch, getState) => {
  const { token } = getState().auth;
  
  if (!token) {
    dispatch({ type: 'LOGOUT' });
    return false;
  }
  
  return true;
};
