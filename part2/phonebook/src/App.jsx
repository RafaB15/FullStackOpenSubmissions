import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ChangingInput from './components/ChangingInput'
import List from './components/List'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')


  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
  }
  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>

      <Filter filter = {filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>

      <form onSubmit = {addPerson}>
        <ChangingInput text = 'name:' value = {newName} onChange = {handlePersonChange}/>
        <ChangingInput text = 'number:' value = {newNumber} onChange = {handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <List persons = {persons} filter = {filter}/>

    </div>
  )
}

export default App