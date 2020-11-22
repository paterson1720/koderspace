/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import styles from '../styles/SearchBar.module.css';
function SearchInput({ handleSearch }) {
  const [searchValue, setSearchValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleSearch([]);
    setSearchValue('');
  };

  return (
    <div className={styles.inputContainer}>
      <SearchIcon className={styles.searchIcon} />
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search koderplace ..."
        />
      </form>
    </div>
  );
}

export default SearchInput;
