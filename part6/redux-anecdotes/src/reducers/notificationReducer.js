import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification: (state, action) => action.payload,
        deleteNotification: (state, action) => ''
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer