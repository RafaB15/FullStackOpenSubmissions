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

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(createNotification(notification))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer