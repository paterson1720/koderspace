import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import styles from '../styles/SideBar.module.css';
import SideBarItem from './SideBarItem';
import { useRouter } from 'next/router';

function SideBar() {
    const { pathname } = useRouter();
    const postPage = pathname.match(/post/);

    return (
        <section className={postPage ? styles.postPageSideBar : styles.sideBar}>
            <div className={postPage ? styles.postPageLogo : styles.logo}>
                <img src="/koderlogo.png" alt="Logo" />
            </div>
            <SideBarItem link="/" text="Home" icon={<HomeIcon />} />
            <SideBarItem link="#" text="Profile" icon={<PersonOutlineIcon />} />
            {/*  <SideBarItem link="#" text="Notifications" icon={<NotificationsNoneIcon />} /> */}
        </section>
    );
}

export default SideBar;
