/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../styles/Comment.module.css';
import CodeBlock from './CodeBlock';

function Comment({ comment }) {
    return (
        <div className={styles.comment}>
            <ReactMarkdown renderers={{ code: CodeBlock }} source={comment} />
        </div>
    );
}

export default Comment;
