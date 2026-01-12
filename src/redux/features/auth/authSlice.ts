import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    admin: any | null;
}

const initialState: AuthState = {
    token: typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null,
    admin: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; admin: any }>
        ) => {
            state.token = action.payload.token;
            state.admin = action.payload.admin;
            localStorage.setItem("token", action.payload.token);
        },

        logout: (state) => {
            state.token = null;
            state.admin = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
