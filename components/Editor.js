/* eslint-disable react/prop-types */
import React from 'react';

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

import styles from '../styles/Editor.module.css';
import TextArea from './TextArea';

function Editor({
    mode,
    code,
    options = [],
    onModeChange,
    onEditorChange,
    onTextAreaChange,
    textAreaValue,
    readOnly,
    height,
    onPublish
}) {
    return (
        <>
            <div className={styles.textAreaContainer}>
                <TextArea
                    placeholder="Write a description (optional)..."
                    value={textAreaValue}
                    onChange={onTextAreaChange}
                />
            </div>

            <div className={styles.editorHeader}>
                <Select options={options} onChange={onModeChange} />
            </div>

            <CodeEditor
                code={code}
                mode={mode}
                readOnly={readOnly}
                height={height}
                onChange={onEditorChange}
            />

            <div className={styles.publishBtnContainer}>
                <Button text="Publish" onClick={onPublish} />
            </div>
        </>
    );
}

export default Editor;
