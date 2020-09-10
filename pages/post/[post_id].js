/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

import MarkDownTextArea from '../../components/MarkDownTextArea';
import CodeEditor from '../../components/CodeEditor';
import Avatar from '../../components/Avatar';
import Comment from '../../components/Comment';

import styles from '../../styles/Post.module.css';

import HttpService from '../../HttpService/index';

function PostDetails(props) {
    const { post, postComments, socket, user } = props;
    const [comments, setComments] = useState(postComments);
    const [newComment, setNewComment] = useState({});
    const commentsRef = useRef(comments);

    const handleComment = async () => {
        const comment = { ...newComment, postId: post._id, user: user._id };
        if (!comment.description) return alert('Comment not valid');
        const { error, data } = await HttpService.postData('/api/comments/create', comment);
        if (error) alert('Oops! An error happen, please try again.');
        setComments([...comments, data.comment]);
        socket.emit('NEW_COMMENT', data.comment);
        setNewComment({ description: '' });
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
        socket.emit('JOIN_COMMENT', post._id);
        socket.on('NEW_COMMENT', commentHandler);
        return () => {
            socket.off('NEW_COMMENT', commentHandler);
        };
    }, []);

    return (
        <>
            <div className={styles.postPageNavBar}>Post Page Header</div>
            <div className={styles.container}>
                <div key={post?._id} className={styles.postContainer}>
                    <Avatar
                        imageUrl={post?.user?.picture}
                        username={post?.user?.fullName}
                        date={moment(post?.createdAt).fromNow()}
                    />
                    <p className={styles.postDescription}>{post?.description}</p>

                    {post?.code?.length && (
                        <>
                            <div className={styles.editorExtensionTop}>
                                <span className={styles.codeLanguage}>{post?.codeLanguage}</span>
                            </div>
                            <CodeEditor
                                mode={post?.codeLanguage}
                                code={post?.code}
                                readOnly={true}
                                height="70vh"
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
                    <div className={styles.comments}>
                        {comments?.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))}
                    </div>
                    <div className={styles.textAreaAndButtonWrapper}>
                        <MarkDownTextArea
                            value={newComment?.description}
                            onChange={handleCommentTextAreaChange}
                        />
                        <button className={styles.commentButton} onClick={handleComment}>
                            Add Comment
                        </button>
                    </div>
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
    const commentsResponse = await fetch(`${END_POINT}/comments/${post_id}`);
    const { post } = await postResponse.json();
    const { comments } = await commentsResponse.json();
    return { props: { post, postComments: comments } };
}
