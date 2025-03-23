
const initialState = {
  sidebarOpen: true,
  notification: null,
  theme: 'light'
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null
      };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export default uiReducer;
