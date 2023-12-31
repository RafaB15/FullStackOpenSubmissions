import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ChangingInput from './components/ChangingInput'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)


  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
      setNewName('')
      setNumber('')
      setNotification(`${newName} was updated`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson.data))
        setNotification(`${newName} was added`)
      })
      .catch(error => {
        setNotification("The name must be at least 3 characters long") 
      })
    setNewName('')
    setNumber('')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deleatePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleate(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotification(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const filtered_persons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {notification}/>
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
      <ul>
        {filtered_persons.map(person => <Person key={person.id} person = {person} deleateSequence={() => deleatePerson(person.id)}/>)}
      </ul>
    </div>
  )
}

export default App