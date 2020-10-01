/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/Avatar.module.css';
import Link from 'next/link';

function Avatar({ imageUrl, username, date, href }) {
    return (
        <div className={styles.avatarContainer}>
            <img src={imageUrl} alt={`${username}`} />
            <div>
                <Link href={href}>
                    <p>{username} </p>
                </Link>
                <span>{date}</span>
            </div>
        </div>
    );
}

export default Avatar;
