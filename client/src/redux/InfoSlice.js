import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: '',
    type: ''
}

const InfoSlice = createSlice({
    initialState,
    name: 'infoState',
    reducers: {
        setInfo: (state, data) => {
            if (data.payload) {
                state.text = data.payload.text;
                state.type = data.payload.type;
            }
        },
        dropInfo: (state) => {
            state.text = '';
            state.type = '';
        }
    }
})

export const infoActions = InfoSlice.actions;
export const infoReducer = InfoSlice.reducer;