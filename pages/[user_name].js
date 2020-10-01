/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from '../components/HomeLayout';
import { Avatar, useTheme } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import CustomTab from '../components/Tab';
import TabPanel from '../components/TabPanel';
import Post from '../components/Post';

import styles from '../styles/Profile.module.css';
import ProfileEditor from '../components/ProfileEditor';
import HttpService from '../HttpService';

const avatarStyle = {
    width: '150px',
    height: '150px'
};

function Profile(props) {
    const { user: loggedInUser, profileUser, posts } = props;
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(profileUser);
    const [userPosts, setUserPosts] = useState(posts);
    const [loading, setLoading] = useState(true);
    const [openProfileEditor, setOpenEditProfileEditor] = useState(false);
    const [isFollower, setIsFollower] = useState(false);
    const theme = useTheme();

    const isSameUser = () => user?._id === loggedInUser?._id;

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeTabIndex = (index) => {
        setValue(index);
    };

    const toggleFollow = async () => {
        if (!loggedInUser) window.location.replace('/login');
        const endpoint = isFollower ? 'unfollow' : 'follow';
        const { error, data } = await HttpService.postData(`/api/users/${endpoint}`, {
            userId: loggedInUser._id,
            followedUserId: profileUser._id
        });
        if (error) return alert('An error occured. Please try again later!');
        const { isFollowing, unfollowed, followed } = data;
        if (unfollowed) setUser({ ...user, followersCount: --user.followersCount });
        if (followed) setUser({ ...user, followersCount: ++user.followersCount });
        setIsFollower(isFollowing);
    };

    const fetchPosts = async () => {
        const postsResponse = await fetch(`/api/posts/user/${user?._id}`);
        const { posts } = await postsResponse.json();
        setUserPosts(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const checkIfIsFollowing = async () => {
            if (!loggedInUser || isSameUser()) return;
            const response = await fetch(
                `/api/users/checkfollower/${loggedInUser._id}/${profileUser._id}`
            );
            const { isFollowing } = await response.json();
            setIsFollower(isFollowing);
            setLoading(false);
        };
        checkIfIsFollowing();
    }, []);

    return (
        <Layout>
            <div className={styles.userInfo}>
                <Avatar style={avatarStyle} src={user?.picture} />
                <h2 className={styles.userName}>
                    {user?.fullName || `${user?.givenName} ${user?.familyName}`}
                </h2>
                <small className={styles.grayText}>@{user?.userName}</small>
                <small className={styles.grayText}>
                    <span>
                        <DateRangeIcon />
                        Joined {moment(user?.createdAt).format('MMMM YYYY')}
                    </span>
                    {user?.location ? (
                        <span>
                            <LocationOnIcon />
                            {user?.location}
                        </span>
                    ) : null}
                </small>
                {user?.website ? (
                    <small className={styles.grayText}>
                        <span>
                            <LinkIcon />
                            <a href={`http://${user?.website}`} target="_blank" rel="noreferrer">
                                {user?.website}
                            </a>
                        </span>
                    </small>
                ) : null}
                <p className={styles.userBio}>{user?.biography}</p>
                <div className={styles.statsContainer}>
                    <p>
                        <span>{user?.followedUsersCount}</span>Following
                    </p>
                    <p>
                        <span>{user?.followersCount}</span>
                        {user?.followers > 1 ? 'Followers' : 'Follower'}
                    </p>
                </div>

                {isSameUser() ? (
                    <button
                        className={styles.editProfileButton}
                        onClick={() => setOpenEditProfileEditor(true)}>
                        Edit Profile
                    </button>
                ) : (
                    !loading && (
                        <button className={styles.editProfileButton} onClick={toggleFollow}>
                            {isFollower ? 'Unfollow' : 'Follow'}
                        </button>
                    )
                )}
            </div>
            <CustomTab
                value={value}
                handleTabChange={handleTabChange}
                handleChangeTabIndex={handleChangeTabIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className={styles.userPostsContainer}>
                        {userPosts?.map((post) => (
                            <Post
                                post={post}
                                user={loggedInUser}
                                fetchPosts={fetchPosts}
                                key={post?._id}
                            />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Saved Posts
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Media
                </TabPanel>
            </CustomTab>
            <ProfileEditor
                open={openProfileEditor}
                user={loggedInUser}
                setProfileUser={setUser}
                setOpen={setOpenEditProfileEditor}
            />
        </Layout>
    );
}

export default Profile;

export async function getServerSideProps({ params }) {
    const END_POINT = process.env.API_ENDPOINT;
    const { user_name } = params;
    const response = await fetch(`${END_POINT}/users/${user_name}`);
    const { user } = await response.json();
    return { props: { profileUser: user } };
}
