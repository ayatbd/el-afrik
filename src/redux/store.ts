import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import authTest from './features/auth/authSliceTest';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    authTest,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;