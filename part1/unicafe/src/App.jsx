import { useState } from 'react'

const Button = ({onClicked, text}) => <button onClick={onClicked}>{text}</button>

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
      <p>
        good {good} <br/>
        neutral {neutral} <br/>
        bad {bad} <br/>
        all {good + neutral + bad} <br/>
        average {(good - bad) / (good + neutral + bad)} <br/>
        positive {good / (good + neutral + bad) * 100} % <br/>
      </p>
    </div>
  )

}

export default App
