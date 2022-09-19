import React from 'react';
import Contact from './Contact';

const Contacts = ({ persons, deleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Contact
          key={person.name}
          contact={person}
          deleteHandler={deleteHandler}
        ></Contact>
      ))}
    </>
  );
};

export default Contacts;
