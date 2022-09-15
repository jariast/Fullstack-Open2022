import { useState } from 'react';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Filter from './components/Filter';

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
    setNewPhoneNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterString={filter}
        changeHandler={(event) => onInputChange(event, setFilter)}
      ></Filter>
      <h2>Add new contact</h2>
      <ContactForm
        submitHandler={submit}
        newName={newName}
        newNameChangeHandler={(event) => onInputChange(event, setNewName)}
        newNumber={newPhoneNumber}
        newNumberChangeHandler={(event) =>
          onInputChange(event, setNewPhoneNumber)
        }
      ></ContactForm>
      <Contacts persons={shownPersons}></Contacts>
    </div>
  );
};

export default App;
