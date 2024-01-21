import { createSlice } from '@reduxjs/toolkit'

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
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }

})

export const { createVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer