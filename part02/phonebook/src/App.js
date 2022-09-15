import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '39-44-31231' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  // const onInputChange = (event) => {
  //   setNewName(event.target.value);
  // };

  const onInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} already exists in the notebook`);
      return;
    }
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
