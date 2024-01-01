import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "./AuthSlice";
import { useSelector } from "react-redux";
import { paginationReducer } from './PaginationSlice';

export const store = configureStore({
    reducer: {
        authState: authReducer,
        paginationState: paginationReducer
    }
})

export function useSelectorAuth() {
    return useSelector(state => state.authState.userData);
}

export function useSelectorPaginatorCurrent() {
    return useSelector(state => state.paginationState.currentPage)
}

export function useSelectorPaginatorTotal() {
    return useSelector(state => state.paginationState.totalPages)
}