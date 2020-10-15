/* eslint-disable react/prop-types */
import React from 'react';

import '../styles/globals.css';
import 'easymde/dist/easymde.min.css';

import socket from '../config/socket';

export const GlobalContext = React.createContext();

function MyApp({ Component, pageProps }) {
    const [globalState, setGlobalState] = React.useState({ user: pageProps.user });

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <Component {...pageProps} socket={socket} />
        </GlobalContext.Provider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.user) {
        pageProps.user = ctx.req.user;
    }

    return { pageProps };
};

export default MyApp;
