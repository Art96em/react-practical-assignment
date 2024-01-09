import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from "./AuthSlice";
import { useSelector } from "react-redux";
import { paginationReducer } from './PaginationSlice';
import { infoReducer } from './InfoSlice';

export const store = configureStore({
    reducer: {
        authState: authReducer,
        paginationState: paginationReducer,
        infoState: infoReducer
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

export function useSelectorInfo() {
    return useSelector(state => state.infoState)
}