import React from 'react';
// import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleLoginButton from '../components/GoogleLoginButton.jsx';

import styles from '../styles/LoginPage.module.css';

function Login() {
    return (
        <div className={styles.loginPageLayout}>
            <h2>Login to continue</h2>
            <div className={styles.buttonsContainer}>
                <GoogleLoginButton />
            </div>
        </div>
    );
}

export default Login;
