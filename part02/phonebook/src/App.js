import { useState, useEffect } from 'react';

import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Notification from './components/Notification';
import contactsService from './services/Contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isError, setIsError] = useState(false);

  // If using React.StrictMode the component will mount twice on Dev mode.
  // So there will be two requests on the network tab.
  const hook = () => {
    contactsService.getAll().then((res) => setPersons(res));
  };

  useEffect(hook, []);

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const onInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (
      existingPerson &&
      window.confirm(
        `${newName} already exists in the notebook, do you want to update its number?`
      )
    ) {
      updateContact(existingPerson);
    } else {
      addContact();
    }
  };

  const addContact = () => {
    const newPerson = { name: newName, number: newPhoneNumber };
    contactsService.create(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setNewName('');
      setNewPhoneNumber('');
      showNotification(`${res.name} added`);
    });
  };

  const updateContact = (existingPerson) => {
    contactsService
      .update(existingPerson.id, {
        ...existingPerson,
        number: newPhoneNumber,
      })
      .then((res) => {
        showNotification(`${res.name} updated`);
        setPersons(
          persons.map((person) =>
            person.id !== existingPerson.id ? person : res
          )
        );
      });
  };

  const deleteContactHandler = (contact) => {
    if (window.confirm(`Do you want to delete ${contact.name}`)) {
      contactsService
        .deleteContact(contact.id)
        .then((res) => {
          const newContacts = persons.filter(
            (person) => person.id !== contact.id
          );
          setPersons(newContacts);
          showNotification(`${contact.name} deleted`);
        })
        .catch((error) => {
          showNotification(`${contact.name} was already deleted`, true);
          const newContacts = persons.filter(
            (person) => person.id !== contact.id
          );
          setPersons(newContacts);
        });
    }
  };

  const showNotification = (msg, isError) => {
    setNotificationMsg(msg);
    setIsError(isError);
    setTimeout(() => {
      setNotificationMsg('');
    }, 3000);
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
      <Notification message={notificationMsg} isError={isError} />
      <Contacts
        persons={shownPersons}
        deleteHandler={deleteContactHandler}
      ></Contacts>
    </div>
  );
};

export default App;
