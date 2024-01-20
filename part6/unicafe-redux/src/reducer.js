const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
        const new_good_count = state.ok + 1
        return {
          ...state,
          good: new_good_count 
        }
      }
    case 'OK': 
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer
