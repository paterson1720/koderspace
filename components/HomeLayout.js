/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import styles from '../styles/Layout.module.css';
import SideBar from './SideBar';
import Header from './Header';
import BottomNavItem from './BottomNavItem';

import { GlobalContext } from '../pages/_app';

function Layout({ children: content }) {
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <SideBar />
                <section className={styles.contentArea}>
                    <Header />
                    {content}
                </section>
                <section className={styles.tagsContainer}>
                    <div className={styles.tagsHeader}>
                        <h3>FILTER POSTS BY TAGS</h3>
                    </div>
                    <div className={styles.tagItems}>
                        <span className={styles.tagItem}>CSS</span>
                        <span className={styles.tagItem}>REACT</span>
                        <span className={styles.tagItem}>JAVASCRIPT</span>
                        <span className={styles.tagItem}>HTML</span>
                        <span className={styles.tagItem}>PYTHON</span>
                        <span className={styles.tagItem}>RUBY</span>
                        <span className={styles.tagItem}>CSHARP</span>
                        <span className={styles.tagItem}>GOLANG</span>
                        <span className={styles.tagItem}>JAVA</span>
                        <span className={styles.tagItem}>COFFE</span>
                        <span className={styles.tagItem}>HANDLEBARS</span>
                    </div>
                </section>
            </div>
            <nav className={styles.bottomNav}>
                <BottomNavItem icon={<HomeOutlinedIcon fontSize="large" />} link="/" />
                <BottomNavItem
                    icon={<PersonOutlineIcon fontSize="large" />}
                    link={`/${user.userName}`}
                />
                <BottomNavItem icon={<BookmarkBorderIcon fontSize="large" />} link="/bookmarks" />
            </nav>
        </main>
    );
}

export default Layout;
