import { useState } from 'react'

const Button = ({onClicked, text}) => <button onClick={onClicked}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = (props) => {

  const total = props.good + props.neutral + props.bad

  if (total === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}/>
          <StatisticLine text='neutral' value={props.neutral}/>
          <StatisticLine text='bad' value={props.bad}/>
          <StatisticLine text='all' value={total}/>
          <StatisticLine text='average' value={(props.good - props.bad) / (total)}/>
          <StatisticLine text='positive' value={props.good / (total) * 100}/>
        </tbody>
      </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral +1)
  const handleBadClick = () => setBad(bad +1)

  return(
    <div>
      <h1>give Feedback</h1>
      <Button onClicked={handleGoodClick} text='good'/>
      <Button onClicked={handleNeutralClick} text='neutral'/>
      <Button onClicked={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )

}

export default App
