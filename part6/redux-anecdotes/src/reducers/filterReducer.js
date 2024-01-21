import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        createFilter: (state, action) => action.payload.filter
    }
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer