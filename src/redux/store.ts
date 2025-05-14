import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './reducers/studentReducer';
import adminReducer from './reducers/adminReducer';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    admin:adminReducer, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;