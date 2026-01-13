import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        isAuthenticated: false
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;

            if (accessToken) {
                try {
                    state.user = jwtDecode(accessToken);
                    state.isAuthenticated = true; // <--- MUST BE HERE
                } catch (e) {
                    state.isAuthenticated = false;
                }
            }
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;