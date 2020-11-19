/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/Button.module.css';

function Button({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
