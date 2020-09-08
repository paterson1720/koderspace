import React from 'react';
import SearchBar from './SearchBar';
import styles from '../styles/Header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <SearchBar />
        </div>
    );
}

export default Header;
