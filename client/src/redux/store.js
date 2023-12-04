import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "./AuthSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        authState: authReducer
    }
})

export function useSelectorAuth() {
    return useSelector(state => state.authState.userData);
}