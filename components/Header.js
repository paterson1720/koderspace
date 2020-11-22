import React from 'react';
import { useRouter } from 'next/router';

import SearchInput from './HeaderSearchInput';
import styles from '../styles/Header.module.css';

// eslint-disable-next-line react/prop-types
function Header({ onSearch }) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      {router.pathname === '/' ? <SearchInput handleSearch={onSearch} /> : null}
    </div>
  );
}

export default Header;
