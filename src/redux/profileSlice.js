import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
})


export const { setPosts } = profileSlice.actions

export default profileSlice.reducer