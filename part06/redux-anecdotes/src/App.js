import AnecdotesForm from './components/AnecdotesForm';
import AnecdotesList from './components/AnecdotesList';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
