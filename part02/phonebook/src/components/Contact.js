import React from 'react';

const Contact = ({ contact, deleteHandler }) => {
  return (
    <>
      <p>
        {contact.name} {contact.number}
      </p>
      <button onClick={() => deleteHandler(contact)}>Delete</button>
    </>
  );
};

export default Contact;
