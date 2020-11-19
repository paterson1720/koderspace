/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';

import styles from '../styles/ButtonLink.module.css';

function ButtonLink({ link, text, icon, color }) {
  return (
    <div className={styles.buttonLinkContainer} style={{ backgroundColor: color }}>
      <Link href={link} as={link}>
        <div className={styles.linkContent}>
          {icon ? <div className={styles.buttonLinkIconContainer}>{icon}</div> : null}
          <a className={styles.buttonLinkText}>{text}</a>
        </div>
      </Link>
    </div>
  );
}

export default ButtonLink;
