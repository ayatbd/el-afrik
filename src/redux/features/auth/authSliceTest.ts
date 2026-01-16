import { createSlice } from '@reduxjs/toolkit';

const authSliceTest = createSlice({
    name: 'authTest',
    initialState: {
        user: null,
        accessToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;

        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, logout } = authSliceTest.actions;
export default authSliceTest.reducer;