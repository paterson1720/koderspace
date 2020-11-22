/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Layout from '../components/HomeLayout';
import Post from '../components/Post';

import styles from '../styles/Bookmarks.module.css';

function Bookmarks(props) {
  let { user, bookmarks } = props;
  const [userBookmarks, setUserBookmarks] = useState(bookmarks);

  const fetchBookmarks = async () => {
    if (!user) return;
    const response = await fetch(`/api/bookmarks/${user?._id}`);
    const { bookmarks } = await response.json();
    console.log(bookmarks);
    setUserBookmarks(bookmarks);
  };

  return (
    <Layout>
      <div className={styles.bookmarksContainer}>
        {userBookmarks?.length ? (
          userBookmarks?.map(({ _id, post }) => (
            <Post post={post} user={user} fetchPosts={fetchBookmarks} key={_id} bookmarkId={_id} />
          ))
        ) : (
          <p>YOU HAVE NOT SAVE ANY BOOKMARK YET</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const END_POINT = process.env.API_ENDPOINT;
  const { user } = ctx.req;
  const response = await fetch(`${END_POINT}/bookmarks/${user._id}`);
  const { bookmarks } = await response.json();
  console.log(bookmarks);
  return { props: { bookmarks } };
}

export default Bookmarks;
