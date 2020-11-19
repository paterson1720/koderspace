/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Dialog from './Dialog';
import HttpService from '../HttpService';

import styles from '../styles/ProfileEditor.module.css';
function ProfileEditor(props) {
  const { open, setOpen, setProfileUser } = props;
  const [user, setUser] = useState({ ...props.user });

  const userIsValid = !user?.name?.trim() || !user?.email?.trim();

  const updateProfile = async () => {
    if (!userIsValid) return alert('User not valid!');
    const { error, data } = await HttpService.postData('/api/users/update', user);
    if (error) return alert('An error occured. Please try again later!');
    setOpen(false);
    setProfileUser(data.user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      title="Edit Your Profile"
      turnOnfullScreenOnSize="sm"
      fullWidth={true}
      aria-labelledby="confirm-dialog">
      <div className={styles.formContainer}>
        <input
          name="fullName"
          type="text"
          value={user?.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <textarea
          name="biography"
          type="text"
          value={user?.biography}
          onChange={handleChange}
          placeholder="Short bio: tell us a little about you..."
        />
        <input
          name="location"
          type="text"
          value={user?.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          name="website"
          type="text"
          value={user?.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button disabled={!userIsValid} onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </Dialog>
  );
}

export default ProfileEditor;
