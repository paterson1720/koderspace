/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';

import { CircularProgress } from '@material-ui/core';

import Layout from '../components/HomeLayout';
import Editor from '../components/Editor';
import Post from '../components/Post';
import styles from '../styles/Home.module.css';

import { options } from '../variables';

const editorPlaceHolder = `// Share some code with us...`;

export default function Home(props) {
    const { user } = props;
    const [posts, setPosts] = useState(props.posts);
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [newPost, setNewPost] = useState({ codeLanguage });
    const [attachedImages, setAttachedImages] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    <Post post={post} user={user} fetchPosts={fetchPosts} key={post?._id} />
                ))}
            </div>

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
