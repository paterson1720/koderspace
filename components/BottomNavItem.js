/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/SideBarItem.module.css';

function BottomNavItem({ link, displayLink, icon }) {
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
        {icon}
      </Link>
    </div>
  );
}

export default BottomNavItem;
