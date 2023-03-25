import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { diaryService } from '../service';
import { DiaryEntry, NewEntry } from '../types';

interface NewEntryFormProps {
  onEntryCreation: (createdEntry: DiaryEntry) => void;
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    const entryObj: NewEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    diaryService
      .createEntry(entryObj)
      .then((data) => {
        props.onEntryCreation(data);
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
          console.log('Creation error: ', error);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Entry</h2>
      {error && <p>{error}</p>}
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="text"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <label htmlFor="visibility">Visibility</label>
      <input
        id="visibility"
        type="text"
        value={visibility}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <label htmlFor="weather">Weather</label>
      <input
        id="weather"
        type="text"
        value={weather}
        onChange={(event) => setWeather(event.target.value)}
      />
      <label htmlFor="comment">Comment</label>
      <input
        id="comment"
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button type="submit">Create Entry</button>
    </form>
  );
};

export { NewEntryForm };
