/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import Link from 'next/link';

import RateReviewIcon from '@material-ui/icons/RateReview';
import { CircularProgress } from '@material-ui/core';

import Layout from '../components/HomeLayout';
import CodeEditor from '../components/CodeEditor';
import Editor from '../components/Editor';
import Avatar from '../components/Avatar';
import ImageViewer from '../components/ImageViewer';

import styles from '../styles/Home.module.css';
import HttpService from '../HttpService';
import ConfirmDialog from '../components/ConfirmDialog';

import { options } from '../variables';
import PostEditor from '../components/PostEditor';

const editorPlaceHolder = `// Share some code with us...`;
const formatNumber = (n) =>
    Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(n);

export default function Home(props) {
    const { user } = props;
    const [posts, setPosts] = useState(props.posts);
    const [postToEdit, setPostToEdit] = useState(null);
    const [postToDelete, setPostToDelete] = useState(null);
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [newPost, setNewPost] = useState({ codeLanguage });
    const [attachedImages, setAttachedImages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openPostEditor, setOpenPostEditor] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const inputImageRef = useRef(null);

    const getFormData = () => {
        const formData = new FormData();
        formData.append('user', user?._id);
        if (newPost?.code?.trim()) formData.append('code', newPost.code);
        formData.append('description', newPost.description);
        formData.append('codeLanguage', codeLanguage);
        if (attachedImages.length) {
            attachedImages.forEach(({ file }) => formData.append('file', file));
        }
        return formData;
    };

    const publishPost = async () => {
        if (loading) return;
        const postIsValid = !!newPost.code || !!newPost.description;
        const post = { ...newPost, user: user?._id };
        if (post.code) post.code = post.code + '\r\r';
        if (!postIsValid) return alert('Post not valid!');
        setLoading(true);
        const result = await fetch('/api/posts/create', {
            method: 'POST',
            body: getFormData()
        });
        const { error, post: data } = await result.json();
        setLoading(false);
        if (error) return alert('An error occured. Please try later');
        setAttachedImages([]);
        setNewPost({ codeLanguage, description: '', code: ' ' });
        setPosts([data, ...posts]);
    };

    const handleFileUpload = async (e) => {
        let images = [...e.target.files].slice(0, 4);
        let fileObjects = [];
        images.forEach((file) => {
            fileObjects.push({ url: URL.createObjectURL(file), file });
        });
        setAttachedImages([...attachedImages, ...fileObjects]);
        if (attachedImages.length > 3) {
            setAttachedImages([...attachedImages].slice(0, 4));
            alert('OOPS! You can only attach 4 images.');
        }
    };

    const fetchPosts = async () => {
        const postsResponse = await fetch(`/api/posts`);
        const { posts } = await postsResponse.json();
        setPosts(posts);
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

    const handleEditPostClick = (post) => {
        setPostToEdit(post);
        setEditing(true);
        setOpenPostEditor(true);
    };
    const onModeChange = (e) => {
        setCodeLanguage(e.target.value);
    };
    const onEditorChange = (value) => {
        setNewPost({ ...newPost, code: value, codeLanguage });
    };
    const onTextAreaChange = (e) => {
        setNewPost({ ...newPost, description: e.target.value });
    };

    return (
        <Layout>
            <div className={styles.container}>
                {loading && <CircularProgress />}

                {user && (
                    <Editor
                        editorPlaceHolder={editorPlaceHolder}
                        mode={codeLanguage}
                        code={newPost.code}
                        options={options}
                        readOnly={false}
                        onEditorChange={onEditorChange}
                        onTextAreaChange={onTextAreaChange}
                        textAreaValue={newPost.description}
                        onModeChange={onModeChange}
                        showOptions={true}
                        height="200px"
                        onPublish={publishPost}
                        loading={loading}
                        attachedImages={attachedImages}
                        setAttachedImages={setAttachedImages}
                        onImageIconClick={() => inputImageRef.current.click()}
                    />
                )}

                {posts?.map((post) => (
                    <div key={post?._id} className={styles.postContainer}>
                        <Avatar
                            imageUrl={post?.user.picture}
                            username={post?.user?.fullName}
                            date={post?.createdAt}
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
                                    height="200px"
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
                                    <a className={styles.reviewButton}> Comment </a>
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
                    </div>
                ))}
            </div>

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

            <input
                type="file"
                name="file"
                ref={inputImageRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                multiple
            />
        </Layout>
    );
}

export async function getServerSideProps() {
    const END_POINT = process.env.API_ENDPOINT;
    const response = await fetch(`${END_POINT}/posts`);
    const { posts } = await response.json();
    return { props: { posts } };
}
