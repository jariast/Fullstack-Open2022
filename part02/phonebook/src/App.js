import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const onInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the notebook`);
      return;
    }
    const newPerson = { name: newName, number: newPhoneNumber };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <label>Filter</label>
      <input
        value={filter}
        onChange={(event) => onInputChange(event, setFilter)}
      ></input>
      <h2>Add new contact</h2>

      <form onSubmit={submit}>
        <div>
          Name:{' '}
          <input
            value={newName}
            onChange={(event) => onInputChange(event, setNewName)}
          />
        </div>

        <div>
          Phone:{' '}
          <input
            value={newPhoneNumber}
            onChange={(event) => onInputChange(event, setNewPhoneNumber)}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
