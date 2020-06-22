import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import uiReducer from '../features/ui/uiSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    ui: uiReducer
  },
});
