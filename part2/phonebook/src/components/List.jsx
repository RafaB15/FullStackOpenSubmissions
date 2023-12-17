const List = ({ persons, filter}) => {
    const filtered_map = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <ul>
        {filtered_map.map(person => <li key = {person.name}>{person.name} : {person.number}</li>)}
        </ul>
    )
}

export default List