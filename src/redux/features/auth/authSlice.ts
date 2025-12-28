import api from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// 🔹 LOGIN API CALL
export const loginUser = createAsyncThunk(
    "auth/login-admin",
    async (
        credentials: { email: string; password: string },
        thunkAPI
    ) => {
        try {
            const res = await api.post("/auth/login-admin", credentials);
            return res.data; // { user, token }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // login pending
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // login success
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            // login failed
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
