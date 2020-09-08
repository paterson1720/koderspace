/* eslint-disable no-unused-vars */
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import styles from '../styles/SearchBar.module.css';
function SearchBar() {
    return (
        <div className={styles.inputContainer}>
            <SearchIcon className={styles.searchIcon} />
            <input
                className={styles.input}
                type="search"
                placeholder="Search koderplace ..."></input>
        </div>
    );
}

export default SearchBar;
