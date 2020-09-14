/* eslint-disable react/prop-types */
import React from 'react';
import ImageViewer from 'react-simple-image-viewer';

function PictureViewer({ images, currentImage, isViewerOpen, closeImageViewer }) {
    return (
        <div>
            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    backgroundStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)'
                    }}
                />
            )}
        </div>
    );
}

export default PictureViewer;
