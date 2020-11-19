/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import styles from '../styles/Comment.module.css';
import CodeBlock from './CodeBlock';
import { Avatar, Link } from '@material-ui/core';
import { GlobalContext } from '../pages/_app';
import ConfirmDialog from './ConfirmDialog';

function Comment({ comment, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { globalState } = useContext(GlobalContext);
  const { user } = globalState;
  return (
    <div className={styles.comment}>
      <div className={styles.commentAvatarContainer}>
        <Avatar
          src={comment?.user?.picture}
          alt={comment?.user?.fullName}
          style={{ width: '30px', height: '30px' }}
        />
        <Link>
          <a className={styles.commenterName} href={`/${comment?.user?.userName}`}>
            {comment?.user?.fullName}
          </a>
        </Link>
        <span className={styles.commentTime}> {moment(comment?.createdAt).fromNow()}</span>
      </div>
      <ReactMarkdown renderers={{ code: CodeBlock }} source={comment.description} />
      {user?._id === comment?.user?._id && (
        <button className={styles.deleteCommentButton} onClick={() => setOpenDialog(true)}>
          Delete
        </button>
      )}
      <ConfirmDialog
        title="Are you sure you want to delete this comment ?"
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={() => onDelete(comment._id)}
      />
    </div>
  );
}

export default Comment;
