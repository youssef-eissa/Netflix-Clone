import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        token: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.token = '';
            state.user = {};
        },
    },
});

export const { setUser, logout,setToken } = userSlice.actions;
export const userReducer = userSlice.reducer
