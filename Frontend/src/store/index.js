
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import employeeReducer from './reducers/employeeReducer';
import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeeReducer,
  ui: uiReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
