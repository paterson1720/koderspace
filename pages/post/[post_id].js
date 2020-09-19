/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';

import MarkDownTextArea from '../../components/MarkDownTextArea';
import CodeEditor from '../../components/CodeEditor';
import CustomAvatar from '../../components/Avatar';
import Comment from '../../components/Comment';

import styles from '../../styles/Post.module.css';

import HttpService from '../../HttpService/index';
import { Link, Avatar } from '@material-ui/core';
import ImageViewer from '../../components/ImageViewer';

function PostDetails(props) {
    let { post, socket, user } = props;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [loading, setLoading] = useState(false);
    const commentsRef = useRef(comments);

    const fetchComments = async () => {
        const commentsResponse = await fetch(`/api/comments/${post._id}`);
        const { comments } = await commentsResponse.json();
        setComments(comments);
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!user?._id) return window.location.replace('/login');
        if (loading) return;
        const comment = { ...newComment, postId: post._id, user: user._id };
        if (!comment.description) return alert('Comment not valid');
        setLoading(true);
        const { error, data } = await HttpService.postData('/api/comments/create', comment);
        setLoading(false);
        if (error || data.error) return alert('Oops! An error happen, please try again.');
        setComments([...comments, data.comment]);
        socket.emit('NEW_COMMENT', data.comment);
        setNewComment({ description: '' });
    };

    const handleDeleteComment = async (id) => {
        const { error, data } = await HttpService.deleteData(`/api/comments/${id}`);
        if (error || data.error) return alert('Oops! An error happen, please try again.');
        const eventData = { commentId: id, room: post._id };
        socket.emit('COMMENT_DELETED', eventData);
        await fetchComments();
    };

    const handleCommentDeletedEvent = (id) => {
        const index = commentsRef.current.findIndex((comment) => comment._id === id);
        commentsRef.current.splice(index, 1);
        setComments([...commentsRef.current]);
    };

    const handleCommentTextAreaChange = (value) => {
        setNewComment({ description: value });
    };

    const commentHandler = (data) => {
        setComments([...commentsRef.current, data]);
    };

    useEffect(() => {
        commentsRef.current = comments;
    });

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        socket.emit('JOIN_COMMENT', post._id);
        socket.on('NEW_COMMENT', commentHandler);
        socket.on('COMMENT_DELETED', handleCommentDeletedEvent);
        return () => {
            socket.off('NEW_COMMENT', commentHandler);
            socket.off('COMMENT_DELETED', handleCommentDeletedEvent);
        };
    }, []);

    return (
        <>
            <div className={styles.postPageNavBar}>
                <Link href="/">
                    <a>
                        <img src={require('../../public/koderlogo.png')} alt="Logo" />
                    </a>
                </Link>
                {user && (
                    <div className={styles.navBarAvatarContainer}>
                        <Avatar src={user?.picture} style={{ width: '30px', height: '30px' }} />
                        <span className={styles.navBarUserName}>
                            <Link>
                                <a>{user?.fullName}</a>
                            </Link>
                        </span>
                    </div>
                )}
            </div>
            <div className={styles.container}>
                <div key={post?._id} className={styles.postContainer}>
                    <CustomAvatar
                        imageUrl={post?.user?.picture}
                        username={post?.user?.fullName}
                        date={moment(post?.createdAt).fromNow()}
                    />
                    <p className={styles.postDescription}>{post?.description}</p>

                    {post?.images?.length ? (
                        <div className={styles.imagesContainer}>
                            <ImageViewer images={post?.images} />
                        </div>
                    ) : null}

                    {post?.code?.length && (
                        <>
                            <div className={styles.editorExtensionTop}>
                                <span className={styles.codeLanguage}>{post?.codeLanguage}</span>
                            </div>
                            <CodeEditor
                                mode={post?.codeLanguage}
                                code={post?.code}
                                readOnly={true}
                                height="60vh"
                            />
                            <div className={styles.editorExtensionBottom} />
                        </>
                    )}
                    {/* <div className={styles.postFooter}>
                    <div className={styles.rateReviewIconContainer}>
                        <RateReviewIcon />
                        <span>10K Comments</span>
                    </div>
                </div> */}
                </div>
                <div className={styles.commentContainer}>
                    <ScrollToBottom
                        className={styles.comments}
                        followButtonClassName={styles.jumpToBottomButton}>
                        {comments?.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                onDelete={handleDeleteComment}
                            />
                        ))}
                    </ScrollToBottom>

                    <form className={styles.textAreaAndButtonWrapper} onSubmit={handleComment}>
                        <MarkDownTextArea
                            value={newComment?.description}
                            onChange={handleCommentTextAreaChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) handleComment(e);
                            }}
                        />
                        <button type="submit" className={styles.commentButton} disabled={loading}>
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PostDetails;

export async function getServerSideProps(context) {
    const END_POINT = process.env.API_ENDPOINT;
    const { post_id } = context.params;
    const postResponse = await fetch(`${END_POINT}/posts/${post_id}`);
    const { post } = await postResponse.json();
    return { props: { post } };
}
