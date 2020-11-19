/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/AttachementPreview.module.css';
function ImageAttachementPreview({ src, key, onDelete }) {
  return (
    <div className={styles.imageItemPreview} key={key} style={{ backgroundImage: `url(${src})` }}>
      <button className={styles.removeImageButton} onClick={onDelete}>
        X
      </button>
    </div>
  );
}

export default ImageAttachementPreview;
