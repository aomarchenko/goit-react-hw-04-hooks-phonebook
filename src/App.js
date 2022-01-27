import './App.css';
import Form from './components/form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import React, { Component } from 'react';
import shortid from 'shortid';
class Phonebook extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    if (localStorage.getItem('contacts') !== null) {
      const contacts = localStorage.getItem('contacts');
      const parcedContacts = JSON.parse(contacts);
      this.setState({ contacts: parcedContacts });
      console.log(parcedContacts);
    }
  }

  addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (
      this.state.contacts.map(contact => contact.name.toLowerCase()).includes(name.toLowerCase())
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({ contacts: [...prevState.contacts, newContact] }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return (
      <>
        <Form onSubmit={this.addContact} />
        {this.state.contacts.length > 0 && (
          <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
        )}
        {this.state.contacts.length > 1 && (
          <Filter value={this.state.filter} onChange={this.changeFilter} />
        )}
      </>
    );
  }
}
export default Phonebook;
