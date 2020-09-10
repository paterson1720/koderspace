/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import styles from '../styles/Comment.module.css';
import CodeBlock from './CodeBlock';
import { Avatar, Link } from '@material-ui/core';

function Comment({ comment }) {
    return (
        <div className={styles.comment}>
            <div className={styles.commentAvatarContainer}>
                <Avatar
                    src={comment?.user?.picture}
                    alt={comment?.user?.fullName}
                    style={{ width: '30px', height: '30px' }}
                />
                <Link>
                    <a className={styles.commenterName}>{comment?.user?.fullName}</a>
                </Link>
                <span className={styles.commentTime}> {moment(comment?.createdAt).fromNow()}</span>
            </div>
            <ReactMarkdown renderers={{ code: CodeBlock }} source={comment.description} />
        </div>
    );
}

export default Comment;
