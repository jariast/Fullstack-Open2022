import AnecdotesForm from './components/AnecdotesForm';
import AnecdotesList from './components/AnecdotesList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
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
