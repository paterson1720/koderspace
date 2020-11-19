/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import styles from '../styles/Select.module.css';

function Select({ options, onChange }) {
  return (
    <select onChange={onChange} className={styles.select}>
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
