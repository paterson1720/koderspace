import React, { useContext } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import styles from '../styles/SideBar.module.css';
import SideBarItem from './SideBarItem';
import ButtonLink from './ButtonLink';

import { GlobalContext } from '../pages/_app';

function SideBar() {
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    return (
        <section className={styles.sideBar}>
            <div className={styles.logo}>
                <img src={require('./koderlogo.png')} alt="Logo" />
            </div>
            {user ? (
                <>
                    <SideBarItem link="/" text="Home" icon={<HomeIcon />} />
                    <SideBarItem link="#" text="Profile" icon={<PersonOutlineIcon />} />
                </>
            ) : (
                <>
                    <ButtonLink
                        link="/api/auth/google"
                        text="Login With Google"
                        icon={<PersonOutlineIcon />}
                        color="rgb(212 38 102 / 47%)"
                    />
                    <ButtonLink
                        link="/api/auth/google"
                        text="Login With Twitter"
                        icon={<PersonOutlineIcon />}
                        color="#1e90ff8f"
                    />
                    <ButtonLink
                        link="/api/auth/google"
                        text="Login With GitHub"
                        icon={<PersonOutlineIcon />}
                        color="#00000047"
                    />
                    <ButtonLink
                        link="/api/auth/google"
                        text="Login With FaceBook"
                        icon={<PersonOutlineIcon />}
                        color="#0000ff3d"
                    />
                </>
            )}
        </section>
    );
}

export default SideBar;
