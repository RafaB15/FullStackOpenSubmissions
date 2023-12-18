const Person = ({person, deleateSequence}) => {
    return (
        <li key = {person.id}>
            {person.name} : {person.number}
            <button onClick = {deleateSequence}>delete</button>
        </li>
    )
}

export default Person