import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        name: "",
        password: "",
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
    },
});

export const { setName, setPassword } = loginSlice.actions;
export default loginSlice.reducer;