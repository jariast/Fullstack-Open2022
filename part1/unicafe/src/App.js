import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const incrementGood = () => {
  //   setGood(good + 1);
  // };

  // const incrementNeutral = () => {
  //   setNeutral(neutral + 1);
  // };

  // const incrementBad = () => {
  //   setBad(bad + 1);
  // };

  const incrementState = (setState, state) => () => {
    setState(state + 1);
  };

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={incrementState(setGood, good)}>Good</button>
        <button onClick={incrementState(setNeutral, neutral)}>Neutral</button>
        <button onClick={incrementState(setBad, bad)}>Bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
        <div>Good {good}</div>
        <div>Neutral {neutral}</div>
        <div>Bad {bad}</div>
      </div>
    </div>
  );
};

export default App;
