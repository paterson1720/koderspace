/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';

import CodeEditor from '../../components/CodeEditor';
import Avatar from '../../components/Avatar';

import styles from '../../styles/Post.module.css';
import Comment from '../../components/Comment';

const user = {
    username: 'Sage',
    email: '',
    imageUrl: 'https://i.pinimg.com/originals/6c/09/0f/6c090f6bdb01fa8e15a6fcd3cd2f6043.jpg'
};

function MarkDownTexArea({ onChange, value }) {
    return (
        <SimpleMDE
            id="commentTextArea"
            value={value}
            onChange={onChange}
            options={{
                showIcons: ['code', 'bold', 'italic'],
                minHeight: '100px',
                autofocus: true,
                spellChecker: false,
                hideIcons: [
                    'strikethrough',
                    'heading',
                    'quote',
                    'unordered-list',
                    'ordered-list',
                    'side-by-side',
                    'fullscreen'
                ]
            }}
        />
    );
}

function PostDetails(props) {
    const { post, socket } = props;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});

    const handleComment = () => {
        setComments([...comments, newComment]);
        setNewComment({ description: '' });
    };

    const handleCommentTextAreaChange = (value) => {
        setNewComment({ description: value });
    };
    useEffect(() => {
        socket.on('NEW_COMMENT', (data) => {
            setComments([data, ...comments]);
        });
        return () => {
            socket.off('NEW_COMMENT');
        };
    }, []);
    return (
        <>
            <div className={styles.container}>
                <div key={post?._id} className={styles.postContainer}>
                    <Avatar
                        imageUrl={user.imageUrl}
                        username={user.username}
                        date={post?.createdAt}
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
                                height="75vh"
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
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment?.description} />
                        ))}
                    </div>
                    <div className={styles.textAreaAndButtonWrapper}>
                        <MarkDownTexArea
                            value={newComment.description}
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
    const response = await fetch(`${END_POINT}/posts/${post_id}`);
    const { post } = await response.json();
    return { props: { post } };
}
