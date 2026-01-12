import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { baseApi } from './api/baseApi';
import loginReducer from './features/auth/loginSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;