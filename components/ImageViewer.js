/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import styles from '../styles/ImageViewer.module.css';

function ImageViewer({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openViewer, setOpenViewer] = useState(false);

    const handleNextButtonClick = () => {
        if (currentImageIndex < images.length - 1) setCurrentImageIndex(currentImageIndex + 1);
    };

    const handlePrevButtonClick = () => {
        if (currentImageIndex) setCurrentImageIndex(currentImageIndex - 1);
    };

    return (
        <>
            {images?.map((src, index) => (
                <div
                    className={styles.imageItem}
                    role="presentation"
                    key={index}
                    style={{ backgroundImage: `url(${src})` }}
                    onClick={() => {
                        setOpenViewer(true);
                        setCurrentImageIndex(index);
                    }}
                />
            ))}
            <div className={styles.imageViewer} style={{ display: openViewer ? 'flex' : 'none' }}>
                <button className={styles.closeButton} onClick={() => setOpenViewer(false)}>
                    X
                </button>
                <img src={images[currentImageIndex]} alt="post-img" />
                <button className={styles.buttonPrev} onClick={handlePrevButtonClick}>
                    &#60;
                </button>
                <button className={styles.buttonNext} onClick={handleNextButtonClick}>
                    &#62;
                </button>
            </div>
        </>
    );
}

export default ImageViewer;
