const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  let sum = parts.reduce((i, part) => part.exercises + i, 0);
  return (<p>Number of exercises {sum}</p>)
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part => <Part key = {part.id} part={part} />)

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

export default Course