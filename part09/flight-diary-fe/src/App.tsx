import { useEffect, useState } from 'react';
import './App.css';
import { EntriesList } from './components/EntriesList';
import { diaryService } from './service';
import { DiaryEntry } from './types';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Flight Diary</h1>
      <EntriesList entries={entries}></EntriesList>
    </div>
  );
}

export default App;
