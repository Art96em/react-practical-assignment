import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    totalPages: 0
}

const paginationSlice = createSlice({
    initialState,
    name: 'paginationState',
    reducers: {
        setCurrentPage: (state, data) => {
            if (data.payload) {
                state.currentPage = data.payload;
            }
        },
        setTotalPages: (state, data) => {
            if (data.payload) {
                state.totalPages = data.payload;
            }
        }
    }
})

export const paginationActions = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;