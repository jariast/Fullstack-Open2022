import { useState } from 'react';

const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const posRatio = (good / total) * 100;

  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine label={'Good'} value={good}></StatisticsLine>
            <StatisticsLine label={'Neutral'} value={neutral}></StatisticsLine>
            <StatisticsLine label={'Bad'} value={bad}></StatisticsLine>
            <StatisticsLine label={'Average'} value={avg}></StatisticsLine>
            <StatisticsLine
              label={'Positive Ratio'}
              value={posRatio + '%'}
            ></StatisticsLine>
          </tbody>
        </table>
        {/* <StatisticsLine label={'Good'} value={good}></StatisticsLine> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <h2>Please submit feedback</h2>
      </div>
    );
  }
};

const Button = ({ onClickHandler, label }) => {
  return <button onClick={onClickHandler}>{label}</button>;
};

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
        <Button
          onClickHandler={incrementState(setGood, good)}
          label={'Good'}
        ></Button>
        <Button
          onClickHandler={incrementState(setNeutral, neutral)}
          label={'Neutral'}
        ></Button>
        <Button
          onClickHandler={incrementState(setBad, bad)}
          label={'Bad'}
        ></Button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  );
};

export default App;
