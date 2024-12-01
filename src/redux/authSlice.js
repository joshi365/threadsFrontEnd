import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authState: "login",
    userDetails: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.authState = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthState,setUserDetails } = authSlice.actions

export default authSlice.reducer