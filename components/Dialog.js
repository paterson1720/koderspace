/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/Dialog.module.css';

function Dialog({ open, children }) {
    return (
        <div className={styles.dialogContainer} style={{ display: open ? '' : 'none' }}>
            {children}
        </div>
    );
}

export default Dialog;
