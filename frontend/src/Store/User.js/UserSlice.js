import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null, // User data
    id: null, // User data
    token: null, // Authentication token
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { username, id, token, profilePicture } = action.payload || {};
            state.username = username ?? null; // Default to null if undefined
            state.id = id ?? null; // Default to null if undefined
            state.token = token ?? null; // Default to null if undefined
            state.profilePicture = profilePicture ?? null; // Default to null if undefined
        },
        clearUser(state) {
            state.username = null;
            state.id = null;
            state.token = null;
        },
    }
})

// console.log(userSlice.reducer.value);

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;