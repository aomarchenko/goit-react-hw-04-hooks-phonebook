import { useState, useEffect } from 'react';
import shortid from 'shortid';
import styles from './Form.module.css';

export default function Form(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);

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
    setContacts([]);
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

// import React, { Component } from 'react';
// import shortid from 'shortid';
// import styles from './Form.module.css';

// class Form extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     number: '',
//   };

//   inputId = shortid.generate();

//   handleInputChange = event => {
//     this.setState({ [event.currentTarget.name]: event.currentTarget.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state.name, this.state.number);

//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       contacts: [],
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     return (
//       <>
//         <h1 className={styles.formTitle}>Phonebook</h1>
//         <form className={styles.form} onSubmit={this.handleSubmit}>
//           <label className={styles.label} htmlFor={this.inputId}>
//             Name
//             <input
//               className={styles.input}
//               id={this.inputId}
//               type="text"
//               name="name"
//               value={this.state.name}
//               onChange={this.handleInputChange}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//           </label>
//           <label className={styles.label} htmlFor={this.inputId}>
//             Number
//             <input
//               className={styles.input}
//               id={this.inputId}
//               value={this.state.number}
//               onChange={this.handleInputChange}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </label>
//           <button className={styles.button} type="submit">
//             Add contact
//           </button>
//         </form>
//       </>
//     );
//   }
// }

// export default Form;
