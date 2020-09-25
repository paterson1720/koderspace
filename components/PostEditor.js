/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';

import Dialog from './Dialog';
import Editor from './Editor';
import { options } from '../variables';
import HttpService from '../HttpService';
import styles from '../styles/PostEditor.module.css';
import { CircularProgress } from '@material-ui/core';

const PostEditor = (props) => {
    const { open, setOpen, setEditing, post, user, handlePostEditComplete } = props;
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [newPost, setNewPost] = useState({ ...post });
    const [loading, setLoading] = useState(false);

    const inputImageRef = useRef(null);

    const publishPost = async () => {
        if (loading) return;
        const postIsValid = !!newPost.code || !!newPost.description;
        const post = { ...newPost, user: user?._id };
        if (post.code) post.code = post.code + '\r\r';
        if (!postIsValid) return alert('Post not valid!');
        setLoading(true);
        const { error, data } = await HttpService.postData(
            `/api/posts/edit/${newPost._id}`,
            newPost
        );
        setLoading(false);
        if (error) return alert('An error occured. Please try later');
        setNewPost({ codeLanguage, description: '', code: ' ' });
        handlePostEditComplete(data);
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
    const handleModalClose = () => {
        setOpen(false);
        setEditing(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleModalClose}
            maxWidth="md"
            title="Edit Post"
            turnOnfullScreenOnSize="sm"
            fullWidth={true}
            aria-labelledby="confirm-dialog">
            {!loading ? (
                <div className={styles.postEditorContainer}>
                    <Editor
                        mode={codeLanguage}
                        code={newPost?.code}
                        options={options}
                        readOnly={false}
                        onEditorChange={onEditorChange}
                        onTextAreaChange={onTextAreaChange}
                        textAreaValue={newPost?.description}
                        onModeChange={onModeChange}
                        showOptions={true}
                        height="200px"
                        onPublish={publishPost}
                        loading={loading}
                        // attachedImages={newPost?.images?.map((i) => ({ url: i }))}
                        onImageIconClick={() => inputImageRef.current.click()}
                    />
                </div>
            ) : (
                <CircularProgress />
            )}
        </Dialog>
    );
};
export default PostEditor;
