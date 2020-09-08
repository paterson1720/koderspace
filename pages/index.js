/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import RateReviewIcon from '@material-ui/icons/RateReview';

import styles from '../styles/Home.module.css';
import Layout from '../components/HomeLayout';
import CodeEditor from '../components/CodeEditor';
import Editor from '../components/Editor';
import Avatar from '../components/Avatar';

import HttpService from '../HttpService/index';

const user = {
    username: 'Sage',
    email: '',
    imageUrl: 'https://i.pinimg.com/originals/6c/09/0f/6c090f6bdb01fa8e15a6fcd3cd2f6043.jpg'
};
const options = [
    'JavaScript',
    'Java',
    'Ruby',
    'Python',
    'Csharp',
    'Golang',
    'CSS',
    'HTML',
    'Coffee',
    'Handlebars'
];

const defaultCode = `// Share some code with us...`;

export default function Home(props) {
    const socket = props.socket;
    const [posts, setPosts] = useState(props.posts);
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [newPost, setNewPost] = useState({ codeLanguage });

    const publishPost = async () => {
        const postIsValid = !!newPost.code || !!newPost.description;
        const post = { ...newPost };
        if (post.code) post.code = post.code + '\r\r';
        if (!postIsValid) return alert('Post not valid!');
        const { error, data } = await HttpService.postData('/api/posts/create', post);
        if (error) return alert('An error occured. Please try later');
        setNewPost({ codeLanguage, description: '' });
        socket.emit('NEW_POST', data.post);
        setPosts([data.post, ...posts]);
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
    useEffect(() => {
        socket.on('NEW_POST', (data) => {
            setPosts([data, ...posts]);
        });

        return () => {
            socket.off('NEW_POST');
        };
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <Editor
                    mode={codeLanguage}
                    code={newPost.code || defaultCode}
                    options={options}
                    readOnly={false}
                    onEditorChange={onEditorChange}
                    onTextAreaChange={onTextAreaChange}
                    textAreaValue={newPost.description}
                    onModeChange={onModeChange}
                    showOptions={true}
                    height="200px"
                    onPublish={publishPost}
                />

                <h1>Recent Posts</h1>
                {posts?.map((post) => (
                    <div key={post?._id} className={styles.postContainer}>
                        <Avatar
                            imageUrl={user.imageUrl}
                            username={user.username}
                            date="2 days ago"
                        />
                        <p className={styles.postDescription}>{post?.description}</p>

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
                                <span>10K Comments</span>
                            </div>
                            <div className={styles.reviewButtonContainer}>
                                <Link href="/post/[post_id]" as={`/post/${post?._id}`}>
                                    <a className={styles.reviewButton}> Comment </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const END_POINT = process.env.API_ENDPOINT;
    const response = await fetch(`${END_POINT}/posts`);
    const { posts } = await response.json();
    return { props: { posts } };
}
