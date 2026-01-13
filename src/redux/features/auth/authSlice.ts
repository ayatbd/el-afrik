import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    user: null, // Will contain { userId, role, ... }
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;

            // Decode the token to get user info (role: superAdmin)
            if (accessToken) {
                state.user = jwtDecode(accessToken);
                state.isAuthenticated = true;
            }
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            // Remove refresh token from storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('refreshToken');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;