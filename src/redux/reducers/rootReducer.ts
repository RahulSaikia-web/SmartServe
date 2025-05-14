import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  admin: adminReducer,
});

export default rootReducer;