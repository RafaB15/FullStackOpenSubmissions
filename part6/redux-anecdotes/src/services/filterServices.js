const create_filter = (filter) => {
    return {
        type: 'FILTER',
        payload: {
            filter
        }
    }
}

export default create_filter