import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';
export default function Phonebook() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('contacts') !== null) {
      const contacts = localStorage.getItem('contacts');
      const parcedContacts = JSON.parse(contacts);
      setContacts(contacts => parcedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.map(contact => contact.name.toLowerCase()).includes(name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(contacts => [...contacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactId));
  };

  const normalizedFilter = filter.toLocaleLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <>
      <Form onSubmit={addContact} />
      {contacts.length > 0 && (
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
      )}
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
    </>
  );
}
