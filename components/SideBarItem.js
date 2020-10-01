/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/SideBarItem.module.css';

function SideBarItem({ link, displayLink, text, icon }) {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsActive(router.asPath == link || router.pathname === link);
        return () => {
            setIsActive(false);
        };
    }, [router.pathname]);

    return (
        <div className={isActive ? styles.activeLink : ''}>
            <Link href={link} as={displayLink ? displayLink : link}>
                <div className={styles.linkContent}>
                    {icon ? <div className={styles.iconContainer}>{icon}</div> : null}
                    <a className={styles.sideBarItemText}>{text}</a>
                </div>
            </Link>
        </div>
    );
}

export default SideBarItem;
