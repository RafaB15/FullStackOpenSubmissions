import { useState } from 'react'

const Button = ({onClicked, text}) => <button onClick={onClicked}>{text}</button>

const Statistics = (props) => {
  return(
    <div>
      <p>
        good {props.good} <br/>
        neutral {props.neutral} <br/>
        bad {props.bad} <br/>
        all {props.good + props.neutral + props.bad} <br/>
        average {(props.good - props.bad) / (props.good + props.neutral + props.bad)} <br/>
        positive {props.good / (props.good + props.neutral + props.bad) * 100} % <br/>
      </p>
    </div>
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
