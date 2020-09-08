/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/Avatar.module.css';

function Avatar({ imageUrl, username, date }) {
    return (
        <div className={styles.avatarContainer}>
            <img src={imageUrl} alt={`${username}`} />
            <div>
                <p>{username} </p>
                <span>{date}</span>
            </div>
        </div>
    );
}

export default Avatar;
