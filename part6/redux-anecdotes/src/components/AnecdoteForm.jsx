import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { create_anecdote } from '../services/noteServices'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create_new_anecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(create_anecdote(content)))
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create_new_anecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm