/* eslint-disable react/prop-types */
import React from 'react';
import AceEditor from 'react-ace';

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

// import styles from '../styles/Editor.module.css';

function CodeEditor({ mode, code, onChange, readOnly, height }) {
    return (
        <>
            {/* <div className={styles.editorExtensionTop} /> */}
            <AceEditor
                value={code}
                mode={mode}
                readOnly={readOnly}
                height={height}
                theme="monokai"
                fontSize={16}
                width="90%"
                onChange={onChange}
                name="ace_editor_div"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: false,
                    showGutter: false
                }}
            />
            {/* <div className={styles.editorExtensionBottom} /> */}
        </>
    );
}

export default CodeEditor;
