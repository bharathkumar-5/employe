
export const toggleSidebar = () => ({
  type: 'TOGGLE_SIDEBAR'
});

export const setNotification = (notification) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: notification
  });
  
  // Auto clear notification after 5 seconds
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  }, 5000);
};

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
});

export const setTheme = (theme) => ({
  type: 'SET_THEME',
  payload: theme
});
