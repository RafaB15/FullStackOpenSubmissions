const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
        const new_good_count = state.good + 1
        return {
          ...state,
          good: new_good_count 
        }
      }
    case 'OK': {
        const new_ok_count = state.ok + 1
        return {
          ...state,
          ok: new_ok_count
        }
      }
    case 'BAD':{
        const new_bad_count = state.bad + 1
        return {
          ...state,
          bad: new_bad_count
        }
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
