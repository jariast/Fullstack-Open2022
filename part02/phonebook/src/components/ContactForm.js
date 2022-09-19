import React from 'react';

const ContactForm = ({
  submitHandler,
  newName,
  newNameChangeHandler,
  newNumber,
  newNumberChangeHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        Name: <input value={newName} onChange={newNameChangeHandler} />
      </div>

      <div>
        Phone: <input value={newNumber} onChange={newNumberChangeHandler} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default ContactForm;
