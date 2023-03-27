import axios from 'axios';
import React from 'react';
import { SyntheticEvent, useState } from 'react';
import { diaryService } from '../service';
import { DiaryEntry, NewEntry, Visibility, Weather } from '../types';

interface NewEntryFormProps {
  onEntryCreation: (createdEntry: DiaryEntry) => void;
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState('');

  const [error, setError] = useState('');

  const weatherRadioButtons: JSX.Element[] = [];
  Object.values(Weather).map((v) => {
    weatherRadioButtons.push(
      <React.Fragment key={v}>
        <input
          type="radio"
          name="weather"
          id={v}
          value={v}
          checked={v === weather}
          onChange={() => setWeather(v)}
        />
        {v}
      </React.Fragment>
    );
  });

  const visibilityRadioButtons: JSX.Element[] = [];
  Object.values(Visibility).map((v) => {
    visibilityRadioButtons.push(
      <React.Fragment key={v}>
        <input
          type="radio"
          name="visibility"
          id={v}
          value={v}
          checked={v === visibility}
          onChange={() => setVisibility(v)}
        />
        {v}
      </React.Fragment>
    );
  });

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
        setVisibility(Visibility.Good);
        setWeather(Weather.Sunny);
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
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <label htmlFor="visibility">Visibility</label>
      <div>{visibilityRadioButtons}</div>
      <label htmlFor="weather">Weather</label>
      <div>{weatherRadioButtons}</div>
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
