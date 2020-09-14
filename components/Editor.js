/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ImageIcon from '@material-ui/icons/Image';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-sass';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-coffee';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

import Select from './Select';
import Button from './Button';
import CodeEditor from './CodeEditor';
import TextArea from './TextArea';
import ImageAttachementPreview from './imageAttachementPreview';

import styles from '../styles/Editor.module.css';

function Editor({
    mode,
    code,
    options = [],
    onModeChange,
    onEditorChange,
    editorPlaceHolder,
    onTextAreaChange,
    textAreaValue,
    readOnly,
    height,
    onPublish,
    loading,
    attachedImages,
    setAttachedImages,
    onImageIconClick
}) {
    const [showCodeEditor, setShowCodeEditor] = useState(false);
    return (
        <>
            <div className={styles.textAreaContainer}>
                <TextArea
                    placeholder="Write a short description of your post..."
                    value={textAreaValue}
                    onChange={onTextAreaChange}
                />
            </div>

            {!loading && attachedImages && attachedImages.length ? (
                <div className={styles.attachementPreviewContainer}>
                    {attachedImages.map(({ url }, index) => (
                        <ImageAttachementPreview
                            key={index}
                            src={url}
                            onDelete={() => {
                                const images = [...attachedImages];
                                if (images.length <= 1) setAttachedImages([]);
                                images.splice(index, 1);
                                setAttachedImages(images);
                            }}
                        />
                    ))}
                </div>
            ) : null}

            <div className={styles.editorHeader}>
                {showCodeEditor && <Select options={options} onChange={onModeChange} />}
                <div
                    role="button"
                    tabIndex={-1}
                    className={styles.iconContainer}
                    onKeyDown={(e) => e.key === 'Enter' && setShowCodeEditor(!showCodeEditor)}
                    onClick={() => setShowCodeEditor(!showCodeEditor)}>
                    <CodeOutlinedIcon />
                    {showCodeEditor ? 'Hide Code Editor' : 'Show Code Editor'}
                </div>

                <div
                    role="button"
                    tabIndex={-2}
                    className={styles.iconContainer}
                    onClick={onImageIconClick}
                    onKeyDown={(e) => e.key === 'Enter' && onImageIconClick()}>
                    <ImageIcon />
                    Attach Images
                </div>
            </div>

            {showCodeEditor && (
                <CodeEditor
                    code={code}
                    mode={mode}
                    readOnly={readOnly}
                    height={height}
                    onChange={onEditorChange}
                    placeholder={editorPlaceHolder}
                />
            )}

            <div className={styles.publishBtnContainer}>
                <Button text="Publish" onClick={onPublish} />
            </div>
        </>
    );
}

export default Editor;
