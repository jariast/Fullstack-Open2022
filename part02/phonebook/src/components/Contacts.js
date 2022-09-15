import React from 'react';
import Contact from './Contact';

const Contacts = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Contact
          key={person.name}
          name={person.name}
          number={person.number}
        ></Contact>
      ))}
    </>
  );
};

export default Contacts;
