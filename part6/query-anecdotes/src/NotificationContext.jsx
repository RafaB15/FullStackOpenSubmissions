import { createContext, useReducer, useContext } from 'react';

const notificationReducer= (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
        return action.data;
        case 'CLEAR_NOTIFICATION':
        return '';
        default:
        return state;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    ) 
}

export const useNotificationValue = () => {
    const context = useContext(NotificationContext);
    return context[0]
}

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);
    return context[1]
}


export default NotificationContext;