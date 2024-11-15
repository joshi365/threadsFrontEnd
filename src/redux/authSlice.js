import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authState: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state,action) => {
            state.authState = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuthState } = authSlice.actions

export default authSlice.reducer