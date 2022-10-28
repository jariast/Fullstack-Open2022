import AnecdotesForm from './components/AnecdotesForm';
import AnecdotesList from './components/AnecdotesList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  //I moved the loading of Anecdotes to the Anecdotes list, but it be left here
  //Or even load the list directly in index.js so the Anecdotes load sooner.
  //Example: https://redux.js.org/tutorials/essentials/part-5-async-logic#loading-users
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
