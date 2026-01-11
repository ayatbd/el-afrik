import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* --------------------
   Types
-------------------- */
interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

/* --------------------
   Safe token hydration
-------------------- */
const getInitialToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
};

/* --------------------
   Initial State
-------------------- */
const initialState: AuthState = {
    user: null,
    token: getInitialToken(),
    isAuthenticated: !!getInitialToken(),
};

/* --------------------
   Slice
-------------------- */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
