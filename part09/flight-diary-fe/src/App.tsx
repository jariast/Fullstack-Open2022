import { useEffect, useState } from 'react';
import './App.css';
import { EntriesList } from './components/EntriesList';
import { NewEntryForm } from './components/NewEntry';
import { diaryService } from './service';
import { DiaryEntry } from './types';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const handleEntryCreation = (createdEntry: DiaryEntry) => {
    const entriesCopy = [...entries];
    entriesCopy.push(createdEntry);
    setEntries(entriesCopy);
  };

  return (
    <div className="App">
      <h1>Flight Diary</h1>
      <EntriesList entries={entries}></EntriesList>
      <NewEntryForm onEntryCreation={handleEntryCreation} />
    </div>
  );
}

export default App;
