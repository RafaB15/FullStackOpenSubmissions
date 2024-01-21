import { useDispatch } from 'react-redux'
import { create_filter } from '../services/filterServices'
import { createFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const new_filter = create_filter(event.target.value)
        dispatch(createFilter(new_filter))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter