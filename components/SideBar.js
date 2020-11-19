import React, { useContext } from 'react';
import Link from 'next/link';

import { Avatar } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import SideBarItem from './SideBarItem';
import ButtonLink from './ButtonLink';

import styles from '../styles/SideBar.module.css';

import { GlobalContext } from '../pages/_app';

function SideBar() {
  const { globalState } = useContext(GlobalContext);
  const { user } = globalState;

  return (
    <section className={styles.sideBar}>
      <div className={styles.logo}>
        <img src={require('../public/koderlogo.png')} alt="Logo" />
      </div>
      {user ? (
        <>
          <SideBarItem link="/" text="Home" icon={<HomeOutlinedIcon />} />
          <SideBarItem link={`/bookmarks`} text="Bookmarks" icon={<BookmarkBorderIcon />} />
          <SideBarItem link={`/${user.userName}`} text="Profile" icon={<PersonOutlineIcon />} />
          <div className={styles.sideBarAvatarContainer}>
            <Avatar src={user?.picture} />
            <div>
              <span>{user?.fullName}</span>
              <small>@{user?.userName}</small>
              <Link href="/logout">
                <a>
                  <ExitToAppIcon /> Log out
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <ButtonLink
            link="/api/auth/google"
            text="Login With Google"
            icon={<PersonOutlineIcon />}
            color="rgb(212 38 102 / 47%)"
          />
          {/* <ButtonLink
            link="/api/auth/twitter"
            text="Login With Twitter"
            icon={<PersonOutlineIcon />}
            color="#1e90ff8f"
          />
          <ButtonLink
            link="/api/auth/github"
            text="Login With GitHub"
            icon={<PersonOutlineIcon />}
            color="#00000047"
          />
          <ButtonLink
            link="/api/auth/facebook"
            text="Login With FaceBook"
            icon={<PersonOutlineIcon />}
            color="#0000ff3d"
          /> */}
        </>
      )}
    </section>
  );
}

export default SideBar;
