import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

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
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }

})

export const { createVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const new_anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(new_anecdote))
  }
}

export default anecdoteSlice.reducer