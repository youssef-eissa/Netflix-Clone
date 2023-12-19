import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movie: {},
    },
    reducers: {
        setTheMovie: (state, action) => {
            state.movie = action.payload;
        },
    },
});
export const { setTheMovie } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;