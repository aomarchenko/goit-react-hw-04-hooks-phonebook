import React from 'react';
import styles from './ContactList.module.css';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.list}>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button className={styles.button} onClick={() => onDeleteContact(contact.id)}>
          Delete contact
        </button>
      </li>
    ))}
  </ul>
);
export default ContactList;
