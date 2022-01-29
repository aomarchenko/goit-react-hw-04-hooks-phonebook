import { useState, useEffect } from 'react';
import shortid from 'shortid';
import styles from './Form.module.css';

export default function Form(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputId = shortid.generate();

  const handleInputNameChange = event => {
    console.log(event.currentTarget.value);
    setName(event.currentTarget.value);
  };
  const handleInputNumberChange = event => {
    console.log(event.currentTarget.value);
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    props.onSubmit(name, number);

    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <>
      <h1 className={styles.formTitle}>Phonebook</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor={inputId}>
          Name
          <input
            className={styles.input}
            id={inputId}
            type="text"
            name="name"
            value={name}
            onChange={handleInputNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label} htmlFor={inputId}>
          Number
          <input
            className={styles.input}
            id={inputId}
            value={number}
            onChange={handleInputNumberChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}
