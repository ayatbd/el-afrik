import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// Helper to safely get from storage (prevents server-side errors)
const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        // Initialize from LocalStorage
        accessToken: getUserFromStorage(),
        isAuthenticated: !!getUserFromStorage(),
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;

            // SAVE TO LOCALSTORAGE
            localStorage.setItem('accessToken', accessToken);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            if (accessToken) {
                try {
                    state.user = jwtDecode(accessToken);
                    state.isAuthenticated = true;
                } catch (e) {
                    state.isAuthenticated = false;
                }
            }
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            // CLEAR LOCALSTORAGE
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;