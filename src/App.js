import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
// import React, { Component } from 'react';
import shortid from 'shortid';
export default function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  const newContact = {
    id: shortid.generate(),
    name,
    number,
  };
  const toSetContact = () => {
    setContacts(...contacts, newContact);
  };

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

// import './App.css';
// import Form from './components/form/Form';
// import ContactList from './components/ContactList/ContactList';
// import Filter from './components/Filter/Filter';
// import React, { Component } from 'react';
// import shortid from 'shortid';
// class Phonebook extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     number: '',
//     filter: '',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   componentDidMount() {
//     if (localStorage.getItem('contacts') !== null) {
//       const contacts = localStorage.getItem('contacts');
//       const parcedContacts = JSON.parse(contacts);
//       this.setState({ contacts: parcedContacts });
//       console.log(parcedContacts);
//     }
//   }

//   addContact = (name, number) => {
//     const newContact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };
//     if (
//       this.state.contacts.map(contact => contact.name.toLowerCase()).includes(name.toLowerCase())
//     ) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => ({ contacts: [...prevState.contacts, newContact] }));
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   render() {
//     const normalizedFilter = this.state.filter.toLocaleLowerCase();
//     const filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//     return (
//       <>
//         <Form onSubmit={this.addContact} />
//         {this.state.contacts.length > 0 && (
//           <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
//         )}
//         {this.state.contacts.length > 1 && (
//           <Filter value={this.state.filter} onChange={this.changeFilter} />
//         )}
//       </>
//     );
//   }
// }
// export default Phonebook;
