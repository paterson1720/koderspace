/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Link from 'next/link';

import RateReviewIcon from '@material-ui/icons/RateReview';

import Avatar from './Avatar';
import ImageViewer from './ImageViewer';
import CodeEditor from './CodeEditor';
import ConfirmDialog from './ConfirmDialog';
import PostEditor from './PostEditor';

import styles from '../styles/Home.module.css';
import HttpService from '../HttpService';
import moment from 'moment';

const formatNumber = (n) =>
    Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(n);

function Post({ post, user, fetchPosts, key }) {
    const [postToEdit, setPostToEdit] = useState(null);
    const [postToDelete, setPostToDelete] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPostEditor, setOpenPostEditor] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleEditPostClick = (post) => {
        setPostToEdit(post);
        setEditing(true);
        setOpenPostEditor(true);
    };

    const handleDeletePost = async (id) => {
        const { error, data } = await HttpService.deleteData(`/api/posts/${id}`);
        if (error || data.error) return alert('Oops! An error happen, please try again.');
        await fetchPosts();
        setOpenDialog(false);
    };

    const handlePostEditComplete = () => {
        setOpenPostEditor(false);
        fetchPosts();
    };

    return (
        <div key={key} className={styles.postContainer}>
            <Avatar
                imageUrl={post?.user.picture}
                username={post?.user?.fullName}
                date={moment(post?.createdAt).fromNow()}
                href={`/${post?.user?.userName}`}
            />
            <p className={styles.postDescription}>{post?.description}</p>

            {post?.images?.length ? (
                <div className={styles.imagesContainer}>
                    <ImageViewer images={post?.images} />
                </div>
            ) : null}

            {post?.code?.length && (
                <>
                    <div className={styles.editorExtensionTop} />
                    <CodeEditor
                        mode={post?.codeLanguage}
                        code={post?.code}
                        readOnly={true}
                        height="150px"
                        showGutter={false}
                        showLineNumbers={false}
                    />
                    <div className={styles.editorExtensionBottom} />
                </>
            )}

            <div className={styles.postFooter}>
                <div className={styles.rateReviewIconContainer}>
                    <RateReviewIcon />
                    <span>{formatNumber(post?.commentsCount)}</span>
                </div>
                <div className={styles.reviewButtonContainer}>
                    <Link href="/post/[post_id]" as={`/post/${post?._id}`}>
                        <a className={styles.reviewButton}> Review </a>
                    </Link>
                </div>
            </div>
            {user?._id === post?.user?._id && (
                <div className={styles.actionButtonsContainer}>
                    <button
                        className={styles.deletePostButton}
                        onClick={() => {
                            handleEditPostClick(post);
                        }}>
                        Edit
                    </button>
                    {' | '}
                    <button
                        className={styles.deletePostButton}
                        onClick={() => {
                            setPostToDelete(post._id);
                            setOpenDialog(true);
                        }}>
                        Delete
                    </button>
                </div>
            )}
            <ConfirmDialog
                title="Are you sure you want to delete this post ?"
                open={openDialog}
                setOpen={setOpenDialog}
                onConfirm={() => handleDeletePost(postToDelete)}
            />
            {editing && (
                <PostEditor
                    title="Edit Post"
                    open={openPostEditor}
                    setOpen={setOpenPostEditor}
                    setEditing={setEditing}
                    post={postToEdit}
                    user={user}
                    handlePostEditComplete={handlePostEditComplete}
                />
            )}
        </div>
    );
}

export default Post;
