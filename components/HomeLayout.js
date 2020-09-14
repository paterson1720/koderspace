/* eslint-disable react/prop-types */
import React from 'react';

import styles from '../styles/Layout.module.css';
import SideBar from './SideBar';
import Header from './Header';

function Layout({ children: content }) {
    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <SideBar />
                <section className={styles.contentArea}>
                    <Header />
                    {content}
                </section>
                <section className={styles.tagsContainer}>
                    <div>TAGS</div>
                    <span>CSS</span>
                    <span>React</span>
                    <span>Javascript</span>
                </section>
            </div>
        </main>
    );
}

export default Layout;
