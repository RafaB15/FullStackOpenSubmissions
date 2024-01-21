import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes
            .filter(anecdote => anecdote.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList