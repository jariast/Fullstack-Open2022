import { DiaryEntry } from '../types';

interface EntrieListProps {
  entries: DiaryEntry[];
}

const EntriesList = (props: EntrieListProps) => {
  return (
    <>
      {props.entries.map((entry) => (
        <article key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </article>
      ))}
    </>
  );
};

export { EntriesList };
