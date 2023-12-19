import { useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => setSearch(event.target.value)
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) =>
        setCountries(response.data.map((country) => country.name.common))
      );
  }, []);

  useEffect(() => {
    if (search === '') {  
      setFilteredCountries(countries)
      return
    }
    setFilteredCountries(countries.filter(country => country.toLowerCase().includes(search.toLowerCase())))
  }, [search, countries])

  return (
    <div>
      <h1>Search for a country</h1>
      <form>
        find countries <input value={search} onChange={handleSearchChange} />
      </form>
      <ul>
        {filteredCountries.length <= 10 && filteredCountries.map((country, index) => <li key= {index}>{country}</li>)}
        {filteredCountries.length > 10 && <li>Too many matches, specify another filter</li>}
      </ul>
    </div>
  )
}

export default App
