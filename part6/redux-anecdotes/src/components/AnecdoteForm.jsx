import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create_new_anecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const new_anecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(new_anecdote))
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