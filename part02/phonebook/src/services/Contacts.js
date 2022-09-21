import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/contacts';

const getAll = () => {
  const reqPromise = axios.get(baseUrl);
  return reqPromise.then((res) => res.data);
};

const create = (newContact) => {
  const reqPromise = axios.post(baseUrl, newContact);

  return reqPromise.then((res) => res.data);
};

const update = (id, newContact) => {
  const reqPromise = axios.put(`${baseUrl}/${id}`, newContact);
  return reqPromise.then((res) => res.data);
};

const deleteContact = (id) => {
  const reqPromise = axios.delete(`${baseUrl}/${id}`);
  return reqPromise.then((res) => res.data);
};

const contactsService = { getAll, create, update, deleteContact };

export default contactsService;
