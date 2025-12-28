import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ResetState {
    email: string;
    otpSent: boolean;
    otpVerified: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: ResetState = {
    email: "",
    otpSent: false,
    otpVerified: false,
    loading: false,
    error: null,
};

// 🔹 Send OTP
export const sendOtp = createAsyncThunk(
    "passwordReset/sendOtp",
    async (email: string, thunkAPI) => {
        try {
            const res = await axios.post("/api/auth/send-otp", { email });
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Failed to send OTP"
            );
        }
    }
);

// 🔹 Verify OTP
export const verifyOtp = createAsyncThunk(
    "passwordReset/verifyOtp",
    async (
        data: { email: string; otp: string },
        thunkAPI
    ) => {
        try {
            const res = await axios.post("/api/auth/verify-otp", data);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Invalid OTP"
            );
        }
    }
);

// 🔹 Reset Password
export const resetPassword = createAsyncThunk(
    "passwordReset/resetPassword",
    async (
        data: { email: string; newPassword: string },
        thunkAPI
    ) => {
        try {
            const res = await axios.post("/api/auth/reset-password", data);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Password reset failed"
            );
        }
    }
);

const passwordResetSlice = createSlice({
    name: "passwordReset",
    initialState,
    reducers: {
        clearResetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // SEND OTP
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.email = action.meta.arg;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // VERIFY OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpVerified = true;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // RESET PASSWORD
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearResetState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
