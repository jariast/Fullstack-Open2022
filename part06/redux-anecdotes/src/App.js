import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdotesForm from './components/AnecdotesForm';
import AnecdotesList from './components/AnecdotesList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { setAllAnecdotes } from './reducers/anecdoteReducer';
import anecdotesService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdotesService.getAll();
      dispatch(setAllAnecdotes(anecdotes));
    };

    fetchAnecdotes();
  }, [dispatch]);
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
