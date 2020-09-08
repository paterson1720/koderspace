/* eslint-disable react/prop-types */
import '../styles/globals.css';
import 'easymde/dist/easymde.min.css';

import socket from '../config/socket';
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} socket={socket} />;
}

export default MyApp;
