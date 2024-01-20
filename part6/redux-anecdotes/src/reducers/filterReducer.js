const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export const create_filter = (filter) => {
    return {
        type: 'FILTER',
        payload: {
            filter
        }
    }
}

export default filterReducer