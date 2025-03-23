
import axios from 'axios';
import { setNotification } from './uiActions';

const API_URL = 'http://localhost:4444';

// Configure axios with auth token
const getAuthHeaders = (getState) => {
  const { token } = getState().auth;
  return {
    headers: {
      'Authorization': token
    }
  };
};

export const fetchEmployees = (page = 1, limit = 10) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    
    const response = await axios.get(
      `${API_URL}/emp/get?page=${page}&limit=${limit}`,
      getAuthHeaders(getState)
    );
    
    dispatch({
      type: 'FETCH_EMPLOYEES_SUCCESS',
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch employees';
    
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};

export const fetchEmployeeById = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    
    const response = await axios.get(
      `${API_URL}/emp/getbyid`,
      getAuthHeaders(getState)
    );
    
    dispatch({
      type: 'FETCH_EMPLOYEE_SUCCESS',
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch employee details';
    
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};

export const createEmployee = (employeeData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    
    // Create a FormData object if there's a file
    const formData = new FormData();
    
    // Append all employee data to FormData
    for (const key in employeeData) {
      if (key === 'profilePicture' && employeeData[key] instanceof File) {
        formData.append(key, employeeData[key]);
      } else {
        formData.append(key, employeeData[key]);
      }
    }
    
    const response = await axios.post(
      `${API_URL}/emp/create`,
      formData,
      {
        ...getAuthHeaders(getState),
        headers: {
          ...getAuthHeaders(getState).headers,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    dispatch({
      type: 'CREATE_EMPLOYEE_SUCCESS',
      payload: response.data
    });
    
    dispatch(setNotification({
      type: 'success',
      message: 'Employee created successfully!'
    }));
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create employee';
    
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};

export const updateEmployee = (id, employeeData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    
    // Create a FormData object if there's a file
    const formData = new FormData();
    
    // Append all employee data to FormData
    for (const key in employeeData) {
      if (key === 'profilePicture' && employeeData[key] instanceof File) {
        formData.append(key, employeeData[key]);
      } else {
        formData.append(key, employeeData[key]);
      }
    }
    
    const response = await axios.post(
      `${API_URL}/emp/update/${id}`,
      formData,
      {
        ...getAuthHeaders(getState),
        headers: {
          ...getAuthHeaders(getState).headers,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    dispatch({
      type: 'UPDATE_EMPLOYEE_SUCCESS',
      payload: response.data
    });
    
    dispatch(setNotification({
      type: 'success',
      message: 'Employee updated successfully!'
    }));
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update employee';
    
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
    
    await axios.delete(
      `${API_URL}/emp/delete/${id}`,
      getAuthHeaders(getState)
    );
    
    dispatch({
      type: 'DELETE_EMPLOYEE_SUCCESS',
      payload: id
    });
    
    dispatch(setNotification({
      type: 'success',
      message: 'Employee deleted successfully!'
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete employee';
    
    dispatch({
      type: 'FETCH_EMPLOYEES_FAILURE',
      payload: errorMessage
    });
    
    dispatch(setNotification({
      type: 'error',
      message: errorMessage
    }));
    
    throw error;
  }
};
