import { createSlice } from '@reduxjs/toolkit';

const AUTH_ITEM = "auth-item";

function getUserData() {
    const userDataJson = localStorage.getItem(AUTH_ITEM) || '';
    let res = null;
    if (userDataJson) {
        res = JSON.parse(userDataJson);
    }
    return res;
}

const initialState = {
    userData: getUserData()
}

const authSlice = createSlice({
    initialState,
    name: 'authState',
    reducers: {
        set: (state, data) => {
            if (data.payload) {
                localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload));
                state.userData = data.payload;
            }
        },
        reset: (state) => {
            state.userData = null;
            localStorage.removeItem(AUTH_ITEM);
        }
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;