import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createVote: (state, action) => {
      const voted_anecdote = state.find(anecdote => anecdote.id === action.payload.id)
      const updated_anecdote = {
        ...voted_anecdote,
        votes: voted_anecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id === action.payload.id ? updated_anecdote : anecdote)
    },
    createAnecdote: (state, action) => {
      const new_anecdote = asObject(action.payload)
      return state.push(new_anecdote)
    },
    appendAnecdote: (state, action) => {
      return state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }

})

export const { createVote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer