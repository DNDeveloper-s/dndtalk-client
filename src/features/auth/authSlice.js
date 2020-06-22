import { createSlice } from "@reduxjs/toolkit";

const bearer = window.localStorage.getItem('bearer');
const userId = window.localStorage.getItem('userId');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: Boolean(bearer),
        token: bearer || null,
        userId: userId
    },
    reducers: {
        LOGGED_IN: (state, action) => {
            state.authenticated = action.payload.authenticated;
            state.token = action.payload.token;
            state.userId = action.payload.userId;

            window.localStorage.setItem('bearer', action.payload.token);
            window.localStorage.setItem('userId', action.payload.userId);
        },
        LOG_OUT: (state, action) => {
            state.authenticated = false;
            state.token = null;
            state.userId = null;

            window.localStorage.setItem('bearer', undefined);
            window.localStorage.setItem('userId', undefined);
        }
    }
})

export const {
    LOGGED_IN,
    LOG_OUT
} = authSlice.actions;

export const authenticated = state => state.auth.authenticated;
export const selectToken = state => state.auth.token;

export default authSlice.reducer;