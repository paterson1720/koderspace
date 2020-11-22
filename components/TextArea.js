/* eslint-disable react/prop-types */
import React from 'react';

import styles from '../styles/TextArea.module.css';
function TextArea({ placeholder, onChange, value, onFocus }) {
  return (
    <textarea
      value={value}
      className={styles.textarea}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}

export default TextArea;
